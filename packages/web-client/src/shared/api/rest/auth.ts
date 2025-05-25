import { api } from '../base';

const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        authControllerGetMe: build.query<AuthControllerGetMeApiResponse, AuthControllerGetMeApiArg>({
            query: () => ({ url: `/api/auth/me` }),
        }),
        authControllerEnroll: build.mutation<
            AuthControllerEnrollApiResponse,
            AuthControllerEnrollApiArg
        >({
            query: (queryArg) => ({
                url: `/api/auth/enroll`,
                method: 'POST',
                body: queryArg,
            })
        }),
        authControllerRegister: build.mutation<
            AuthControllerRegisterApiResponse,
            AuthControllerRegisterApiArg
        >({
            query: (queryArg) => ({
                url: `/api/auth`,
                method: 'POST',
                body: queryArg,
            })
        }),
    }),
    overrideExisting: false,
});

export { injectedRtkApi as eHealth };

export type AuthControllerGetMeApiResponse = {
    cert: string;
}

export type AuthControllerGetMeApiArg = {}

export type AuthControllerRegisterApiResponse = {
    message: string;
    secret: string;
}

export type AuthControllerRegisterApiArg = {
    userId: string;
    role: string;
    affiliation?: string;
    adminCertificate?: string;
}

export type AuthControllerEnrollApiResponse = {
    message: string;
    enrollment: Enrollment
}

export type AuthControllerEnrollApiArg = {
    userId: string;
    secret: string;
}

export type Enrollment = {
    credentials: {
        certificate: string;
        privateKey: string;
    },
    mspId: string;
    type: string;
}

export const {
    useAuthControllerEnrollMutation,
    useAuthControllerRegisterMutation,
    useAuthControllerGetMeQuery,
} = injectedRtkApi;
