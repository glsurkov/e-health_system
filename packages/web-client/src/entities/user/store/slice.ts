import { createSlice } from '@reduxjs/toolkit';

import { auth } from '@/shared/api';
import {
    type UserSchema,
    clearCurrentUser as baseClearSuccessful,
    loginSuccessful as baseLoginSuccessful,
} from '@/shared/store';

const initialState: UserSchema = {
    currentUser: null,
    token: null,
};

const loginSuccessful = (
    state: UserSchema,
    action: { payload: auth.LoginResponse },
) => {
    state.currentUser = action.payload.user;
    state.token = action.payload.tokens.token.token;
};
const clearCurrentUser = (state: UserSchema) => {
    state.currentUser = null;
    state.token = null;
};
const clearToken = (state: UserSchema) => {
    state.token = null;
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccessful,
        clearCurrentUser,
        clearToken,
    },
    extraReducers: (builder) => {
        builder.addCase(baseLoginSuccessful, loginSuccessful);
        builder.addCase(baseClearSuccessful, clearCurrentUser);
    },
});

const { reducer } = userSlice;

export { reducer };
