'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Users, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TermsPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 pt-20 pb-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-serif text-amber-800 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-amber-700">Last updated: {new Date().toLocaleDateString()}</p>
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
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
            <h2 className="text-2xl font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Virasat Cultural Heritage Foundation. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
            </p>
          </section>

          {/* About Us */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              About Virasat Foundation
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Virasat Cultural Heritage Foundation is a registered non-profit organization dedicated to preserving India's rich cultural heritage. We work to protect, restore, and promote traditional arts, crafts, and cultural practices for future generations.
            </p>
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Registration Details:</strong><br />
                Organization: Virasat Cultural Heritage Foundation<br />
                Address: 72/II, Vasant Vihar, Dehradun – 248006, Uttarakhand<br />
                Email: virasat.reach@gmail.com<br />
                Phone: 0135 2752111
              </p>
            </div>
          </section>

          {/* Donations */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Donations and Payments
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Donation Process</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>All donations are processed securely through PayuBiz payment gateway</li>
                  <li>Donations are voluntary and non-refundable unless specified otherwise</li>
                  <li>Minimum donation amount is ₹1, maximum is ₹10,00,000</li>
                  <li>All transactions are processed in Indian Rupees (INR)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tax Benefits</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>All donations are eligible for tax deduction under Section 80G of the Income Tax Act, 1961</li>
                  <li>Donors will receive a receipt for tax purposes</li>
                  <li>Receipts are generated automatically and sent via email</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">User Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate and complete information when making donations</li>
              <li>Ensure you have the legal right to make donations</li>
              <li>Use the website in accordance with applicable laws and regulations</li>
              <li>Respect the intellectual property rights of the foundation</li>
              <li>Not engage in any fraudulent or illegal activities</li>
            </ul>
          </section>

          {/* Privacy and Data */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to protecting your privacy and personal information. Please refer to our Privacy Policy for detailed information about how we collect, use, and protect your data.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Virasat Cultural Heritage Foundation shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our liability is limited to the maximum extent permitted by law.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of our services shall be subject to the jurisdiction of the courts in Dehradun, Uttarakhand.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-amber-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="text-gray-700">
              <p><strong>Email:</strong> virasat.reach@gmail.com</p>
              <p><strong>Phone:</strong> 0135 2752111</p>
              <p><strong>Address:</strong> 72/II, Vasant Vihar, Dehradun – 248006, Uttarakhand</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
