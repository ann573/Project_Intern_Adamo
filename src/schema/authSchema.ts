import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email('register.email'),
  password: z
    .string()
    .min(6, 'register.password.min')
    .regex(/[a-z]/, 'register.password.pattern1')
    .regex(/[0-9]/, 'register.password.pattern2')
    .regex(/[!@#$%^&.,/*]/, 'register.password.pattern3')
})

export const registerSchema = loginSchema.extend({
  f_name: z.string().min(2, 'register.f_name'),
  l_name: z.string().min(2, 'register.l_name')
})

export const emailSchema = loginSchema.pick({ email: true })

export const resetPasswordSchema = loginSchema
  .pick({ password: true })
  .extend({
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'register.re_password',
    path: ['confirmPassword']
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
