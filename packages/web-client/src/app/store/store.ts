import {
    Action,
    Middleware,
    ReducersMapObject,
    configureStore,
} from '@reduxjs/toolkit';


import { LOCAL_STORAGE_KEYS } from '@/shared/config/local-storage';
import { setInLocalStorage } from '@/shared/lib/local-storage';
import { StateSchema } from '@/shared/store';

const rootReducers: ReducersMapObject<StateSchema> = {
    // [base.api.reducerPath]: base.api.reducer,
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

const setRefreshMiddleware: Middleware = (_store) => (next) => (action) => {
    const { payload } = action as AuthAction;
    if (payload?.tokens?.refresh?.token) {
        const refreshToken = payload.tokens.refresh;
        setInLocalStorage(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken.token);
    }

    return next(action);
};

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            // base.api.middleware,
            // setRefreshMiddleware,
        ),
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof store.getState>;
