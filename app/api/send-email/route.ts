import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates, generateReceiptPDF } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, donationData } = body;

    if (!donationData) {
      return NextResponse.json(
        { error: 'Donation data is required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'donation_receipt':
        // Generate PDF attachment
        const pdfBuffer = await generateReceiptPDF(donationData);
        
        // Create email template
        const receiptTemplate = emailTemplates.donationReceipt(donationData);
        
        // Send email with PDF attachment
        result = await sendEmail(
          receiptTemplate.to,
          receiptTemplate.subject,
          receiptTemplate.html,
          receiptTemplate.text,
          [
            {
              filename: `donation-receipt-${donationData.paymentId}.pdf`,
              content: Buffer.from(pdfBuffer),
              contentType: 'application/pdf',
            },
          ]
        );
        break;

      case 'admin_notification':
        // Create admin notification template
        const adminTemplate = emailTemplates.adminNotification(donationData);
        
        // Send admin notification
        result = await sendEmail(
          adminTemplate.to,
          adminTemplate.subject,
          adminTemplate.html,
          adminTemplate.text
        );
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
