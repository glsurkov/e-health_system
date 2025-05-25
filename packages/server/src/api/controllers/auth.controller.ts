import { Request, Response } from 'express';
import FabricCAServices from 'fabric-ca-client';
import { Wallet } from 'fabric-network';

import { parseCertificateFromString } from '../../lib/certificate/certificate-utils';
import * as config from '../config/config';
import {
    enrollUser as enrollUserService,
    registerUser as registerUserService,
} from '../services/fabric';

export const getMe = async (req: Request, res: Response) => {
    const pem = req.headers['x-cert'] as string;
    if (!pem) return res.status(401).json({ error: 'No certificate provided' });

    const cert = parseCertificateFromString(pem);
    return res.status(200).json({ cert: cert });
};

export const registerUser = async (req: Request, res: Response) => {
    const { userId, affiliation, adminCertificate, role } = req.body;

    const wallet = req.app.locals.wallet as Wallet;
    const caClient = req.app.locals.ca as FabricCAServices;

    const result = await registerUserService({
        caClient,
        userId,
        affiliation: affiliation || 'org1.department1',
        adminCertificate,
        wallet,
        mspOrgId: config.mspIdOrg1,
        userRole: role,
    });

    res.status(200).json({
        message: `User ${userId} registered successfully`,
        secret: result,
    });
};

export const enrollUser = async (req: Request, res: Response) => {
    const { userId, secret } = req.body;
    const caClient = req.app.locals.ca as FabricCAServices;

    const enrollment = await enrollUserService({
        caClient,
        userId,
        mspOrgId: config.mspIdOrg1,
        secret,
    });

    res.status(200).json({
        message: `User ${userId} enrolled successfully`,
        enrollment,
    });
};
