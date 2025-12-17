import {z} from 'zod';

export const validateTransaction = z.object({
    title: z.string().min(1, 'title is required.'),
    amount : z.number(),
    type:z.string().min(3, 'type is required'),
    category : z.string()
})
