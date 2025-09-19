'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Clock, CheckCircle, XCircle, ArrowLeft, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const RefundPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 pt-20 pb-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-serif text-green-800 mb-4">Refund Policy</h1>
          <p className="text-lg text-green-700">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-8"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Virasat Cultural Heritage Foundation is committed to transparency and donor satisfaction. This Refund Policy outlines the circumstances under which donations may be refunded and the process for requesting refunds.
            </p>
          </section>

          {/* General Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">General Refund Policy</h2>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>Important Note:</strong> Donations to Virasat Cultural Heritage Foundation are generally considered final and non-refundable, as they are contributions to a charitable cause. However, we understand that exceptional circumstances may arise.
              </p>
            </div>
          </section>

          {/* Eligible Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Eligible Refund Circumstances
            </h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Technical Errors</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Duplicate transactions due to technical glitches</li>
                  <li>Incorrect amount charged due to system errors</li>
                  <li>Failed transactions that were still charged</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Fraudulent Transactions</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Unauthorized use of payment methods</li>
                  <li>Identity theft or account compromise</li>
                  <li>Fraudulent transactions reported by banks</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Exceptional Circumstances</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Donation made by mistake (within 24 hours)</li>
                  <li>Significant personal financial hardship</li>
                  <li>Legal requirements or court orders</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Non-Eligible Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6" />
              Non-Eligible Refund Circumstances
            </h2>
            <div className="bg-red-50 p-4 rounded-lg">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Change of mind after donation</li>
                <li>Disagreement with foundation's activities</li>
                <li>Personal financial difficulties (except exceptional cases)</li>
                <li>Donations made more than 30 days ago</li>
                <li>Donations that have already been used for projects</li>
                <li>Tax deduction benefits already claimed</li>
              </ul>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Refund Request Process
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Step 1: Contact Us</h3>
                <p className="text-gray-700">
                  Send an email to <strong>virasat.reach@gmail.com</strong> with the subject "Refund Request" and include:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Transaction ID or Payment ID</li>
                  <li>Donation amount and date</li>
                  <li>Reason for refund request</li>
                  <li>Supporting documentation (if applicable)</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Step 2: Review Process</h3>
                <p className="text-gray-700">
                  We will review your request within 5-7 business days and may request additional information or documentation.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Step 3: Decision and Processing</h3>
                <p className="text-gray-700">
                  If approved, refunds will be processed within 7-10 business days through the original payment method.
                </p>
              </div>
            </div>
          </section>

          {/* Processing Time */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Processing Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Review Time</h3>
                <p className="text-gray-700">5-7 business days</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Refund Processing</h3>
                <p className="text-gray-700">7-10 business days</p>
              </div>
            </div>
          </section>

          {/* Tax Implications */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Tax Implications</h2>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                <strong>Important:</strong> If you have already claimed tax deduction benefits for a donation that is later refunded, you are responsible for updating your tax returns accordingly. We recommend consulting with a tax advisor for guidance on tax implications of refunded donations.
              </p>
            </div>
          </section>

          {/* Bank Charges */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Bank Charges</h2>
            <p className="text-gray-700 leading-relaxed">
              Any bank charges or processing fees incurred during the refund process will be deducted from the refund amount. The foundation will not be responsible for additional charges imposed by banks or payment processors.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              If you are not satisfied with our refund decision, you may escalate the matter by contacting our management team. We are committed to resolving all disputes fairly and transparently.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Contact Us for Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For refund requests or questions about this policy, please contact us:
            </p>
            <div className="text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span><strong>Email:</strong> virasat.reach@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span><strong>Phone:</strong> 0135 2752111</span>
              </div>
              <p><strong>Address:</strong> 72/II, Vasant Vihar, Dehradun – 248006, Uttarakhand</p>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Refund Request Email Template:</strong><br />
                Subject: Refund Request<br />
                Please include: Transaction ID, Amount, Date, Reason, Supporting Documents
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPage;
