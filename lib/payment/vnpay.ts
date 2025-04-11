import crypto from 'crypto';
import querystring from 'querystring';

// VNPay configuration
const vnpConfig = {
  tmnCode: process.env.VNPAY_TMN_CODE || 'YOUR_TMN_CODE',
  hashSecret: process.env.VNPAY_HASH_SECRET || 'YOUR_HASH_SECRET',
  vnpUrl: process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  returnUrl: process.env.VNPAY_RETURN_URL || 'http://localhost:3000/api/payment/vnpay-return',
};

export type VNPayCreatePaymentParams = {
  amount: number;
  orderInfo: string;
  orderType?: string;
  bankCode?: string;
  language?: string;
  orderId: string;
  ipAddr: string;
};

/**
 * Create a VNPay payment URL
 */
export function createPaymentUrl({
  amount,
  orderInfo,
  orderType = 'billpayment',
  bankCode = '',
  language = 'vn',
  orderId,
  ipAddr,
}: VNPayCreatePaymentParams): string {
  // Ensure amount is in VND (no decimal)
  const amountInVND = Math.floor(amount);

  // Create date in VNPay format
  const createDate = new Date();
  const createDateFormat = formatDateToVNPay(createDate);
  
  // Create expiry date (15 minutes from now)
  const expireDate = new Date(createDate.getTime() + 15 * 60 * 1000);
  const expireDateFormat = formatDateToVNPay(expireDate);

  // Create VNPay parameters
  const vnpParams: Record<string, string | number> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: vnpConfig.tmnCode,
    vnp_Locale: language,
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: amountInVND * 100, // VNPay requires amount in smallest currency unit (100 đồng = 1 VND)
    vnp_ReturnUrl: vnpConfig.returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDateFormat,
    vnp_ExpireDate: expireDateFormat,
  };

  // Add bank code if provided
  if (bankCode) {
    vnpParams.vnp_BankCode = bankCode;
  }

  // Sort parameters by key
  const sortedParams = sortObject(vnpParams);
  
  // Create query string
  const signData = querystring.stringify(sortedParams, undefined, '&');
  
  // Create signature
  const hmac = crypto.createHmac('sha512', vnpConfig.hashSecret);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  
  // Add signature to parameters
  sortedParams.vnp_SecureHash = signed;
  
  // Create full payment URL
  const paymentUrl = `${vnpConfig.vnpUrl}?${querystring.stringify(sortedParams, undefined, '&')}`;
  
  return paymentUrl;
}

/**
 * Verify VNPay return data
 */
export function verifyReturnUrl(vnpParams: Record<string, string>): boolean {
  // Get secure hash from params
  const secureHash = vnpParams.vnp_SecureHash;
  
  // Remove secure hash from params for verification
  delete vnpParams.vnp_SecureHash;
  if (vnpParams.vnp_SecureHashType) {
    delete vnpParams.vnp_SecureHashType;
  }
  
  // Sort parameters by key
  const sortedParams = sortObject(vnpParams);
  
  // Create query string
  const signData = querystring.stringify(sortedParams, undefined, '&');
  
  // Create signature
  const hmac = crypto.createHmac('sha512', vnpConfig.hashSecret);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  
  // Compare signatures
  return secureHash === signed;
}

/**
 * Format date to VNPay format (yyyyMMddHHmmss)
 */
function formatDateToVNPay(date: Date): string {
  const pad = (num: number) => (num < 10 ? '0' + num : num);
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  
  return `${year}${month}${day}${hour}${minute}${second}`;
}

/**
 * Sort object by key
 */
function sortObject(obj: Record<string, any>): Record<string, any> {
  const sorted: Record<string, any> = {};
  const keys = Object.keys(obj).sort();
  
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  
  return sorted;
}
