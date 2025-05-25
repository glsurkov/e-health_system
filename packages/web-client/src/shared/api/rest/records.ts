import { api } from '../base.ts';
import { IUser } from '@/shared/types';
import { AccessGrantStatuses } from '@/shared/consts/access-requests.ts';
import { IPermission } from '@/entities/permission/ui/permissions-list-item';

const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        recordsControllerCreateRecord: build.mutation<
            RecordsControllerCreateRecordApiResponse,
            RecordsControllerCreateRecordApiArg
        >({
            query: (queryArg) => ({
                url: `/api/records`,
                method: 'POST',
                body: queryArg,
            })
        }),
        recordsControllerGetAccessibleRecords: build.query<RecordsControllerGetAccessibleRecordsApiResponse, RecordsControllerGetAccessibleRecordsApiArg>({
            query: (queryArg) => ({
                url: `/api/records`,
                params: {
                    userId: queryArg.patientId,
                }
            }),
        }),
        recordsControllerGetRecord: build.query<RecordsControllerGetRecordApiResponse, RecordsControllerGetRecordApiArg>({
            query: (queryArg) => ({
                url: `/api/records/${queryArg.id}`,
            }),
        }),
        recordsControllerAccessRequest: build.mutation<RecordsControllerAccessRequestApiResponse, RecordsControllerAccessRequestApiArg>({
            query: (queryArg) => ({
                url: `/api/records/access/request`,
                method: 'POST',
                body: queryArg,
            }),
        }),
        recordsControllerGetAllAccessRequests: build.query<RecordsControllerGetAllAccessRequestsApiResponse, RecordsControllerGetAllAccessRequestsApiArg>({
            query: (queryArg) => ({
                url: `/api/records/access`,
                params: {
                    userId: queryArg.userId,
                }
            }),
        }),
        recordsControllerAccessGrant: build.mutation<RecordsControllerAccessGrantApiResponse, RecordsControllerAccessGrantApiArg>({
            query: (queryArg) => ({
                url: `/api/records/access/grant`,
                method: 'PUT',
                body: queryArg,
            }),
        }),
    }),
    overrideExisting: false,
});

export { injectedRtkApi as eHealth };

export type RecordsControllerCreateRecordApiResponse = {}

export type RecordsControllerCreateRecordApiArg = {
    patientId: string;
    doctorId: string;
    dataHash: string;
}

export type RecordsControllerGetAccessibleRecordsApiResponse = MedicalRecord[];

export type RecordsControllerGetAccessibleRecordsApiArg = {
    patientId: string;
}

export type RecordsControllerGetRecordApiResponse = MedicalRecord;

export type RecordsControllerGetRecordApiArg = {
    id: string;
}

export type RecordsControllerAccessRequestApiResponse = {

}

export type RecordsControllerAccessRequestApiArg = {
    requestById: string;
    requestToId: string;
    permission: 'read' | 'write';
}

export type RecordsControllerGetAllAccessRequestsApiResponse = IPermission[];

export type RecordsControllerGetAllAccessRequestsApiArg = {
    userId: string;
}

export type RecordsControllerAccessGrantApiResponse = {}

export type RecordsControllerAccessGrantApiArg = {
    requestId: string;
    callerId: string;
    isAccepted: boolean;
}

export type AccessRequest = {
    id: string;
    status: AccessGrantStatuses;
    doctorId: string;
    requestTo: string;
    requestedAt: string;
    grantedAt?: string;
    isActive: boolean;
    permission: 'read' | 'write';
}

export type MedicalRecord = {
    id: string;
    title: string;
    recordAuthor: IUser;
    //     {
    //     id: string;
    //     fullname: string;
    //     position: string;
    //     email: string;
    //     additionalInfo: string;
    //     organization: string;
    // }
    date: Date;
    data: string;
    // "access": string[],
    // "createdAt": string,
    // "dataHash": string,
    // "doctorId": string,
    // "patientId": string,
    // "updatedAt": string,
}

export const {
    useRecordsControllerGetRecordQuery,
    useRecordsControllerGetAccessibleRecordsQuery,
    useRecordsControllerGetAllAccessRequestsQuery,
    useRecordsControllerCreateRecordMutation,
    useRecordsControllerAccessRequestMutation,
    useRecordsControllerAccessGrantMutation,
} = injectedRtkApi;
