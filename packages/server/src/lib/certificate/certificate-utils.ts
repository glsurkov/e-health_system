import * as x509 from '@fidm/x509';

export const parseCertificateFromString = (certificate: string) => {
    const parsedCertificate = JSON.parse(certificate);
    const cleanPem = parsedCertificate.replace(/\\n/g, '\n').trim();
    return x509.Certificate.fromPEM(Buffer.from(cleanPem));
};
