import FabricCAServices from 'fabric-ca-client';
import { Wallet } from 'fabric-network';

// import * as config from '../config/config';
import { UserRole } from '../../const/user';
import { parseCertificateFromString } from '../../lib/certificate/certificate-utils';
import { logger } from '../../lib/logger/logger';

export function buildCAClient(
    FabricCAServices: any,
    ccp: any,
    caHostName: string
) {
    const caInfo = ccp.certificateAuthorities[caHostName];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    return new FabricCAServices(
        caInfo.url,
        { trustedRoots: caTLSCACerts, verify: false },
        caInfo.caName
    );
}

export async function enrollAdmin({
    caClient,
    mspOrgId,
}: {
    caClient: FabricCAServices;
    mspOrgId: string;
}) {
    const enrollment = await caClient.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: 'adminpw',
    });
    const x509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: mspOrgId,
        type: 'X.509',
    };
    return x509Identity;
}

export async function registerUser({
    caClient,
    // mspOrgId,
    userId,
    affiliation,
    adminCertificate,
    wallet,
    userRole,
}: {
    caClient: FabricCAServices;
    mspOrgId: string;
    userId: string;
    affiliation: string;
    adminCertificate: any;
    wallet: Wallet;
    userRole: UserRole;
}) {
    if (userRole !== UserRole.admin && adminCertificate) {
        logger.info(adminCertificate);
        const cert = parseCertificateFromString(adminCertificate);
        const issuerName = cert.issuer.attributes.find(
            (attr) => attr.name === 'commonName'
        )?.value;

        if (issuerName !== 'ca.org1.example.com') {
            throw new Error('Wrong certificate');
        }
    }

    const serviceIdentity = await wallet.get('bootstrapAdmin');

    if (!serviceIdentity) {
        throw new Error(
            'Service identity org1.serviceAdmin not found in wallet'
        );
    }

    const provider = wallet
        .getProviderRegistry()
        .getProvider(serviceIdentity.type);

    const adminUser = await provider.getUserContext(
        serviceIdentity,
        'bootstrapAdmin'
    );

    const secret = await caClient.register(
        {
            affiliation,
            enrollmentID: userId,
            role: userRole,
            attrs:
                userRole === UserRole.admin
                    ? [
                          {
                              name: 'hf.Registrar.Roles',
                              value: `${UserRole.doctor},${UserRole.patient}`,
                          },
                      ]
                    : [],
        },
        adminUser
    );

    return secret;
}

export const enrollUser = async ({
    caClient,
    userId,
    mspOrgId,
    secret,
}: {
    caClient: FabricCAServices;
    userId: string;
    mspOrgId: string;
    secret: string;
}) => {
    const enrollment = await caClient.enroll({
        enrollmentID: userId,
        enrollmentSecret: secret,
    });
    const x509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: mspOrgId,
        type: 'X.509',
    };
    return x509Identity;
};
