import { Action, Middleware, ReducersMapObject, configureStore } from '@reduxjs/toolkit';


import { api } from '../api';
import { AuthSchema, localStorageCertificate } from '../viewer';
import { authReducer } from '../viewer';

export interface StateSchema {
    auth: AuthSchema;
    [api.base.api.reducerPath]: ReturnType<typeof api.base.api.reducer>;
}

const rootReducers: ReducersMapObject<StateSchema> = {
    auth: authReducer,
    [api.base.api.reducerPath]: api.base.api.reducer,
};

interface AuthAction extends Action {
    type: string;
    payload?: {
        tokens?: {
            refresh: {
                token: string;
            };
        };
    };
}

const setCertificateMiddleware: Middleware = (_store) => (next) => (action) => {
    const { payload } = action as AuthAction;
    if (payload?.tokens?.refresh?.token) {
        const refreshToken = payload?.tokens?.refresh;
        localStorageCertificate.set(refreshToken);
    }

    return next(action);
};

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.base.api.middleware, setCertificateMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof store.getState>;
