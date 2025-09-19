'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const DonationFailurePage = () => {
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<any>(null);

  useEffect(() => {
    // Get error details from URL params (PayU Biz format)
    const errorCode = searchParams.get('error_code');
    const errorDescription = searchParams.get('error_description');
    const transactionId = searchParams.get('txnid') || searchParams.get('order_id');
    const status = searchParams.get('status');
    
    if (errorCode || errorDescription || transactionId || status === 'failure') {
      setErrorDetails({
        errorCode,
        errorDescription: errorDescription || 'Payment was not successful',
        orderId: transactionId,
      });
    }
  }, [searchParams]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleRetryDonation = () => {
    // Redirect back to donate page
    window.location.href = '/donate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4 pt-28 pb-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mb-6"
          >
            <XCircle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-serif text-gray-800 mb-4"
          >
            Payment Failed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            We're sorry, but your donation could not be processed at this time.
          </motion.p>

          {/* Error Details */}
          {errorDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-2xl p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Error Details</h3>
              <div className="space-y-2 text-left">
                {errorDetails.errorCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Error Code:</span>
                    <span className="font-mono text-sm text-red-600">{errorDetails.errorCode}</span>
                  </div>
                )}
                {errorDetails.errorDescription && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="text-sm text-red-600">{errorDetails.errorDescription}</span>
                  </div>
                )}
                {errorDetails.orderId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono text-sm">{errorDetails.orderId}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Common Reasons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Reasons for Payment Failure:</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Insufficient funds in your account</li>
              <li>• Incorrect card details entered</li>
              <li>• Card expired or blocked</li>
              <li>• Network connectivity issues</li>
              <li>• Bank security restrictions</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleRetryDonation}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Support Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-gray-800">Need Help?</span>
            </div>
            <p className="text-gray-700 text-sm">
              If you continue to experience issues, please contact our support team. 
              We're here to help you complete your donation.
            </p>
            <div className="mt-2">
              <Link 
                href="/contact" 
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                Contact Support →
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationFailurePage;

