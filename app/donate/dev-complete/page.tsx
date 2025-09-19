'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Search, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DevPaymentCompletePage = () => {
  const router = useRouter();
  const [txnid, setTxnid] = useState('');
  const [paymentData, setPaymentData] = useState({
    mihpayid: '',
    amount: '',
    status: 'success',
    firstname: '',
    email: '',
    phone: ''
  });

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    router.push('/');
    return null;
  }

  const handleManualComplete = () => {
    if (!txnid || !paymentData.amount) {
      alert('Please fill in Transaction ID and Amount');
      return;
    }

    const successParams = new URLSearchParams({
      mihpayid: paymentData.mihpayid || `PAYU_${Date.now()}`,
      txnid: txnid,
      amount: paymentData.amount,
      status: paymentData.status
    });

    if (paymentData.status === 'success') {
      router.push(`/donate/success?${successParams.toString()}`);
    } else {
      router.push(`/donate/failure?${successParams.toString()}`);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4 pt-28 pb-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Warning Header */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <h2 className="font-semibold text-yellow-800">Development Mode Only</h2>
              <p className="text-sm text-yellow-700">
                This page helps complete payments when PayU Biz redirects fail on localhost
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-serif text-gray-800 mb-6 text-center">
            Manual Payment Completion
          </h1>

          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-blue-50 rounded-2xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Complete your payment on PayU Biz</li>
                <li>Check your PayU Biz merchant dashboard for transaction details</li>
                <li>Enter the transaction details below</li>
                <li>Click "Complete Payment" to see success/failure page</li>
              </ol>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Transaction ID (from PayU Biz dashboard)
                </label>
                <input
                  type="text"
                  value={txnid}
                  onChange={(e) => setTxnid(e.target.value)}
                  placeholder="TXN_1234567890_abcdef"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PayU Payment ID
                  </label>
                  <input
                    type="text"
                    value={paymentData.mihpayid}
                    onChange={(e) => setPaymentData({...paymentData, mihpayid: e.target.value})}
                    placeholder="403993715527623129"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                    placeholder="1000"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Status
                </label>
                <select
                  value={paymentData.status}
                  onChange={(e) => setPaymentData({...paymentData, status: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="success">Success</option>
                  <option value="failure">Failure</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={paymentData.firstname}
                    onChange={(e) => setPaymentData({...paymentData, firstname: e.target.value})}
                    placeholder="John Doe"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={paymentData.email}
                    onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={paymentData.phone}
                    onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                    placeholder="+91 9876543210"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleManualComplete}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                {paymentData.status === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                Complete Payment
              </button>

              <button
                onClick={() => router.push('/donate')}
                className="px-6 py-3 bg-gray-500 text-white rounded-2xl font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                Back to Donate
              </button>
            </div>

            {/* PayU Dashboard Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Check your transaction details in PayU Biz Dashboard:
              </p>
              <a
                href="https://test.payu.in/merchant/transactions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
              >
                <Search className="w-4 h-4" />
                Open PayU Biz Dashboard
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DevPaymentCompletePage;