import { NextRequest, NextResponse } from 'next/server';
import { verifyPayUHash } from '@/lib/payu';
import { sendEmail, emailTemplates, generateReceiptPDF } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      status,
      hash,
      mihpayid,
      error,
      error_Message
    } = body;

    if (process.env.NODE_ENV === 'development') {
      console.log('Payment verification request:', {
        txnid,
        status,
        amount,
        mihpayid
      });
    }

    // Verify hash
    const isValidHash = verifyPayUHash(
      key,
      txnid,
      amount,
      productinfo || 'Heritage Donation',
      firstname,
      email,
      status,
      process.env.PAYUBIZ_MERCHANT_SALT!,
      hash
    );

    if (!isValidHash) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Invalid hash received');
      }
      return NextResponse.json({
        success: false,
        message: 'Payment verification failed - invalid hash'
      });
    }

    if (status === 'success') {
      // Payment successful - send receipt email
      try {
        const donationData = {
          donorName: firstname,
          donorEmail: email,
          amount: parseFloat(amount),
          paymentId: mihpayid,
          orderId: txnid,
          date: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        };

        // Generate PDF receipt
        const pdfBuffer = await generateReceiptPDF(donationData);
        
        // Send receipt email to donor
        const donorTemplate = emailTemplates.donationReceipt(donationData);
        await sendEmail(
          donationData.donorEmail,
          donorTemplate.subject,
          donorTemplate.html,
          donorTemplate.text,
          [{
            filename: `donation-receipt-${donationData.paymentId}.pdf`,
            content: Buffer.from(pdfBuffer),
            contentType: 'application/pdf'
          }]
        );

        // Send notification to admin
        const adminTemplate = emailTemplates.adminNotification(donationData);
        await sendEmail(
          process.env.ADMIN_EMAIL || 'admin@reachvirasat.org',
          adminTemplate.subject,
          adminTemplate.html,
          adminTemplate.text
        );

        if (process.env.NODE_ENV === 'development') {
          console.log('Receipt emails sent successfully for transaction:', txnid);
        }

      } catch (emailError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Email sending failed:', emailError);
        }
        // Don't fail the payment for email issues
      }

      return NextResponse.json({
        success: true,
        payment_id: mihpayid,
        transaction_id: txnid,
        amount: amount,
        status: 'success',
        message: 'Payment verified successfully'
      });
    } else {
      // Payment failed
      const errorDescription = error_Message || error || 'Payment failed';
      return NextResponse.json({
        success: false,
        message: errorDescription,
        transaction_id: txnid,
        status: 'failure'
      });
    }

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Payment verification error:', error);
    }
    return NextResponse.json({
      success: false,
      message: 'Payment verification failed'
    }, { status: 500 });
  }
}