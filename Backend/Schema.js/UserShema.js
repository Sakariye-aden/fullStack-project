import {z} from 'zod'

export const schemaCheck = z.object({
    name : z.string().min(2, 'name is required.'),
    email : z.string().email('email is reqiured.'),
    password : z.string().min(6, 'password must be at least 6 characters.'),
    role:z.enum(['user', 'admin']).optional(),
    profile: z.string().optional()
})
