import { NextRequest, NextResponse } from 'next/server';
import { createPaymentUrl } from '@/lib/payment/vnpay';
import { getSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      orderId, 
      amount, 
      orderInfo,
      customerEmail,
      customerName,
      customerPhone,
      shippingAddress,
      items,
      notes
    } = body;

    // Validate required fields
    if (!orderId || !amount || !orderInfo || !customerEmail) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client IP
    const ipAddr = request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  '127.0.0.1';

    // Store order information in database
    const supabase = getSupabaseClient();
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone,
        shipping_address: shippingAddress,
        amount: amount,
        items: items,
        notes: notes,
        payment_method: 'vnpay',
        payment_status: 'pending',
        order_status: 'pending'
      });

    if (orderError) {
      console.error('Error storing order:', orderError);
      return NextResponse.json(
        { success: false, message: 'Error storing order' },
        { status: 500 }
      );
    }

    // Create VNPay payment URL
    const paymentUrl = createPaymentUrl({
      amount,
      orderInfo,
      orderId,
      ipAddr: Array.isArray(ipAddr) ? ipAddr[0] : ipAddr,
    });

    return NextResponse.json({ success: true, paymentUrl });
  } catch (error) {
    console.error('Error creating VNPay payment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
