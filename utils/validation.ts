import { ContactFormData, ValidationError } from '@/types/contact';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContactForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check required fields
  const requiredFields: (keyof ContactFormData)[] = [
    'fullName',
    'email',
    'weightLossStage',
    'challenges',
    'previousAttempts',
    'mentalHealthConcerns',
    'successVision',
    'timelineToStart',
    'ctaSource'
  ];

  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push({
        field,
        message: `${field} is required`
      });
    }
  }

  // Validate email format
  if (data.email && !validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please provide a valid email address'
    });
  }

  // Check honeypot field (should be empty)
  if (data.honeypot && data.honeypot.trim() !== '') {
    errors.push({
      field: 'honeypot',
      message: 'Spam detected'
    });
  }

  // Validate field lengths
  if (data.fullName && data.fullName.length > 100) {
    errors.push({
      field: 'fullName',
      message: 'Full name must be less than 100 characters'
    });
  }

  if (data.email && data.email.length > 320) {
    errors.push({
      field: 'email',
      message: 'Email must be less than 320 characters'
    });
  }

  if (data.phone && data.phone.length > 20) {
    errors.push({
      field: 'phone',
      message: 'Phone number must be less than 20 characters'
    });
  }

  return errors;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}