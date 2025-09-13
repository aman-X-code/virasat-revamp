'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const DonationSuccessPage = () => {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    // Get payment details from URL params
    const paymentId = searchParams.get('payment_id');
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    
    if (paymentId && orderId && amount) {
      setPaymentDetails({
        paymentId,
        orderId,
        amount: parseInt(amount),
      });
    }
  }, [searchParams]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleDownloadReceipt = async () => {
    // Generate and download PDF receipt
    const receiptData = {
      paymentId: paymentDetails?.paymentId,
      orderId: paymentDetails?.orderId,
      amount: paymentDetails?.amount,
      date: new Date().toLocaleDateString(),
      organization: 'Virasat - Cultural Heritage Foundation',
      address: '72/II, Vasant Vihar, Dehradun – 248006, Uttarakhand',
      email: 'virasat.reach@gmail.com',
      phone: '0135 2752111'
    };
    
    try {
      // Dynamically import jsPDF only when needed
      const { jsPDF } = await import('jspdf');
      
      // Create PDF using jsPDF
      const doc = new jsPDF();
      
      // Set font
      doc.setFont('helvetica');
      
      // Header
      doc.setFontSize(24);
      doc.setTextColor(245, 158, 11); // Amber color
      doc.text('VIRASAT', 105, 25, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(100, 100, 100);
      doc.text('Cultural Heritage Foundation', 105, 35, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text('72/II, Vasant Vihar, Dehradun – 248006, Uttarakhand', 105, 45, { align: 'center' });
      
      // Draw line
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(2);
      doc.line(20, 55, 190, 55);
      
      // Receipt title
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text('DONATION RECEIPT', 105, 70, { align: 'center' });
      
      // Payment details box
      doc.setFillColor(248, 249, 250);
      doc.rect(20, 80, 170, 50, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.rect(20, 80, 170, 50, 'S');
      
      // Payment details
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Payment ID: ${receiptData.paymentId}`, 25, 95);
      doc.text(`Order ID: ${receiptData.orderId}`, 25, 105);
      doc.text(`Amount: ₹${receiptData.amount}`, 25, 115);
      doc.text(`Date: ${receiptData.date}`, 25, 125);
      
      // Thank you section
      doc.setFillColor(254, 243, 199); // Light amber
      doc.rect(20, 140, 170, 30, 'F');
      doc.setDrawColor(245, 158, 11);
      doc.rect(20, 140, 170, 30, 'S');
      
      doc.setFontSize(12);
      doc.setTextColor(146, 64, 14); // Dark amber
      doc.text('Thank You for Your Generous Contribution!', 25, 155);
      
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text('Your donation will help preserve priceless artifacts, support heritage', 25, 165);
      doc.text('workshops, and ensure future generations can experience India\'s rich cultural legacy.', 25, 170);
      
      // Tax info section
      doc.setFillColor(236, 253, 245); // Light green
      doc.rect(20, 180, 170, 25, 'F');
      doc.setDrawColor(5, 150, 105);
      doc.rect(20, 180, 170, 25, 'S');
      
      doc.setFontSize(10);
      doc.setTextColor(6, 95, 70);
      doc.text('Tax Deduction Information:', 25, 190);
      doc.setFontSize(9);
      doc.text('This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.', 25, 200);
      
      // Contact info
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Email: ${receiptData.email}`, 25, 220);
      doc.text(`Phone: ${receiptData.phone}`, 25, 230);
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('This is a computer-generated receipt. No signature required.', 105, 250, { align: 'center' });
      doc.text('For any queries, please contact us at the above details.', 105, 260, { align: 'center' });
      
      // Save the PDF
      doc.save(`donation-receipt-${receiptData.paymentId}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Fallback: Create HTML and download
      const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Donation Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
              color: #333;
            }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #F59E0B; }
            .subtitle { font-size: 14px; color: #666; margin: 5px 0; }
            .address { font-size: 10px; color: #888; }
            .receipt-title { text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0; }
            .details { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin: 5px 0; }
            .thank-you { background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .tax-info { background: #ecfdf5; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .contact { margin: 20px 0; font-size: 10px; color: #666; }
            .footer { text-align: center; font-size: 8px; color: #666; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">VIRASAT</div>
            <div class="subtitle">Cultural Heritage Foundation</div>
            <div class="address">${receiptData.address}</div>
          </div>
          <div class="receipt-title">DONATION RECEIPT</div>
          <div class="details">
            <div class="detail-row"><span>Payment ID:</span><span>${receiptData.paymentId}</span></div>
            <div class="detail-row"><span>Order ID:</span><span>${receiptData.orderId}</span></div>
            <div class="detail-row"><span>Amount:</span><span>₹${receiptData.amount}</span></div>
            <div class="detail-row"><span>Date:</span><span>${receiptData.date}</span></div>
          </div>
          <div class="thank-you">
            <strong>Thank You for Your Generous Contribution!</strong><br>
            Your donation will help preserve priceless artifacts, support heritage workshops, and ensure future generations can experience India's rich cultural legacy.
          </div>
          <div class="tax-info">
            <strong>Tax Deduction Information:</strong><br>
            This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. Please retain this receipt for your tax records.
          </div>
          <div class="contact">
            Email: ${receiptData.email}<br>
            Phone: ${receiptData.phone}
          </div>
          <div class="footer">
            This is a computer-generated receipt. No signature required.<br>
            For any queries, please contact us at the above details.
          </div>
        </body>
        </html>
      `;
      
      const blob = new Blob([receiptHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `donation-receipt-${receiptData.paymentId}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 pt-28 pb-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="max-w-xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-7 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-5"
          >
            <CheckCircle className="w-11 h-11 text-white" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-serif text-gray-800 mb-3"
          >
            Donation Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base text-gray-600 mb-7"
          >
            Thank you for your generous contribution to preserving India's cultural heritage.
          </motion.p>

          {/* Payment Details */}
          {paymentDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-2xl p-5 mb-7"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Details</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-green-600">₹{paymentDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono text-sm">{paymentDetails.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-sm">{paymentDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-5"
          >
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Impact Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-semibold text-gray-800 text-sm">Your Impact</span>
            </div>
            <p className="text-gray-700 text-xs">
              Your donation will help preserve priceless artifacts, support heritage workshops, 
              and ensure future generations can experience India's rich cultural legacy.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationSuccessPage;

