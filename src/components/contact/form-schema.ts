import { z } from 'zod'

export const formSchema = z.object({
  first_name: z.string().min(1, { message: 'Please enter a first name' }),
  last_name: z.string().min(1, { message: 'Please enter a last name' }),
  mobile: z.string().regex(/^\+?\d{10}$/, 'Phone should be atleast 10 digits'),
  inquiry_type: z.string(),
  description: z.string(),
})