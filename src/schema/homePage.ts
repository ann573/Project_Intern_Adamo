import * as z from 'zod'

export const emailSchema = z.object({
    email: z.string().email("Phải là một email hợp lệ"),
})

