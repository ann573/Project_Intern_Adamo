import { z } from 'zod'
// ... existing code ...

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone Number is required')
    .regex(/^(0\d{9}|\+\d{10})$/, 'Phone Number must be 10 digits starting with 0 and contain no letters'),
  address: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Province/Region is required'),
  zip: z.string().min(1, 'Zip Code/ Postal Code is required'),
  country: z.string().min(1, 'Country is required'),
  paymentMethod: z.string().min(1, 'Payment Method is required'),
  specialRequirement: z.string().optional()
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

export default checkoutSchema
