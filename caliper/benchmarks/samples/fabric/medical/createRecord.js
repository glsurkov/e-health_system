'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { v4: uuidv4 } = require('uuid');

class CreateRecordWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.txIndex = 0;
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.txIndex = workerIndex;
        this.workerIndex = workerIndex;
    }

    async submitTransaction() {
        const patientId = `patient-1`;
        const doctorId = `doctor-1`;
        const dataHash = `hash-1`;
        const recordId = this.txIndex;

        const args = {
            contractId: 'mycc',
            contractVersion: 'v1',
            contractFunction: 'CreateRecord',
            contractArguments: [patientId, doctorId, dataHash, `${recordId}-${this.workerIndex}`],
            timeout: 30
        };

        await this.sutAdapter.sendRequests(args);

        this.txIndex = this.txIndex + 5;
    }
}

function createWorkloadModule() {
    return new CreateRecordWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
