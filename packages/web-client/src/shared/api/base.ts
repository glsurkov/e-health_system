import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { StateSchema } from '@/shared/redux';
import { localStorageCertificate } from '@/shared/viewer';

const baseQuery = fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers, { getState }) => {
        const { xApiKey, certificate } = (getState() as StateSchema).auth;

        if (certificate) {
            headers.set('x-cert', JSON.stringify(certificate));
        } else {
            const certificate = localStorageCertificate.value;
            headers.set('x-cert', JSON.stringify(certificate?.certificate));
        }
        if (xApiKey) {
            headers.set('X-API-KEY', xApiKey);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    return await baseQuery(args, api, extraOptions);
};

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
