import { NextRequest, NextResponse } from 'next/server';
import { createPaymentRequest } from '@/lib/payment/ninepay';
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
      notes,
      paymentMethod
    } = body;

    // Validate required fields
    if (!orderId || !amount || !orderInfo || !customerEmail || !customerPhone || !customerName) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

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
        payment_method: '9pay',
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

    // Create 9Pay payment URL
    const paymentUrl = await createPaymentRequest({
      amount,
      orderInfo,
      orderId,
      customerEmail,
      customerPhone,
      customerName,
      paymentMethod
    });

    return NextResponse.json({ success: true, paymentUrl });
  } catch (error) {
    console.error('Error creating 9Pay payment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
