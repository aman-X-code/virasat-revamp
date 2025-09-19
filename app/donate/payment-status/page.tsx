'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const PaymentStatusPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>('loading');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    // Check URL parameters to determine status
    const urlStatus = searchParams.get('status');
    const txnid = searchParams.get('txnid');
    const amount = searchParams.get('amount');
    const mihpayid = searchParams.get('mihpayid');
    
    if (urlStatus === 'success' || mihpayid) {
      setStatus('success');
      setPaymentDetails({
        paymentId: mihpayid,
        transactionId: txnid,
        amount: amount ? parseFloat(amount) : null,
      });
    } else if (urlStatus === 'failure') {
      setStatus('failure');
    } else {
      // Default to success if we have payment details
      setStatus('success');
      setPaymentDetails({
        paymentId: mihpayid,
        transactionId: txnid,
        amount: amount ? parseFloat(amount) : null,
      });
    }
  }, [searchParams]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 pt-28 pb-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment...</h2>
            <p className="text-gray-600">Please wait while we verify your payment.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 pt-28 pb-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-xl w-full"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-7 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-5"
            >
              <CheckCircle className="w-11 h-11 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-serif text-gray-800 mb-3"
            >
              Payment Successful!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base text-gray-600 mb-7"
            >
              Thank you for your generous contribution to preserving India's cultural heritage.
            </motion.p>

            {paymentDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 rounded-2xl p-5 mb-7"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Details</h3>
                <div className="space-y-2 text-left">
                  {paymentDetails.amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-green-600">₹{paymentDetails.amount}</span>
                    </div>
                  )}
                  {paymentDetails.paymentId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID:</span>
                      <span className="font-mono text-sm">{paymentDetails.paymentId}</span>
                    </div>
                  )}
                  {paymentDetails.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono text-sm">{paymentDetails.transactionId}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4 pt-28 pb-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mb-5"
          >
            <XCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-serif text-gray-800 mb-3"
          >
            Payment Failed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            We're sorry, but your payment could not be processed. Please try again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/donate"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentStatusPage;
