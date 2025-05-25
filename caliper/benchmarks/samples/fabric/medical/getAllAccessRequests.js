'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { v4: uuidv4 } = require('uuid');

class GetAllAccessRequestsWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async submitTransaction() {
        const args = {
            contractId: 'mycc',
            contractFunction: 'GetAllAccessRequests',
            contractArguments: ['patient-1'],
            readOnly: true
        };
        await this.sutAdapter.sendRequests(args);
    }
}

function getAllAccessRequests() {
    return new GetAllAccessRequestsWorkload();
}

module.exports.createWorkloadModule = getAllAccessRequests;