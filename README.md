# Vercel Contact Form API

A robust TypeScript serverless function for handling contact form submissions with email notifications, deployed on Vercel.

## ✨ Features

- **TypeScript** - Full type safety and IntelliSense support
- **Input Validation** - Comprehensive form validation with detailed error messages
- **Spam Protection** - Honeypot field to prevent automated spam submissions
- **CORS Support** - Cross-origin resource sharing for frontend integration
- **Email Notifications** - Beautiful HTML and plain text email templates
- **Error Handling** - Robust error handling with detailed logging
- **Environment Variables** - Secure configuration management
- **Vercel Ready** - Optimized for Vercel serverless deployment

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd vercel-contact-form-api

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your SMTP configuration:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Contact Form <your-email@gmail.com>"
```

### 3. Development

```bash
# Start development server
npm run dev

# Type checking
npm run type-check
```

### 4. Deployment

```bash
# Deploy to Vercel
npm run deploy

# Or using Vercel CLI directly
vercel --prod
```

## 📧 Email Provider Setup

### Gmail Setup

1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Use these settings:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   SMTP_FROM="Contact Form <your-email@gmail.com>"
   ```

### SendGrid Setup

1. Create a [SendGrid account](https://sendgrid.com/)
2. Generate an API key
3. Use these settings:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   SMTP_FROM="Contact Form <noreply@yourdomain.com>"
   ```

## 🔌 API Documentation

### Endpoint

```
POST /api/contact
```

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "weightLossStage": "Just starting",
  "challenges": "Lack of motivation and time constraints",
  "previousAttempts": "Tried various diets but couldn't stick to them",
  "mentalHealthConcerns": "Stress eating and emotional triggers",
  "successVision": "Feeling confident and healthy",
  "timelineToStart": "Within the next month",
  "honeypot": "",
  "ctaSource": "Homepage banner"
}
```

### Field Validation

| Field | Type | Required | Max Length | Notes |
|-------|------|----------|------------|-------|
| `fullName` | string | ✅ | 100 chars | Contact's full name |
| `email` | string | ✅ | 320 chars | Valid email format required |
| `phone` | string | ❌ | 20 chars | Optional phone number |
| `weightLossStage` | string | ✅ | - | Current stage in weight loss journey |
| `challenges` | string | ✅ | - | Current challenges faced |
| `previousAttempts` | string | ✅ | - | Previous weight loss attempts |
| `mentalHealthConcerns` | string | ✅ | - | Mental health related concerns |
| `successVision` | string | ✅ | - | Vision of success |
| `timelineToStart` | string | ✅ | - | When they want to start |
| `honeypot` | string | ✅ | - | Must be empty (spam protection) |
| `ctaSource` | string | ✅ | - | Source of the CTA that led to form |

### Success Response

```json
{
  "success": true,
  "message": "Thank you for your submission! We will get back to you soon."
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed. Please check your input and try again.",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

## 🎨 Frontend Integration

### HTML Form Example

```html
<form id="contactForm">
  <input type="text" name="fullName" placeholder="Full Name" required>
  <input type="email" name="email" placeholder="Email Address" required>
  <input type="tel" name="phone" placeholder="Phone Number">
  
  <select name="weightLossStage" required>
    <option value="">Select your stage...</option>
    <option value="Just starting">Just starting</option>
    <option value="Been trying for months">Been trying for months</option>
    <option value="Multiple failed attempts">Multiple failed attempts</option>
  </select>
  
  <textarea name="challenges" placeholder="What challenges are you facing?" required></textarea>
  <textarea name="previousAttempts" placeholder="Tell us about your previous attempts" required></textarea>
  <textarea name="mentalHealthConcerns" placeholder="Any mental health concerns?" required></textarea>
  <textarea name="successVision" placeholder="What does success look like to you?" required></textarea>
  
  <select name="timelineToStart" required>
    <option value="">When do you want to start?</option>
    <option value="Immediately">Immediately</option>
    <option value="Within a week">Within a week</option>
    <option value="Within a month">Within a month</option>
  </select>
  
  <input type="hidden" name="ctaSource" value="Homepage">
  <input type="text" name="honeypot" style="display: none;">
  
  <button type="submit">Submit</button>
</form>
```

### JavaScript Integration

```javascript
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Thank you! Your message has been sent.');
      e.target.reset();
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    alert('Network error. Please try again.');
  }
});
```

### React Integration

```jsx
import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      setMessage(result.message);
      
      if (result.success) {
        e.target.reset();
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Submit'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

## 🛠️ Project Structure

```
├── api/
│   └── contact.ts          # Main API endpoint
├── types/
│   ├── contact.ts          # Type definitions
│   └── environment.d.ts    # Environment variable types
├── utils/
│   ├── validation.ts       # Form validation logic
│   ├── email-service.ts    # Email sending service
│   ├── email-templates.ts  # HTML/text email templates
│   └── cors-middleware.ts  # CORS handling
├── .env.example           # Environment variables template
├── tsconfig.json          # TypeScript configuration
├── vercel.json           # Vercel deployment configuration
└── README.md            # This file
```

## 🔧 Configuration

### TypeScript Configuration

The project uses strict TypeScript settings with path mapping for clean imports:

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/types/*": ["./types/*"],
      "@/utils/*": ["./utils/*"]
    }
  }
}
```

### Vercel Configuration

Optimized for Vercel serverless functions with proper CORS headers:

```json
{
  "functions": {
    "api/contact.ts": {
      "runtime": "@vercel/node"
    }
  }
}
```

## 🚨 Error Handling

The API includes comprehensive error handling for:

- **Validation Errors**: Detailed field-level validation with user-friendly messages
- **SMTP Errors**: Connection and authentication failures
- **Rate Limiting**: Built-in protection against spam
- **Server Errors**: Graceful handling of unexpected errors

## 🔒 Security Features

- **Input Sanitization**: All user inputs are sanitized
- **Honeypot Protection**: Hidden field to catch spam bots
- **Email Validation**: RFC-compliant email format validation
- **Environment Variables**: Sensitive data stored securely
- **CORS Protection**: Configurable cross-origin policies

## 📝 Logging

The API logs important events:

- Successful form submissions (without sensitive data)
- SMTP connection issues
- Validation failures
- Server errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Tips

- Use environment variables for all sensitive configuration
- Test email delivery in development before deploying
- Monitor Vercel function logs for debugging
- Consider implementing rate limiting for production use
- Regularly update dependencies for security

## 🆘 Troubleshooting

### Common Issues

**SMTP Authentication Failed**
- Verify your email provider settings
- For Gmail, ensure you're using an App Password
- Check if 2FA is enabled

**CORS Errors**
- Verify the domain is allowed in CORS settings
- Check browser network tab for specific error details

**Validation Errors**
- Ensure all required fields are included
- Check field length limits
- Verify email format

**Deployment Issues**
- Verify all environment variables are set in Vercel
- Check function logs in Vercel dashboard
- Ensure TypeScript compiles without errors

For additional support, check the [Vercel documentation](https://vercel.com/docs) or create an issue in the repository.