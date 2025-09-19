import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { validateWebhook, markWebhookProcessed, logWebhook } from '@/lib/webhook-security';
import { validateRequestOrigin } from '@/lib/security';

// Handle successful payment and send emails
async function handlePaymentSuccess(paymentData: any) {
  try {
    // Extract payment details
    const donationData = {
      donorName: paymentData.firstname || 'Anonymous Donor',
      donorEmail: paymentData.email || 'no-email@example.com',
      amount: parseFloat(paymentData.amount),
      paymentId: paymentData.mihpayid,
      transactionId: paymentData.txnid,
      date: new Date().toLocaleDateString(),
      mode: paymentData.mode,
      phone: paymentData.phone
    };

    // Processing donation

    // Send receipt email to donor
    const receiptResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'donation_receipt',
        donationData,
      }),
    });

    if (!receiptResponse.ok) {
      // Email sending failed
    }

    // Admin notification disabled for demo
    // Uncomment when needed:
    // const adminResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     type: 'admin_notification',
    //     donationData,
    //   }),
    // });

  } catch (error) {
    // Error handling payment success
  }
}

export async function POST(request: NextRequest) {
  try {
    // Enhanced webhook security validation
    const userAgent = request.headers.get('user-agent') || '';
    const origin = request.headers.get('origin') || '';
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const realIp = request.headers.get('x-real-ip') || '';
    
    // Webhook received
    
    // Validate request origin
    if (!validateRequestOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      );
    }
    
    const formData = await request.formData();
    
    // Extract payment data from form data
    const paymentData = {
      txnid: formData.get('txnid') as string,
      amount: formData.get('amount') as string,
      productinfo: formData.get('productinfo') as string,
      firstname: formData.get('firstname') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      status: formData.get('status') as string,
      hash: formData.get('hash') as string,
      mihpayid: formData.get('mihpayid') as string,
      mode: formData.get('mode') as string,
      udf1: formData.get('udf1') as string,
      udf2: formData.get('udf2') as string,
      udf3: formData.get('udf3') as string,
      udf4: formData.get('udf4') as string,
      udf5: formData.get('udf5') as string
    };

    // Check if PayU Biz credentials are configured
    if (!process.env.PAYUBIZ_MERCHANT_KEY || !process.env.PAYUBIZ_MERCHANT_SALT) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Comprehensive webhook validation
    const validation = validateWebhook(
      request,
      paymentData,
      paymentData.hash,
      process.env.PAYUBIZ_MERCHANT_KEY,
      process.env.PAYUBIZ_MERCHANT_SALT
    );

    if (!validation.isValid) {
      logWebhook(paymentData, false, validation.error, request);
      return NextResponse.json(
        { error: validation.error || 'Webhook validation failed' },
        { status: 400 }
      );
    }

    // Mark webhook as processed to prevent replay attacks
    if (validation.webhookId) {
      markWebhookProcessed(validation.webhookId, paymentData.hash);
    }

    // Log successful webhook validation
    logWebhook(paymentData, true, undefined, request);

    // Handle different payment statuses
    switch (paymentData.status) {
      case 'success':
        await handlePaymentSuccess(paymentData);
        break;

      case 'failure':
        // Handle failed payment
        break;

      case 'pending':
        // Handle pending payment
        break;

      default:
        // Unknown payment status
        break;
    }

    return NextResponse.json({ 
      success: true,
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
