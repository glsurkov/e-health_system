import { createSlice } from '@reduxjs/toolkit';

import { auth } from '@/shared/api';
import { createLocalStorage } from '@/shared/lib/local-storage';
import { parseCertificate } from '@/shared/lib/certificate/parse.ts';

export interface AuthSchema {
    certificate: string | null,
    xApiKey: string,
    role: string | null
}

export const localStorageCertificate    = createLocalStorage<Record<string, string> | null>({
    key: 'certificate',
    defaultValue: null,
    toLocalStorage: (value) => JSON.stringify(value) ?? {},
    fromLocalStorage: (value) => JSON.parse(value) ?? null,
});

const initialState: AuthSchema = {
    certificate: localStorageCertificate.value?.certificate ?? null,
    xApiKey: '460E7BF7-CB72-4BF9-ADD4-0E5EA7287E53',
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCertificate: (state, action: { payload: string}) => {
            state.certificate = action.payload;
            state.role = parseCertificate(action.payload).role;
        },
        enrollSuccessful: (state: AuthSchema, action: { payload: {
            certificate: string;
            privateKey: string;
            } }) => {
            localStorageCertificate.set(action.payload);
            state.certificate = action.payload.certificate;
        },
        clearCertificate: (state: AuthSchema) => {
            state.certificate = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(auth.eHealth.endpoints.authControllerEnroll.matchFulfilled, (state, action) => {
            state.certificate = action.payload.enrollment.credentials.certificate;
        });
    },
});

const {
    reducer,
    actions: { enrollSuccessful, clearCertificate, setCertificate },
} = authSlice;

export { reducer as authReducer, clearCertificate, enrollSuccessful, setCertificate };
