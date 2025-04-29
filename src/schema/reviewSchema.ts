import * as z from 'zod'
export const reviewSchema = z.object({
  heading: z.string().min(3, 'Heading must be at least 3 characters').max(30, 'Heading must be at most 30 characters'),
  rating: z.number().min(1).max(10),
  comments: z.string().min(1, 'Comment cannot be empty')
})

export type ReviewForm = z.infer<typeof reviewSchema>
