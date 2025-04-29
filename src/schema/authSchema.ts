import * as z from 'zod'

export const registerSchema = z.object({
  f_name: z.string().min(2, 'First name is required'),
  l_name: z.string().min(2, 'Last name is required'),
  email: z.string().email('Must be a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&.,/*]/, 'Password must contain at least one special character')
})

export const loginSchema = z.object({
  email: z.string().email('Must be a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&.,/*]/, 'Password must contain at least one special character')
})

export const emailSchema = z.object({
  email: z.string().email('Must be a valid email address')
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[!@#$%^&.,/*]/, 'Password must contain at least one special character'),

    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
