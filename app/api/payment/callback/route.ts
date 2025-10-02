import { NextRequest, NextResponse } from 'next/server';
import { verifyPayUHash } from '@/lib/payu';
import { sendEmail, emailTemplates, generateReceiptPDF } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract PayU response parameters
    const key = formData.get('key') as string;
    const txnid = formData.get('txnid') as string;
    const amount = formData.get('amount') as string;
    const productinfo = formData.get('productinfo') as string;
    const firstname = formData.get('firstname') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const status = formData.get('status') as string;
    const hash = formData.get('hash') as string;
    const mihpayid = formData.get('mihpayid') as string;
    const error = formData.get('error') as string;
    const error_Message = formData.get('error_Message') as string;

    if (process.env.NODE_ENV === 'development') {
      console.log('PayU callback received:', {
        txnid,
        status,
        amount,
        mihpayid,
        error: error || error_Message
      });
    }

    // Verify hash
    const isValidHash = verifyPayUHash(
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      process.env.PAYUBIZ_MERCHANT_SALT!,
      hash
    );

    if (!isValidHash) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Invalid hash received from PayU');
      }
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/donate/failure?error_code=INVALID_HASH&error_description=Payment verification failed`
      );
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
          process.env.ADMIN_EMAIL || 'virasat.reach@gmail.com',
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

      // Redirect to success page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/donate/success?payment_id=${mihpayid}&transaction_id=${txnid}&amount=${amount}&status=success`
      );
    } else {
      // Payment failed
      const errorDescription = error_Message || error || 'Payment failed';
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/donate/failure?error_code=${status}&error_description=${encodeURIComponent(errorDescription)}&transaction_id=${txnid}`
      );
    }

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Payment callback error:', error);
    }
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/donate/failure?error_code=CALLBACK_ERROR&error_description=${encodeURIComponent('Payment processing failed')}`
    );
  }
}