import { NextApiRequest, NextApiResponse } from 'next';
import { ContactFormData, ApiResponse, EmailConfig } from '@/types/contact';
import { validateContactForm, sanitizeInput } from '@/utils/validation';
import { EmailService } from '@/utils/email-service';
import { applyCors } from '@/utils/cors-middleware';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Apply CORS middleware
  await applyCors(req, res);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.',
    });
  }

  try {
    // Validate environment variables
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact the administrator.',
      });
    }

    // Extract and sanitize form data
    const rawData: ContactFormData = {
      fullName: sanitizeInput(req.body.fullName || ''),
      email: sanitizeInput(req.body.email || ''),
      phone: req.body.phone ? sanitizeInput(req.body.phone) : '',
      weightLossStage: sanitizeInput(req.body.weightLossStage || ''),
      challenges: sanitizeInput(req.body.challenges || ''),
      previousAttempts: sanitizeInput(req.body.previousAttempts || ''),
      mentalHealthConcerns: sanitizeInput(req.body.mentalHealthConcerns || ''),
      successVision: sanitizeInput(req.body.successVision || ''),
      timelineToStart: sanitizeInput(req.body.timelineToStart || ''),
      honeypot: req.body.honeypot || '',
      ctaSource: sanitizeInput(req.body.ctaSource || ''),
    };

    // Validate form data
    const validationErrors = validateContactForm(rawData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check your input and try again.',
        errors: validationErrors,
      });
    }

    // Configure email service
    const emailConfig: EmailConfig = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      from: process.env.SMTP_FROM,
    };

    const emailService = new EmailService(emailConfig);

    // Verify SMTP connection
    const isConnected = await emailService.verifyConnection();
    if (!isConnected) {
      console.error('SMTP connection verification failed');
      return res.status(500).json({
        success: false,
        message: 'Email service is currently unavailable. Please try again later.',
      });
    }

    // Send email notification
    await emailService.sendContactFormEmail(rawData);

    // Log successful submission (without sensitive data)
    console.log(`Contact form submitted successfully by ${rawData.fullName} (${rawData.email})`);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your submission! We will get back to you soon.',
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}