'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

const PaymentStatusPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'success' | 'failure' | 'timeout'>('checking');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 30; // 30 attempts = 30 seconds

  const txnid = searchParams.get('txnid');
  const type = searchParams.get('type');

  const checkPaymentStatus = useCallback(async () => {
    try {
      // Get all URL parameters that PayU Biz might have sent
      const urlParams = new URLSearchParams(window.location.search);
      const paymentParams: any = {};
      
      // Extract common PayU Biz parameters
      const payuParams = [
        'txnid', 'amount', 'productinfo', 'firstname', 'email', 'phone',
        'status', 'hash', 'mihpayid', 'mode', 'udf1', 'udf2', 'udf3', 'udf4', 'udf5'
      ];
      
      payuParams.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          paymentParams[param] = value;
        }
      });

      // If we have payment status in URL, verify it
      if (paymentParams.status && paymentParams.hash) {
        // Payment data found in URL
        
        const verifyResponse = await fetch('/api/payubiz/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentParams),
        });

        const verifyResult = await verifyResponse.json();
        
        if (verifyResult.success) {
          setPaymentData(verifyResult);
          setStatus('success');
          
          // Redirect to success page with payment details
          const successParams = new URLSearchParams({
            mihpayid: verifyResult.payment_id || '',
            txnid: verifyResult.transaction_id || '',
            amount: verifyResult.amount || '',
            status: 'success'
          });
          
          setTimeout(() => {
            router.push(`/donate/success?${successParams.toString()}`);
          }, 2000);
          
          return;
        } else {
          setStatus('failure');
          setTimeout(() => {
            router.push(`/donate/failure?txnid=${txnid}&error_description=${encodeURIComponent(verifyResult.message || 'Payment verification failed')}`);
          }, 2000);
          return;
        }
      }

      // If no payment data in URL, keep checking (polling approach)
      if (attempts < maxAttempts) {
        setAttempts(prev => prev + 1);
        setTimeout(() => {
          checkPaymentStatus();
        }, 1000); // Check every second
      } else {
        setStatus('timeout');
        setTimeout(() => {
          router.push(`/donate/failure?txnid=${txnid}&error_description=Payment status check timeout`);
        }, 3000);
      }

    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus('failure');
      setTimeout(() => {
        router.push(`/donate/failure?txnid=${txnid}&error_description=Payment verification error`);
      }, 2000);
    }
  }, [txnid, router, attempts]);

  useEffect(() => {
    if (!txnid) {
      router.push('/donate/failure?error_description=Missing transaction ID');
      return;
    }

    // Start checking payment status
    checkPaymentStatus();
  }, [txnid, checkPaymentStatus, router]);

  const handleManualCheck = () => {
    setStatus('checking');
    setAttempts(0);
    checkPaymentStatus();
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 pt-28 pb-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="max-w-lg w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          
          {status === 'checking' && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6"
              >
                <Loader2 className="w-8 h-8 text-white" />
              </motion.div>
              
              <h1 className="text-2xl font-serif text-gray-800 mb-4">
                Checking Payment Status...
              </h1>
              
              <p className="text-gray-600 mb-6">
                Please wait while we verify your payment with PayU Biz.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="text-sm text-gray-600">
                  <div>Transaction ID: <span className="font-mono">{txnid}</span></div>
                  <div>Attempt: {attempts}/{maxAttempts}</div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-48 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(attempts / maxAttempts) * 100}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h1 className="text-2xl font-serif text-gray-800 mb-4">
                Payment Successful!
              </h1>
              
              <p className="text-gray-600 mb-6">
                Your payment has been verified successfully. Redirecting to receipt page...
              </p>
            </>
          )}

          {status === 'failure' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mb-6"
              >
                <XCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h1 className="text-2xl font-serif text-gray-800 mb-4">
                Payment Verification Failed
              </h1>
              
              <p className="text-gray-600 mb-6">
                We couldn&apos;t verify your payment. Redirecting to error page...
              </p>
            </>
          )}

          {status === 'timeout' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-6"
              >
                <RefreshCw className="w-8 h-8 text-white" />
              </motion.div>
              
              <h1 className="text-2xl font-serif text-gray-800 mb-4">
                Status Check Timeout
              </h1>
              
              <p className="text-gray-600 mb-6">
                We couldn&apos;t get your payment status in time. This might be due to network issues.
              </p>
              
              <button
                onClick={handleManualCheck}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Check Again
              </button>
            </>
          )}

          {/* Development Info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-2xl text-left">
              <h3 className="font-semibold text-yellow-800 mb-2">Development Info:</h3>
              <div className="text-xs text-yellow-700 space-y-1">
                <div>Transaction ID: {txnid}</div>
                <div>Type: {type}</div>
                <div>Status: {status}</div>
                <div>Attempts: {attempts}</div>
                <div>URL Params: {window.location.search}</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentStatusPage;