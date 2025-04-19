import crypto from 'crypto';
import express from 'express';
import FabricCAServices, {
    IIdentityRequest,
    IKeyValueAttribute,
} from 'fabric-ca-client';
import { IdentityContext } from 'fabric-ca-client/lib/IdentityService';
import fs from 'fs';
import QRCode from 'qrcode';

const app = express();
app.use(express.json());

const caURL = 'https://localhost:7054';
const tlsCert = fs.readFileSync(
    'fabric-samples/test-network/organizations/fabric-ca/org1/tls-cert.pem',
).toString();
const ca = new FabricCAServices(caURL, {
    trustedRoots: [tlsCert],
    verify: false,
});

const superAdmin = {
    id: 'superadmin',
    secret: 'superpw',
    mspId: 'RootMSP',
};

async function getSuperAdminContext(): Promise<IdentityContext> {
    const enrollment = await ca.enroll({
        enrollmentID: superAdmin.id,
        enrollmentSecret: superAdmin.secret,
    });

    const context = ca.newIdentityService();
    const identityContext: IdentityContext = {
        certificate: enrollment.certificate,
        privateKey: enrollment.key,
    };

    return identityContext;
}

app.post('/api/superadmin/create-org-admin', async (req, res) => {
    const { orgId, adminId, adminSecret, affiliation } = req.body;
    try {
        const identityContext = await getSuperAdminContext();
        const provider = ca.newIdentityService();

        const attrs: IKeyValueAttribute[] = [
            { name: 'role', value: 'orgAdmin', ecert: true },
            { name: 'org', value: orgId, ecert: true },
        ];

        const request: IIdentityRequest = {
            enrollmentID: adminId,
            enrollmentSecret: adminSecret,
            affiliation: affiliation || orgId,
            attrs,
        };

        await provider.create(request, identityContext);
        res.json({
            message: `Админ ${adminId} для организации ${orgId} создан.`,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(4003, () => console.log('🏥 Fixed CA server running on port 4003'));
