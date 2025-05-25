/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * This is the main entrypoint for the sample REST server, which is responsible
 * for connecting to the Fabric network and setting up a job queue for
 * processing submit transactions
 */

import * as config from './api/config/config';
import {
    createGateway,
    createWallet,
    getContracts,
    getNetwork,
} from './external-services/fabric/fabric';
import {
    initJobQueue,
    initJobQueueScheduler,
    initJobQueueWorker,
} from './external-services/fabric/jobs';
import { logger } from './lib/logger/logger';
import { createServer } from './server';
import { isMaxmemoryPolicyNoeviction } from './external-services/redis/redis';
import { Queue, QueueScheduler, Worker } from 'bullmq';
import { buildCAClient } from './api/services/fabric';
import FabricCAServices from 'fabric-ca-client';
import { X509Identity } from 'fabric-network';

let jobQueue: Queue | undefined;
let jobQueueWorker: Worker | undefined;
let jobQueueScheduler: QueueScheduler | undefined;

async function main() {
    logger.info('Checking Redis config');
    if (!(await isMaxmemoryPolicyNoeviction())) {
        throw new Error(
            'Invalid redis configuration: redis instance must have the setting maxmemory-policy=noeviction'
        );
    }

    logger.info('Creating REST server');
    const app = await createServer();

    logger.info('Connecting to Fabric network with org1 mspid');
    const wallet = await createWallet();

    const caClient = buildCAClient(
        FabricCAServices,
        config.connectionProfileOrg1,
        'ca.org1.example.com',
    );
    const enrollment = await caClient.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: 'adminpw',
    });

    const x509Admin: X509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: config.mspIdOrg1,
        type: 'X.509',
    };

    await wallet.put('bootstrapAdmin', x509Admin);

    const gatewayOrg1 = await createGateway(
        config.connectionProfileOrg1,
        config.mspIdOrg1,
        wallet
    );
    const networkOrg1 = await getNetwork(gatewayOrg1);
    const contractsOrg1 = await getContracts(networkOrg1);

    app.locals[config.mspIdOrg1] = contractsOrg1;

    logger.info('Connecting to Fabric network with org2 mspid');
    const gatewayOrg2 = await createGateway(
        config.connectionProfileOrg2,
        config.mspIdOrg2,
        wallet,
    );
    const networkOrg2 = await getNetwork(gatewayOrg2);
    const contractsOrg2 = await getContracts(networkOrg2);

    app.locals[config.mspIdOrg2] = contractsOrg2;

    logger.info('Initialising submit job queue');
    jobQueue = initJobQueue();
    jobQueueWorker = initJobQueueWorker(app);
    if (config.submitJobQueueScheduler === true) {
        logger.info('Initialising submit job queue scheduler');
        jobQueueScheduler = initJobQueueScheduler();
    }
    app.locals.jobq = jobQueue;
    app.locals.wallet = wallet;
    app.locals.ca = caClient;
    app.locals.gateways = [gatewayOrg1, gatewayOrg2];

    logger.info('Starting REST server');
    app.listen(config.port, () => {
        logger.info('REST server started on port: %d', config.port);
    });
}

main().catch(async (err) => {
    logger.error({ err }, 'Unxepected error');

    if (jobQueueScheduler != undefined) {
        logger.debug('Closing job queue scheduler');
        await jobQueueScheduler.close();
    }

    if (jobQueueWorker != undefined) {
        logger.debug('Closing job queue worker');
        await jobQueueWorker.close();
    }

    if (jobQueue != undefined) {
        logger.debug('Closing job queue');
        await jobQueue.close();
    }
});
