import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const orderId = url.searchParams.get('order_id');
    const status = url.searchParams.get('status');
    
    if (status === 'success') {
      // Redirect to success page
      return NextResponse.redirect(new URL(`/payment-success?orderId=${orderId}`, request.url));
    } else {
      // Redirect to failure page
      const errorCode = url.searchParams.get('error_code') || 'unknown';
      return NextResponse.redirect(new URL(`/payment-failed?code=${errorCode}`, request.url));
    }
  } catch (error) {
    console.error('Error processing 9Pay return:', error);
    return NextResponse.redirect(new URL('/payment-failed?reason=server-error', request.url));
  }
}
