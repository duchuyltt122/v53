import { NextRequest, NextResponse } from 'next/server';
import { verifyReturnUrl } from '@/lib/payment/vnpay';
import { getSupabaseClient } from '@/lib/supabase';
import { sendOrderConfirmationEmail } from '@/app/actions/send-order-confirmation-email';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const params: Record<string, string> = {};
    
    // Convert URLSearchParams to Record<string, string>
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    // Verify VNPay return data
    const isValid = verifyReturnUrl(params);
    
    if (!isValid) {
      console.error('Invalid VNPay return data');
      return NextResponse.redirect(new URL('/payment-failed?reason=invalid-signature', request.url));
    }

    // Check payment status
    const vnpResponseCode = params.vnp_ResponseCode;
    const orderId = params.vnp_TxnRef;
    const amount = parseInt(params.vnp_Amount) / 100; // Convert back from smallest unit
    
    if (vnpResponseCode === '00') {
      // Payment successful
      // Update order status in database
      const supabase = getSupabaseClient();
      
      // Get order details
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (orderError || !orderData) {
        console.error('Error getting order:', orderError);
        return NextResponse.redirect(new URL('/payment-failed?reason=order-not-found', request.url));
      }
      
      // Update order payment status
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'completed',
          payment_transaction_id: params.vnp_TransactionNo,
          payment_bank_code: params.vnp_BankCode,
          payment_card_type: params.vnp_CardType,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
      
      if (updateError) {
        console.error('Error updating order:', updateError);
        return NextResponse.redirect(new URL('/payment-failed?reason=update-failed', request.url));
      }
      
      // Send order confirmation email
      try {
        const orderItems = orderData.items.map((item: any) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }));
        
        await sendOrderConfirmationEmail({
          email: orderData.customer_email,
          name: orderData.customer_name,
          orderItems,
          totalAmount: amount,
          shippingAddress: orderData.shipping_address,
          phoneNumber: orderData.customer_phone,
          notes: orderData.notes || '',
          language: 'vi' // Default to Vietnamese, can be changed based on user preference
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Continue even if email fails
      }
      
      // Redirect to success page
      return NextResponse.redirect(new URL(`/payment-success?orderId=${orderId}`, request.url));
    } else {
      // Payment failed
      // Update order status in database
      const supabase = getSupabaseClient();
      
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          payment_error_code: vnpResponseCode,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
      
      if (updateError) {
        console.error('Error updating order:', updateError);
      }
      
      // Redirect to failure page
      return NextResponse.redirect(new URL(`/payment-failed?code=${vnpResponseCode}`, request.url));
    }
  } catch (error) {
    console.error('Error processing VNPay return:', error);
    return NextResponse.redirect(new URL('/payment-failed?reason=server-error', request.url));
  }
}
