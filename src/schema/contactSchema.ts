import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  email: z.string()
    .email('Invalid email format'),
  
  telephone: z.string()
    .regex(/^(\+84|84|0)?[1-9]\d{8}$/, 'Invalid Vietnamese phone number format'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
});

export type ContactFormData = z.infer<typeof contactSchema>;
