// Email service utility for sending notifications
// In production, this would integrate with a real email service like SendGrid, Nodemailer, etc.

interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface ApplicationEmailData {
  studentName: string;
  studentEmail: string;
  parentEmail: string;
  applicationId: string;
  course: string;
  credentials?: {
    username: string;
    password: string;
  };
}

export const emailService = {
  // Send application confirmation email
  async sendApplicationConfirmation(data: ApplicationEmailData): Promise<boolean> {
    const emailContent: EmailData = {
      to: data.studentEmail,
      subject: "Application Received - Brilliant Roots",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Brilliant Roots</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Application Confirmation</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #333; margin-top: 0;">Dear ${data.studentName},</h2>
            <p style="color: #666; line-height: 1.6;">
              Thank you for applying to Brilliant Roots! We have successfully received your application for the <strong>${data.course}</strong> program.
            </p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <p style="margin: 0; color: #333;"><strong>Application ID:</strong> ${data.applicationId}</p>
              <p style="margin: 10px 0 0 0; color: #333;"><strong>Applied Course:</strong> ${data.course}</p>
              <p style="margin: 10px 0 0 0; color: #333;"><strong>Status:</strong> Under Review</p>
            </div>
            <p style="color: #666; line-height: 1.6;">
              Our admissions team will carefully review your application within 2-3 business days. You will receive another email once a decision has been made.
            </p>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${typeof window !== 'undefined' ? window.location.origin : 'https://brilliantroots.com'}/application-status?id=${data.applicationId}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Track Your Application
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; 2024 Brilliant Roots. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `
        Dear ${data.studentName},
        
        Thank you for applying to Brilliant Roots! We have received your application for ${data.course}.
        
        Application ID: ${data.applicationId}
        Status: Under Review
        
        Our team will review your application within 2-3 business days. You can track your application status using the ID above.
        
        Best regards,
        Brilliant Roots Team
      `
    };

    return this.sendEmail(emailContent);
  },

  // Send approval email with credentials
  async sendApprovalEmail(data: ApplicationEmailData): Promise<boolean> {
    if (!data.credentials) {
      throw new Error("Credentials are required for approval email");
    }

    const emailContent: EmailData = {
      to: data.studentEmail,
      subject: "Application Approved - Welcome to Brilliant Roots!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Congratulations!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your Application Has Been Approved</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #333; margin-top: 0;">Dear ${data.studentName},</h2>
            <p style="color: #666; line-height: 1.6;">
              We are thrilled to welcome you to the Brilliant Roots family! Your application for the <strong>${data.course}</strong> program has been approved.
            </p>
            <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #059669; margin-top: 0;">Your Login Credentials</h3>
              <p style="margin: 10px 0; color: #333;"><strong>Username:</strong> ${data.credentials.username}</p>
              <p style="margin: 10px 0; color: #333;"><strong>Password:</strong> ${data.credentials.password}</p>
              <p style="margin: 10px 0 0 0; color: #059669; font-size: 14px;">
                Please keep these credentials safe and do not share them with anyone.
              </p>
            </div>
            <p style="color: #666; line-height: 1.6;">
              You can now login to your student dashboard to access your courses, schedule, and learning materials.
            </p>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${typeof window !== 'undefined' ? window.location.origin : 'https://brilliantroots.com'}/signin" 
               style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Login to Your Dashboard
            </a>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #f59e0b;">
            <h4 style="color: #92400e; margin-top: 0;">Next Steps:</h4>
            <ol style="color: #666; line-height: 1.6; padding-left: 20px;">
              <li>Login to your student dashboard using the credentials above</li>
              <li>Complete your profile setup</li>
              <li>Access your course materials</li>
              <li>Join your first live class</li>
            </ol>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; 2024 Brilliant Roots. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `
        Dear ${data.studentName},
        
        Congratulations! Your application for ${data.course} has been approved.
        
        Your Login Credentials:
        Username: ${data.credentials.username}
        Password: ${data.credentials.password}
        
        Please login to your student dashboard to get started with your learning journey.
        
        Best regards,
        Brilliant Roots Team
      `
    };

    // Send to both student and parent
    const studentEmailSent = await this.sendEmail(emailContent);
    
    // Also send notification to parent
    if (data.parentEmail && data.parentEmail !== data.studentEmail) {
      const parentEmailContent: EmailData = {
        to: data.parentEmail,
        subject: "Application Approved - Brilliant Roots",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Great News!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Application Approved</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
              <h2 style="color: #333; margin-top: 0;">Dear Parent/Guardian,</h2>
              <p style="color: #666; line-height: 1.6;">
                We are pleased to inform you that ${data.studentName}'s application for the <strong>${data.course}</strong> program at Brilliant Roots has been approved!
              </p>
              <p style="color: #666; line-height: 1.6;">
                Your child has been sent their login credentials separately via email. They can now access their student dashboard and begin their learning journey with us.
              </p>
              <p style="color: #666; line-height: 1.6;">
                If you have any questions or need assistance, please don't hesitate to contact our support team.
              </p>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
              <p>&copy; 2024 Brilliant Roots. All rights reserved.</p>
            </div>
          </div>
        `,
        text: `
          Dear Parent/Guardian,
          
          Great news! ${data.studentName}'s application for ${data.course} at Brilliant Roots has been approved.
          
          Your child has received their login credentials via email and can now access their student dashboard.
          
          Best regards,
          Brilliant Roots Team
        `
      };
      
      await this.sendEmail(parentEmailContent);
    }

    return studentEmailSent;
  },

  // Send rejection email
  async sendRejectionEmail(data: ApplicationEmailData): Promise<boolean> {
    const emailContent: EmailData = {
      to: data.studentEmail,
      subject: "Application Update - Brilliant Roots",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Application Update</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Brilliant Roots</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
            <h2 style="color: #333; margin-top: 0;">Dear ${data.studentName},</h2>
            <p style="color: #666; line-height: 1.6;">
              Thank you for your interest in Brilliant Roots and for taking the time to apply for our <strong>${data.course}</strong> program.
            </p>
            <p style="color: #666; line-height: 1.6;">
              After careful consideration, we regret to inform you that we are unable to approve your application at this time. This decision does not reflect on your potential or abilities.
            </p>
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
              <h4 style="color: #dc2626; margin-top: 0;">What's Next?</h4>
              <p style="color: #666; line-height: 1.6; margin: 10px 0;">
                You are welcome to reapply after 30 days. We encourage you to review the application requirements and consider strengthening your profile in the meantime.
              </p>
            </div>
            <p style="color: #666; line-height: 1.6;">
              We wish you the very best in your educational journey and hope you'll consider Brilliant Roots again in the future.
            </p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; 2024 Brilliant Roots. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `
        Dear ${data.studentName},
        
        Thank you for applying to Brilliant Roots for ${data.course}.
        
        After careful consideration, we are unable to approve your application at this time. You are welcome to reapply after 30 days.
        
        We wish you the best in your educational journey.
        
        Best regards,
        Brilliant Roots Team
      `
    };

    return this.sendEmail(emailContent);
  },

  // Generic email sending function (in production, integrate with real email service)
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // In production, this would call a real email service API
      // For demo purposes, we'll simulate the email sending
      
      console.log("Sending email:", {
        to: emailData.to,
        subject: emailData.subject,
        timestamp: new Date().toISOString()
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store sent emails in localStorage for demo purposes
      if (typeof window !== "undefined") {
        const sentEmails = JSON.parse(localStorage.getItem("sentEmails") || "[]");
        sentEmails.push({
          ...emailData,
          sentAt: new Date().toISOString(),
          id: Date.now().toString()
        });
        localStorage.setItem("sentEmails", JSON.stringify(sentEmails));
      }

      console.log("Email sent successfully to:", emailData.to);
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  },

  // Get list of sent emails (for demo/admin purposes)
  getSentEmails(): any[] {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("sentEmails") || "[]");
    }
    return [];
  }
};
