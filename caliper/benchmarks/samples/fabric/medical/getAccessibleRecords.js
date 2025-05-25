'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { v4: uuidv4 } = require('uuid');

class GetAccessibleRecordsWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async submitTransaction() {
        const args = {
            contractId: 'mycc',
            contractFunction: 'GetAccessibleRecords',
            contractArguments: ['doctor-1'],
            readOnly: true
        };
        await this.sutAdapter.sendRequests(args);
    }
}

function getAccessibleRecords() {
    return new GetAccessibleRecordsWorkload();
}

module.exports.createWorkloadModule = getAccessibleRecords;