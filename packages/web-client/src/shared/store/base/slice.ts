import { createSlice } from '@reduxjs/toolkit';

const baseSlice = createSlice({
    name: 'base',
    initialState: {},
    reducers: {
        loginSuccessful: (
            _state,
            _action: { payload: auth.LoginResponse },
        ) => {},
        clearCurrentUser: (_state) => {},
    },
});

const {
    actions: { loginSuccessful, clearCurrentUser },
    reducer,
} = baseSlice;

export { loginSuccessful, clearCurrentUser, reducer };
