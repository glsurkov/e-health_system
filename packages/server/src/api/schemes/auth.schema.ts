import { z } from 'zod';

export const registerUserSchema = z.object({
    userId: z.string().min(3),
    adminCertificate: z
        .string()
        .startsWith('-----BEGIN CERTIFICATE-----')
        .optional(),
    affiliation: z.string().default('org1.department1'),
    role: z.string().default('patient'),
});

export const enrollUserSchema = z.object({
    userId: z.string().min(3),
    secret: z.string(),
});
