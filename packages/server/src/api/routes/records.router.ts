import express from 'express';

import * as controller from '../controllers/records.controller';
import { withErrorHandling } from '../middleware/errorHandler';

export const router = express.Router();

router.post('/', withErrorHandling(controller.createRecord));

router.put('/access/grant', withErrorHandling(controller.grantAccess));

router.put('/:id', withErrorHandling(controller.updateRecord));

router.get('/', withErrorHandling(controller.getAllRecords));

router.get('/access', withErrorHandling(controller.getAllAccessRequests));

router.get('/:id', withErrorHandling(controller.getRecord));

router.post('/access/request', withErrorHandling(controller.requestAccess));
