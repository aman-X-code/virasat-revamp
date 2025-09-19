'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, ArrowLeft, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const PrivacyPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-serif text-blue-800 mb-4">Privacy Policy</h1>
          <p className="text-lg text-blue-700">Last updated: {new Date().toLocaleDateString()}</p>
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
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
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Virasat Cultural Heritage Foundation ("we," "our," or "us") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make donations.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Donation amount and payment details</li>
                  <li>Transaction IDs and payment references</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>IP address and browser information</li>
                  <li>Device information and operating system</li>
                  <li>Website usage patterns and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Process donations and send receipts</li>
              <li>Provide tax deduction certificates</li>
              <li>Send updates about our heritage preservation work</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          {/* Payment Information */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Payment Information Security
            </h2>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                <strong>Secure Payment Processing:</strong> We use PayuBiz, a PCI DSS compliant payment gateway, to process all donations. We do not store your credit card or bank account details on our servers. All payment information is encrypted and processed securely by PayuBiz.
              </p>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>With payment processors (PayuBiz) to process donations</li>
              <li>With email service providers to send receipts and updates</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Donation records are typically retained for 7 years for tax and audit purposes.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
            </p>
          </section>

          {/* Security Measures */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Security Measures</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>SSL encryption for all data transmission</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
