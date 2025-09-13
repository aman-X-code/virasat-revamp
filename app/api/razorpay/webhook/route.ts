import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Handle successful payment and send emails
async function handlePaymentCaptured(payment: any) {
  try {
    // Extract payment details
    const donationData = {
      donorName: payment.notes?.donor_name || payment.notes?.name || 'Anonymous Donor',
      donorEmail: payment.notes?.donor_email || payment.notes?.email || payment.email || 'no-email@example.com',
      amount: payment.amount / 100, // Convert from paise to rupees
      paymentId: payment.id,
      orderId: payment.order_id,
      date: new Date().toLocaleDateString(),
    };

    console.log('Payment notes received:', payment.notes);
    console.log('Processing donation:', donationData);

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

    if (receiptResponse.ok) {
      console.log('Receipt email sent successfully');
    } else {
      console.error('Failed to send receipt email:', await receiptResponse.text());
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
    console.error('Error handling payment captured:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);

    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        console.log('Payment captured:', event.payload.payment.entity);
        await handlePaymentCaptured(event.payload.payment.entity);
        break;

      case 'payment.failed':
        console.log('Payment failed:', event.payload.payment.entity);
        // Handle failed payment
        // Log failure, notify user, etc.
        break;

      case 'order.paid':
        console.log('Order paid:', event.payload.order.entity);
        // Handle order completion
        break;

      default:
        console.log('Unhandled webhook event:', event.event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

