'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class UpdateRecordWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.txIndex = 0;
        this.workerIndex = 0;
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.txIndex = workerIndex;
        this.workerIndex = workerIndex;
    }

    async submitTransaction() {
        const recordId = this.txIndex;
        const doctorId = `doctor-1`;
        const newHash = `new-hash-1`;

        const args = {
            contractId: 'mycc',
            contractVersion: 'v1',
            contractFunction: 'UpdateRecord',
            contractArguments: [`${recordId}-${this.workerIndex}`, doctorId, newHash],
            timeout: 30
        };

        await this.sutAdapter.sendRequests(args);
        this.txIndex = this.txIndex + 5;
    }
}

function createWorkloadModule() {
    return new UpdateRecordWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
