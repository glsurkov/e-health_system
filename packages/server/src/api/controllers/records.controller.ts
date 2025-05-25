import { AccessGrantStatuses } from 'asset-transfer-basic/dist/MedicalRecordContract-iterators-final';
import { Request, Response } from 'express';

import * as config from '../config/config';
import { PermissionStatus } from 'web-client/src/entities/permission/types/status';

export const createRecord = async (req: Request, res: Response) => {
    const { patientId, doctorId, dataHash, userId } = req.body;
    try {
        const contract = req.app.locals[config.mspIdOrg1]?.recordContract;
        await contract.submitTransaction(
            'CreateRecord',
            patientId,
            doctorId,
            dataHash,
        );
        res.status(201).send('Record created');
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateRecord = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { doctorId, dataHash, userId } = req.body;
    try {
        const contract = req.app.locals[config.mspIdOrg1]?.recordContract;
        await contract.submitTransaction(
            'UpdateRecord',
            id,
            doctorId,
            dataHash,
        );
        res.send('Record updated');
    } catch (err: any) {
        res.status(403).json({ error: err.message });
    }
};

export const getAllRecords = async (req: Request, res: Response) => {
    const { userId } = req.query;
    try {
        const contract = req.app.locals[config.mspIdOrg1]?.recordContract;
        const result = await contract.evaluateTransaction(
            'GetAccessibleRecords',
            userId as string,
        );

        const parsedResult: any[] = JSON.parse(result.toString());
        res.json(
            parsedResult.map((record) => {
                return {
                    id: record.id,
                    title: record.id,
                    recordAuthor: {
                        id: record.doctorId,
                        fullname: record.doctorId,
                        position: 'doctor',
                        email: record.doctorId,
                        additionalInfo: '',
                        organization: 'WSH National Hospital',
                    },
                    date: new Date(record.createdAt),
                };
            }),
        );
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getRecord = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.query;

    try {
        const contract = req.app.locals[config.mspIdOrg1]?.recordContract;
        const result = await contract.evaluateTransaction('GetRecord', id);

        const parsedResult = JSON.parse(result.toString());
        res.json({
            id: parsedResult.id,
            title: parsedResult.id,
            recordAuthor: {
                id: parsedResult.doctorId,
                fullname: parsedResult.doctorId,
                position: 'doctor',
                email: parsedResult.doctorId,
                additionalInfo: '',
                organization: 'WSH National Hospital',
            },
            date: new Date(parsedResult.createdAt),
            data: parsedResult.dataHash,
        });
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};

export const requestAccess = async (req: Request, res: Response) => {
    const { requestById, requestToId, permission, userId } = req.body;
    try {
        const contract = req.app.locals[config.mspIdOrg1]?.recordContract;
        await contract.submitTransaction(
            'RequestAccessToRecord',
            requestById,
            requestToId,
            permission,
        );
        res.status(200).send('Access request submitted');
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const grantAccess = async (req: Request, res: Response) => {
    const { requestId, callerId, isAccepted, userId } = req.body;
    try {
        const contract = req.app.locals[config.mspIdOrg1]?.recordContract;
        await contract.submitTransaction(
            'GrantAccess',
            requestId,
            callerId,
            String(isAccepted),
        );
        res.status(200).send('Access updated');
    } catch (err: any) {
        res.status(403).json({ error: err.message });
    }
};

export const getAllAccessRequests = async (req: Request, res: Response) => {
    const { userId } = req.query;
    try {
        const contract = req.app.locals[config.mspIdOrg1]?.recordContract;
        const result = await contract.evaluateTransaction(
            'GetAllAccessRequests',
            userId,
        );

        const parsedResult = JSON.parse(result.toString());
        res.status(200).send(
            parsedResult.map((request) => {
                return {
                    id: request.id,
                    fullname: request.doctorId,
                    position: 'doctor',
                    date: new Date(request.requestedAt),
                    status: request.status,
                };
            }),
        );
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};
