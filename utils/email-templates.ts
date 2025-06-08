import { ContactFormData } from '@/types/contact';

export function generateHtmlTemplate(data: ContactFormData): string {
  const formatFieldName = (field: string): string => {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f8f9fa;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .field-group {
          margin-bottom: 25px;
          border-left: 4px solid #667eea;
          padding-left: 20px;
          background: #f8f9ff;
          padding: 15px 20px;
          border-radius: 0 8px 8px 0;
        }
        .field-label {
          font-weight: 600;
          color: #4a5568;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .field-value {
          color: #2d3748;
          font-size: 16px;
          line-height: 1.5;
        }
        .footer {
          background: #f7fafc;
          padding: 20px 30px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #718096;
          font-size: 14px;
        }
        .timestamp {
          font-style: italic;
          color: #a0aec0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌟 New Contact Form Submission</h1>
        </div>
        
        <div class="content">
          <div class="field-group">
            <div class="field-label">Full Name</div>
            <div class="field-value">${data.fullName}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></div>
          </div>
          
          ${data.phone ? `
          <div class="field-group">
            <div class="field-label">Phone Number</div>
            <div class="field-value"><a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">${data.phone}</a></div>
          </div>
          ` : ''}
          
          <div class="field-group">
            <div class="field-label">Weight Loss Stage</div>
            <div class="field-value">${data.weightLossStage}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Current Challenges</div>
            <div class="field-value">${data.challenges}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Previous Attempts</div>
            <div class="field-value">${data.previousAttempts}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Mental Health Concerns</div>
            <div class="field-value">${data.mentalHealthConcerns}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Success Vision</div>
            <div class="field-value">${data.successVision}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Timeline To Start</div>
            <div class="field-value">${data.timelineToStart}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">CTA Source</div>
            <div class="field-value">${data.ctaSource}</div>
          </div>
        </div>
        
        <div class="footer">
          <p class="timestamp">Submitted on ${new Date().toLocaleString()}</p>
          <p>This email was automatically generated from your contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generatePlainTextTemplate(data: ContactFormData): string {
  return `
NEW CONTACT FORM SUBMISSION
==========================

Full Name: ${data.fullName}
Email: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}

Weight Loss Stage: ${data.weightLossStage}

Current Challenges:
${data.challenges}

Previous Attempts:
${data.previousAttempts}

Mental Health Concerns:
${data.mentalHealthConcerns}

Success Vision:
${data.successVision}

Timeline To Start: ${data.timelineToStart}

CTA Source: ${data.ctaSource}

--
Submitted on: ${new Date().toLocaleString()}
This email was automatically generated from your contact form.
  `.trim();
}