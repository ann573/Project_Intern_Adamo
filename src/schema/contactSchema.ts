import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'schema.name.min').max(50, 'schema.name.max'),

  email: z.string().email('schema.email'),

  telephone: z.string().regex(/^(\+84|84|0)?[1-9]\d{8}$/, 'schema.telephone'),

  message: z.string().min(10, 'schema.message.min').max(1000, 'schema.message.max')
})

export type ContactFormData = z.infer<typeof contactSchema>
