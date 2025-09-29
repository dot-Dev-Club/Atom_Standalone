// EmailJS Configuration
// You need to set up an EmailJS account and replace these values

export const EMAILJS_CONFIG = {
  // Get these from your EmailJS dashboard: https://www.emailjs.com/
  SERVICE_ID: 'YOUR_SERVICE_ID', // e.g., 'service_abc123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // e.g., 'template_xyz789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // e.g., 'user_abcdef123456'
};

// Email template variables for reference:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{from_mobile}} - Sender's mobile
// {{to_email}} - Recipient email (atom@karunya.edu)
// {{message}} - The formatted message
// {{reply_to}} - Reply-to email address