import { X509Certificate } from '@peculiar/x509';

export function parseCertificate(pem: string) {
    const b64 = pem
        .replace(/-----BEGIN CERTIFICATE-----/, '')
        .replace(/-----END CERTIFICATE-----/, '')
        .replace(/\s+/g, '');

    const der = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const cert = new X509Certificate(der.buffer);

    console.log(cert);
    console.log({
        subject: cert.subject,
        role: cert.subjectName.asn[0][1].value.printableString,
        issuer: cert.issuer,
        notBefore: cert.notBefore,
        notAfter: cert.notAfter,
        serialNumber: cert.serialNumber,
    })

    return {
        subject: cert.subject,
        role: cert.subjectName.asn[0][1].value.printableString,
        issuer: cert.issuer,
        notBefore: cert.notBefore,
        notAfter: cert.notAfter,
        serialNumber: cert.serialNumber,
    };
}
