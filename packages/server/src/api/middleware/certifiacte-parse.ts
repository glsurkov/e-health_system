import { NextFunction, Request, Response } from 'express';

import { parseCertificateFromString } from '../../lib/certificate/certificate-utils';

export const parseClientCertMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const certPem = req.headers['x-cert'];
    if (!certPem || typeof certPem !== 'string') {
        return res.status(401).json({ error: 'Missing X.509 certificate' });
    }

    try {
        const cert = parseCertificateFromString(certPem);
        console.log(JSON.parse(cert).subject);

        // req.user = {
        //     subject: cert.subject,
        //     issuer: cert.issuer,
        //     serialNumber: cert.serialNumber,
        //     // notBefore: cert.notBefore,
        //     // notAfter: cert.notAfter,
        //     // thumbprint: cert.thumbprint,
        // };

        next();
    } catch (err) {
        console.error('Failed to parse certificate:', err);
        return res.status(400).json({ error: 'Invalid X.509 certificate' });
    }
};
