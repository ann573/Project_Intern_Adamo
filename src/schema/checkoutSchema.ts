import { z } from 'zod'
import { registerSchema } from './authSchema'

const checkoutSchema = registerSchema.extend({
  email: z.string().email('register.email'),
  phone: z
    .string()
    .min(1, 'checkout.phone.required')
    .regex(/^(0\d{9}|\+\d{10})$/, 'checkout.phone.pattern'),
  address: z.string().optional(),
  city: z.string().min(1, 'checkout.city'),
  state: z.string().min(1, 'checkout.state'),
  zip: z.string().min(1, 'checkout.zip'),
  country: z.string().min(1, 'checkout.country'),
  paymentMethod: z.string().min(1, 'checkout.payment_method'),
  specialRequirement: z.string().optional()
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

export default checkoutSchema
