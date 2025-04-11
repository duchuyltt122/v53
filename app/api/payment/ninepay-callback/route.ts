import { NextRequest, NextResponse } from 'next/server';
import { verifyCallback } from '@/lib/payment/ninepay';
import { getSupabaseClient } from '@/lib/supabase';
import { sendOrderConfirmationEmail } from '@/app/actions/send-order-confirmation-email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify callback data
    const isValid = verifyCallback(body);
    
    if (!isValid) {
      console.error('Invalid 9Pay callback data');
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Check payment status
    const { 
      status, 
      order_id: orderId, 
      amount,
      transaction_id: transactionId
    } = body;
    
    // Get supabase client
    const supabase = getSupabaseClient();
    
    if (status === 'success') {
      // Payment successful
      // Get order details
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (orderError || !orderData) {
        console.error('Error getting order:', orderError);
        return NextResponse.json(
          { success: false, message: 'Order not found' },
          { status: 404 }
        );
      }
      
      // Update order payment status
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'completed',
          payment_transaction_id: transactionId,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
      
      if (updateError) {
        console.error('Error updating order:', updateError);
        return NextResponse.json(
          { success: false, message: 'Error updating order' },
          { status: 500 }
        );
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
      
      return NextResponse.json({ success: true });
    } else {
      // Payment failed
      // Update order status in database
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          payment_error_code: body.error_code,
          payment_error_message: body.message,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
      
      if (updateError) {
        console.error('Error updating order:', updateError);
        return NextResponse.json(
          { success: false, message: 'Error updating order' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error processing 9Pay callback:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
