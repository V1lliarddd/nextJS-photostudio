import { z } from 'zod';

export const schema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(30, 'First name must be less than 30 characters'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(30, 'Last name must be less than 30 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'),
  service: z.string().nonempty('Select service'),
  description: z
    .string()
    .min(1, 'Project description is required')
    .max(150, 'Project description must be less than 150 characters'),
});

export type TSchema = z.infer<typeof schema>;
