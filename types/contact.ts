export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  weightLossStage: string;
  challenges: string;
  previousAttempts: string;
  mentalHealthConcerns: string;
  successVision: string;
  timelineToStart: string;
  honeypot: string;
  ctaSource: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  errors?: ValidationError[];
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}