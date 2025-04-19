import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Gateway, Wallets } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ccpPath = path.resolve(__dirname, '..', 'connection-profile.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function getContract() {
    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork('mychannel');
    return network.getContract('medchain');
}

app.post('/api/record', async (req, res) => {
    const { recordId, hash, patientHash, initiator, timestamp } = req.body;
    try {
        const contract = await getContract();
        await contract.submitTransaction(
            'AddRecord',
            recordId,
            hash,
            patientHash,
            initiator,
            timestamp,
        );
        res.status(200).json({ message: 'Record added to blockchain' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/record/:id', async (req, res) => {
    try {
        const contract = await getContract();
        const result = await contract.evaluateTransaction(
            'GetRecord',
            req.params.id,
        );
        res.status(200).json(JSON.parse(result.toString()));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
