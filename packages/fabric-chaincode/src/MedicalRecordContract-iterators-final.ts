import {
    Context,
    Contract,
    Info,
    Transaction,
    Returns,
} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

export interface MedicalRecord {
    id: string;
    patientId: string;
    doctorId: string;
    createdAt: string;
    updatedAt: string;
    dataHash: string;
    access: string[];
}

export enum AccessGrantStatuses {
    pending = 'pending',
    rejected = 'rejected',
    accepted = 'accepted',
}

export interface AccessGrant {
    id: string;
    status: AccessGrantStatuses;
    doctorId: string;
    requestTo: string;
    requestedAt: string;
    grantedAt?: string;
    isActive: boolean;
    permission: 'read' | 'write';
}

@Info({
    title: 'MedicalRecordContract',
    description:
        'Smart contract for managing medical records and access control',
})
export class MedicalRecordContract extends Contract {
    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        console.info('MedicalRecordContract initialized');
    }

    @Transaction()
    public async CreateRecord(
        ctx: Context,
        patientId: string,
        doctorId: string,
        dataHash: string,
        recordId: string,
    ): Promise<void> {
        // const recordId = ctx.stub.getTxID();
        const recordKey = this.idToKey('record', recordId);

        const txTime = ctx.stub.getTxTimestamp();
        const timestamp = new Date(txTime.seconds.low * 1000).toISOString();

        const newRecord: MedicalRecord = {
            id: recordId,
            patientId,
            doctorId,
            createdAt: timestamp,
            updatedAt: timestamp,
            dataHash,
            access: [],
        };

        await ctx.stub.putState(
            recordKey,
            Buffer.from(stringify(sortKeysRecursive(newRecord))),
        );
    }

    @Transaction()
    public async UpdateRecord(
        ctx: Context,
        recordId: string,
        doctorId: string,
        dataHash: string,
    ): Promise<void> {
        const recordKey = this.idToKey('record', recordId);
        const buffer = await ctx.stub.getState(recordKey);
        if (!buffer || buffer.length === 0) {
            throw new Error(`Record with id ${recordId} does not exist`);
        }

        const record = JSON.parse(buffer.toString()) as MedicalRecord;
        let hasWriteAccess = false;

        for (const accessId of record.access) {
            const accessBuf = await ctx.stub.getState(accessId);
            if (!accessBuf || accessBuf.length === 0) continue;

            const access = JSON.parse(accessBuf.toString()) as AccessGrant;

            if (
                access.doctorId === doctorId &&
                access.id === record.id &&
                access.permission === 'write' &&
                access.status === AccessGrantStatuses.accepted &&
                access.isActive
            ) {
                hasWriteAccess = true;
                break;
            }
        }

        if (!hasWriteAccess) {
            throw new Error(`Access denied: no write permission for record ${recordId}`);
        }

        const txTime = ctx.stub.getTxTimestamp();
        const timestamp = new Date(txTime.seconds.low * 1000).toISOString();

        record.dataHash = dataHash;
        record.updatedAt = timestamp;

        await ctx.stub.putState(
            recordKey,
            Buffer.from(stringify(sortKeysRecursive(record))),
        );
    }

    @Transaction(false)
    @Returns('string')
    public async GetAccessibleRecords(
        ctx: Context,
        callerId: string,
    ): Promise<string> {
        console.log('Get accessible record');
        const records: MedicalRecord[] = [];
        const iterator = await ctx.stub.getStateByRange('', '');

        while (true) {
            const res = await iterator.next();

            if (res.done) break;
            const buffer = res.value.value;
            if (!buffer || buffer.length === 0) continue;

            if (!res.value || res.value.value.length === 0) continue;

            try {
                const record = JSON.parse(
                    res.value.value.toString(),
                ) as MedicalRecord;
                console.log(record);
                const isOwner = record.patientId === callerId;
                let hasAccess = false;

                if (!isOwner) {
                    for (const accessId of record.access) {
                        const accessBuf = await ctx.stub.getState(accessId);
                        if (!accessBuf || accessBuf.length === 0) continue;

                        const access = JSON.parse(
                            accessBuf.toString(),
                        ) as AccessGrant;

                        if (
                            access.doctorId === callerId &&
                            access.isActive &&
                            access.status === AccessGrantStatuses.accepted &&
                            (access.permission === 'read' ||
                                access.permission === 'write')
                        ) {
                            hasAccess = true;
                            break;
                        }
                    }
                }

                if (isOwner || hasAccess) {
                    records.push(record);
                }
            } catch (err) {
                console.warn('Failed to parse record:', err);
            }
        }

        await iterator.close();
        return JSON.stringify(records);
    }

    @Transaction(false)
    @Returns('string')
    public async GetRecord(ctx: Context, recordId: string): Promise<string> {
        const recordKey = this.idToKey('record', recordId);
        const recordBytes = await ctx.stub.getState(recordKey);
        if (!recordBytes || recordBytes.length === 0) {
            throw new Error(`Record ${recordId} does not exist`);
        }
        return recordBytes.toString();
    }

    @Transaction()
    public async RequestAccessToRecord(
        ctx: Context,
        requestById: string,
        requestToId: string,
        permission: 'read' | 'write',
    ): Promise<void> {
        const recordsIterator = await ctx.stub.getStateByRange('', '');
        let isRecordsExist = false;

        while (true) {
            const res = await recordsIterator.next();
            if (res.done) break;
            const buffer = res.value.value;
            if (!buffer || buffer.length === 0) continue;
            if (!res.value || res.value.value.length === 0) continue;
            const record = JSON.parse(
                res.value.value.toString(),
            ) as MedicalRecord;
            if (record.patientId === requestToId) {
                isRecordsExist = true;
                break;
            }
        }
        await recordsIterator.close();

        if (!isRecordsExist) return;

        const existingRequestsIterator = await ctx.stub.getStateByRange('', '');
        while (true) {
            const res = await existingRequestsIterator.next();
            if (res.done) break;
            const buffer = res.value.value;
            if (!buffer || buffer.length === 0) continue;

            if (!res.value || res.value.value.length === 0) continue;
            const request = JSON.parse(
                res.value.value.toString(),
            ) as AccessGrant;
            if (
                request.doctorId === requestById &&
                request.requestTo === requestToId &&
                request.status === AccessGrantStatuses.pending
            ) {
                throw new Error(`Access request already pending`);
            }
        }
        await existingRequestsIterator.close();

        const requestId = ctx.stub.getTxID();
        const requestKey = this.idToKey('access', requestId);

        const txTime = ctx.stub.getTxTimestamp();
        const timestamp = new Date(txTime.seconds.low * 1000).toISOString();

        const request: AccessGrant = {
            id: requestId,
            doctorId: requestById,
            requestTo: requestToId,
            requestedAt: timestamp,
            status: AccessGrantStatuses.pending,
            permission,
            isActive: true,
        };

        await ctx.stub.putState(
            requestKey,
            Buffer.from(stringify(sortKeysRecursive(request))),
        );
    }

    @Transaction()
    public async GrantAccess(
        ctx: Context,
        requestId: string,
        callerId: string,
        isAccepted: boolean,
    ): Promise<void> {
        const accessKey = this.idToKey('access', requestId);
        const accessBuffer = await ctx.stub.getState(accessKey);
        if (!accessBuffer || accessBuffer.length === 0) {
            throw new Error(
                `Access request with id ${requestId} does not exist`,
            );
        }

        const accessRequest = JSON.parse(
            accessBuffer.toString(),
        ) as AccessGrant;

        if (callerId !== accessRequest.requestTo) {
            throw new Error(`Only the owner of the record can grant access`);
        }

        if (isAccepted) {
            const txTime = ctx.stub.getTxTimestamp();
            const timestamp = new Date(txTime.seconds.low * 1000).toISOString();

            accessRequest.isActive = true;
            accessRequest.status = AccessGrantStatuses.accepted;
            accessRequest.grantedAt = timestamp;
        } else {
            accessRequest.isActive = false;
            accessRequest.status = AccessGrantStatuses.rejected;
        }

        await ctx.stub.putState(
            accessKey,
            Buffer.from(stringify(sortKeysRecursive(accessRequest))),
        );
    }

    @Transaction(false)
    @Returns('string')
    public async GetAllAccessRequests(
        ctx: Context,
        userId: string,
    ): Promise<string> {
        const requests: AccessGrant[] = [];
        const iterator = await ctx.stub.getStateByRange('', '');

        while (true) {
            const res = await iterator.next();
            if (res.done) break;

            const key = res.value.key;
            if (!key.startsWith('access::')) continue;

            const buffer = res.value.value;
            if (!buffer || buffer.length === 0) continue;

            const access = JSON.parse(buffer.toString()) as AccessGrant;
            if (access.requestTo !== userId) continue;

            try {
                requests.push(access);
            } catch (err) {
                console.warn(`Failed to parse access record ${key}:`, err);
            }
        }

        await iterator.close();
        return JSON.stringify(requests);
    }

    @Transaction(false)
    @Returns('string')
    public async debugListKeys(ctx: Context): Promise<string> {
        const keys: string[] = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        while (true) {
            const res = await iterator.next();
            if (res.done) break;
            keys.push(res.value.key);
        }
        await iterator.close();
        return JSON.stringify(keys);
    }

    private idToKey(prefix: string, id: string): string {
        return `${prefix}::${id}`;
    }
}
