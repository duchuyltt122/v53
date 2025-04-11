import crypto from 'crypto';

// 9Pay configuration
const ninePayConfig = {
  merchantId: process.env.NINEPAY_MERCHANT_ID || 'YOUR_MERCHANT_ID',
  merchantKey: process.env.NINEPAY_MERCHANT_KEY || 'YOUR_MERCHANT_KEY',
  merchantSecret: process.env.NINEPAY_MERCHANT_SECRET || 'YOUR_MERCHANT_SECRET',
  apiUrl: process.env.NINEPAY_API_URL || 'https://sandbox.9pay.vn/payments/api/v3',
  returnUrl: process.env.NINEPAY_RETURN_URL || 'http://localhost:3000/api/payment/ninepay-return',
};

export type NinePayCreatePaymentParams = {
  amount: number;
  orderInfo: string;
  orderId: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  paymentMethod?: string; // 'WALLET', 'ATM', 'CC', etc.
};

/**
 * Create a 9Pay payment request
 */
export async function createPaymentRequest({
  amount,
  orderInfo,
  orderId,
  customerEmail,
  customerPhone,
  customerName,
  paymentMethod = 'WALLET',
}: NinePayCreatePaymentParams): Promise<string> {
  // Ensure amount is in VND (no decimal)
  const amountInVND = Math.floor(amount);

  // Create timestamp
  const timestamp = Math.floor(Date.now() / 1000);

  // Create payment data
  const paymentData = {
    merchant_id: ninePayConfig.merchantId,
    merchant_key: ninePayConfig.merchantKey,
    timestamp,
    amount: amountInVND,
    order_id: orderId,
    order_info: orderInfo,
    return_url: ninePayConfig.returnUrl,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    customer_name: customerName,
    payment_method: paymentMethod,
  };

  // Create signature
  const signature = createSignature(paymentData);
  
  // Add signature to payment data
  const requestData = {
    ...paymentData,
    signature,
  };

  try {
    // Send request to 9Pay
    const response = await fetch(`${ninePayConfig.apiUrl}/payment-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`9Pay API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(`9Pay payment error: ${result.message}`);
    }

    // Return payment URL
    return result.data.payment_url;
  } catch (error) {
    console.error('Error creating 9Pay payment:', error);
    throw error;
  }
}

/**
 * Verify 9Pay callback data
 */
export function verifyCallback(callbackData: Record<string, any>): boolean {
  // Get signature from callback data
  const receivedSignature = callbackData.signature;
  
  // Remove signature from data for verification
  const { signature, ...dataToVerify } = callbackData;
  
  // Create signature
  const calculatedSignature = createSignature(dataToVerify);
  
  // Compare signatures
  return receivedSignature === calculatedSignature;
}

/**
 * Create signature for 9Pay request
 */
function createSignature(data: Record<string, any>): string {
  // Sort data by key
  const sortedKeys = Object.keys(data).sort();
  
  // Create string to sign
  let stringToSign = '';
  for (const key of sortedKeys) {
    stringToSign += `${key}=${data[key]}&`;
  }
  
  // Remove last '&'
  stringToSign = stringToSign.slice(0, -1);
  
  // Add merchant secret
  stringToSign += ninePayConfig.merchantSecret;
  
  // Create signature
  return crypto.createHash('sha256').update(stringToSign).digest('hex');
}
