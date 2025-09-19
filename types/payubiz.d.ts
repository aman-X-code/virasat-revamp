declare global {
  interface Window {
    PayU: any;
  }
}

export interface PayUBizTransactionData {
  key: string;
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  service_provider: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export interface PayUBizResponse {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  status: 'success' | 'failure' | 'pending';
  hash: string;
  mihpayid?: string;
  mode?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export interface PayUBizCreateTransactionResponse {
  success: boolean;
  transactionData: PayUBizTransactionData;
  txnid: string;
  hash: string;
  error?: string;
}

export interface PayUBizVerifyResponse {
  success: boolean;
  message: string;
  payment_id?: string;
  transaction_id?: string;
  amount?: string;
  status?: string;
  mode?: string;
  customer_details?: {
    name: string;
    email: string;
    phone: string;
  };
  error?: string;
}

export interface PayUBizWebhookData {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  status: 'success' | 'failure' | 'pending';
  hash: string;
  mihpayid?: string;
  mode?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}


