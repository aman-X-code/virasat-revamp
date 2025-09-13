import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { testEmail } = await request.json();

    if (!testEmail) {
      return NextResponse.json(
        { error: 'Test email address is required' },
        { status: 400 }
      );
    }

    // Test email data
    const testDonationData = {
      donorName: 'Test Donor',
      donorEmail: testEmail,
      amount: 1000,
      paymentId: 'test_payment_123',
      orderId: 'test_order_456',
      date: new Date().toLocaleDateString(),
    };

    // Send test receipt email
    const receiptTemplate = emailTemplates.donationReceipt(testDonationData);
    const result = await sendEmail(
      receiptTemplate.to,
      receiptTemplate.subject,
      receiptTemplate.html,
      receiptTemplate.text
    );

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send test email', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
