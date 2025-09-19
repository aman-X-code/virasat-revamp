import nodemailer from 'nodemailer';

// Email configuration - easy to switch between services
const emailConfig = {
  // Gmail configuration for demo
  gmail: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_APP_PASSWORD, // Gmail app password
    },
  },
  
  // Custom SMTP configuration (for name.com or other providers)
  smtp: {
    host: process.env.EMAIL_HOST || 'smtp.yourdomain.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Full email address
      pass: process.env.EMAIL_PASSWORD, // Email password
    },
  },
  
  // Resend configuration (for future switch)
  resend: {
    host: 'smtp.resend.com',
    port: 587,
    secure: false,
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY,
    },
  },
  
  // SendGrid configuration (for future switch)
  sendgrid: {
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  },
};

// Get current email service (defaults to Gmail for demo)
const getCurrentService = () => {
  const service = process.env.EMAIL_SERVICE || 'gmail';
  return emailConfig[service as keyof typeof emailConfig] || emailConfig.gmail;
};

// Create transporter
const createTransporter = () => {
  const config = getCurrentService();
  return nodemailer.createTransport(config);
};

// Email templates
export const emailTemplates = {
  donationReceipt: (donationData: {
    donorName: string;
    donorEmail: string;
    amount: number;
    paymentId: string;
    orderId: string;
    date: string;
  }) => ({
    from: `"Virasat Foundation" <${process.env.EMAIL_USER}>`,
    to: donationData.donorEmail,
    subject: 'Thank You for Your Donation - Receipt Attached',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; background: #F59E0B; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .subtitle { font-size: 16px; opacity: 0.9; }
          .receipt-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B; }
          .amount { font-size: 24px; font-weight: bold; color: #059669; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          .contact-info { background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">VIRASAT</div>
            <div class="subtitle">Cultural Heritage Foundation</div>
          </div>
          
          <div class="content">
            <h2>Dear ${donationData.donorName},</h2>
            
            <p>Thank you for your generous donation to Virasat Cultural Heritage Foundation! Your contribution will help preserve India's rich cultural legacy for future generations.</p>
            
            <div class="receipt-box">
              <h3>Donation Details:</h3>
              <p><strong>Amount:</strong> <span class="amount">₹${donationData.amount}</span></p>
              <p><strong>Payment ID:</strong> ${donationData.paymentId}</p>
              <p><strong>Order ID:</strong> ${donationData.orderId}</p>
              <p><strong>Date:</strong> ${donationData.date}</p>
            </div>
            
            <div class="contact-info">
              <h4>Tax Deduction Information:</h4>
              <p>This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. Please retain this receipt for your tax records.</p>
            </div>
            
            <p>Your donation receipt is attached to this email as a PDF file.</p>
            
            <p><strong>Note:</strong> This is an automatically generated email. Please do not reply to this email as responses will not be monitored. For any queries, please contact us directly at the email address below.</p>
            
            <p>With gratitude,<br>
            <strong>Virasat Cultural Heritage Foundation</strong></p>
          </div>
          
          <div class="footer">
            <p>72/II, Vasant Vihar, Dehradun – 248006, Uttarakhand</p>
            <p>Email: virasat.reach@gmail.com | Phone: 0135 2752111</p>
            <p>This is a computer-generated receipt. No signature required.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Dear ${donationData.donorName},
      
      Thank you for your generous donation to Virasat Cultural Heritage Foundation!
      
      Donation Details:
      - Amount: ₹${donationData.amount}
      - Payment ID: ${donationData.paymentId}
      - Order ID: ${donationData.orderId}
      - Date: ${donationData.date}
      
      This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
      
      Your donation receipt is attached as a PDF file.
      
      Note: This is an automatically generated email. Please do not reply to this email as responses will not be monitored. For any queries, please contact us directly at virasat.reach@gmail.com.
      
      With gratitude,
      Virasat Cultural Heritage Foundation
      
      Contact: virasat.reach@gmail.com | 0135 2752111
    `,
  }),

  adminNotification: (donationData: {
    donorName: string;
    donorEmail: string;
    amount: number;
    paymentId: string;
    orderId: string;
    date: string;
  }) => ({
    from: `"Virasat Foundation" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || 'virasat.reach@gmail.com',
    subject: `New Donation Received - ₹${donationData.amount}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .donation-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669; }
          .amount { font-size: 24px; font-weight: bold; color: #059669; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎉 New Donation Received!</h2>
          </div>
          
          <div class="content">
            <div class="donation-box">
              <h3>Donation Details:</h3>
              <p><strong>Donor Name:</strong> ${donationData.donorName}</p>
              <p><strong>Donor Email:</strong> ${donationData.donorEmail}</p>
              <p><strong>Amount:</strong> <span class="amount">₹${donationData.amount}</span></p>
              <p><strong>Payment ID:</strong> ${donationData.paymentId}</p>
              <p><strong>Order ID:</strong> ${donationData.orderId}</p>
              <p><strong>Date:</strong> ${donationData.date}</p>
            </div>
            
            <p>This donation has been successfully processed and the donor has been sent a receipt.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Donation Received - ₹${donationData.amount}
      
      Donation Details:
      - Donor Name: ${donationData.donorName}
      - Donor Email: ${donationData.donorEmail}
      - Amount: ₹${donationData.amount}
      - Payment ID: ${donationData.paymentId}
      - Order ID: ${donationData.orderId}
      - Date: ${donationData.date}
      
      This donation has been successfully processed and the donor has been sent a receipt.
    `,
  }),
};

// Send email function
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text: string,
  attachments?: any[]
) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Virasat Foundation" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
      attachments,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error };
  }
};

// Generate PDF attachment
export const generateReceiptPDF = async (donationData: {
  donorName: string;
  donorEmail: string;
  amount: number;
  paymentId: string;
  orderId: string;
  date: string;
}) => {
  try {
    const jsPDF = (await import('jspdf')).default;
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
    doc.text(`Donor Name: ${donationData.donorName}`, 25, 95);
    doc.text(`Donor Email: ${donationData.donorEmail}`, 25, 105);
    doc.text(`Payment ID: ${donationData.paymentId}`, 25, 115);
    doc.text(`Order ID: ${donationData.orderId}`, 25, 125);
    doc.text(`Amount: ₹${donationData.amount}`, 25, 135);
    doc.text(`Date: ${donationData.date}`, 25, 145);
    
    // Thank you section
    doc.setFillColor(254, 243, 199); // Light amber
    doc.rect(20, 160, 170, 30, 'F');
    doc.setDrawColor(245, 158, 11);
    doc.rect(20, 160, 170, 30, 'S');
    
    doc.setFontSize(12);
    doc.setTextColor(146, 64, 14); // Dark amber
    doc.text('Thank You for Your Generous Contribution!', 25, 175);
    
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text('Your donation will help preserve priceless artifacts, support heritage', 25, 185);
    doc.text('workshops, and ensure future generations can experience India\'s rich cultural legacy.', 25, 190);
    
    // Tax info section
    doc.setFillColor(236, 253, 245); // Light green
    doc.rect(20, 200, 170, 25, 'F');
    doc.setDrawColor(5, 150, 105);
    doc.rect(20, 200, 170, 25, 'S');
    
    doc.setFontSize(10);
    doc.setTextColor(6, 95, 70);
    doc.text('Tax Deduction Information:', 25, 210);
    doc.setFontSize(9);
    doc.text('This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.', 25, 220);
    
    // Contact info
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Email: virasat.reach@gmail.com', 25, 240);
    doc.text('Phone: 0135 2752111', 25, 250);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('This is a computer-generated receipt. No signature required.', 105, 270, { align: 'center' });
    doc.text('For any queries, please contact us at the above details.', 105, 280, { align: 'center' });
    
    // Return PDF as buffer
    return doc.output('arraybuffer');
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};
