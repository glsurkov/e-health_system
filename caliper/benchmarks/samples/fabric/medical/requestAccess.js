'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { v4: uuidv4 } = require('uuid');

class RequestAccessWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.txIndex = 0;
    }

    async submitTransaction() {
        const args = {
            contractId: 'mycc',
            contractFunction: 'RequestAccessToRecord',
            contractArguments: [
                `doctor-1`,
                `patient-1`,
                'read'
            ],
            timeout: 30
        };
        await this.sutAdapter.sendRequests(args);
        this.txIndex = this.txIndex + 5;
    }
}

function requestAccessToRecord() {
    return new RequestAccessWorkload();
}

module.exports.createWorkloadModule = requestAccessToRecord;