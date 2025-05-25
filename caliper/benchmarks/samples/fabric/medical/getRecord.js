'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class GetRecordWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.txIndex = 0;
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        this.txIndex = workerIndex;
    }

    async submitTransaction() {
        const recordId = this.txIndex;

        const args = {
            contractId: 'mycc',
            contractVersion: 'v1',
            contractFunction: 'GetRecord',
            contractArguments: [1],
            timeout: 30,
            readOnly: true
        };

        const value = await this.sutAdapter.sendRequests(args);

        if(value.status === 'success') {
            console.log(value);
            console.log('Read Index', this.txIndex);
        }

        this.txIndex = this.txIndex + 5;
    }
}

function createWorkloadModule() {
    return new GetRecordWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
