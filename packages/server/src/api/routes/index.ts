import express from 'express';

import { authenticateApiKey } from '../middleware/auth';
import { router as assetsRouter } from './assets.router';
import { router as authRouter } from './auth.router';
import { router as jobsRouter } from './jobs.router';
import { router as recordsRouter } from './records.router';
import { router as transactionsRouter } from './transactions.router';

export const router = express.Router();

router.use('/assets', authenticateApiKey, assetsRouter);
router.use('/jobs', authenticateApiKey, jobsRouter);
router.use('/transactions', authenticateApiKey, transactionsRouter);
router.use('/auth', authenticateApiKey, authRouter);
router.use('/records', authenticateApiKey, recordsRouter);
