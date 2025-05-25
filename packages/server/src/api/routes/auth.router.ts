import { Router } from 'express';

import * as controller from '../controllers/auth.controller';
import { parseClientCertMiddleware } from '../middleware/certifiacte-parse';
import { withErrorHandling } from '../middleware/errorHandler';
import { validate } from '../middleware/validate';
import { enrollUserSchema, registerUserSchema } from '../schemes/auth.schema';

export const router = Router();

router.post(
    '/',
    validate(registerUserSchema),
    withErrorHandling(controller.registerUser),
);

router.get(
    '/me',
    parseClientCertMiddleware,
    withErrorHandling(controller.getMe),
);

router.post(
    '/enroll',
    validate(enrollUserSchema),
    withErrorHandling(controller.enrollUser),
);
