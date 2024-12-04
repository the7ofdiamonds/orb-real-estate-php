import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addSecureHeaders } from '../../../utils/Headers';

const addUserUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/user/add' : "/wp-json/seven-tech/v1/user/add";
const getUserUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/user/get' : "/wp-json/seven-tech/v1/user/get";

const initialState = {
    userLoading: false,
    userError: '',
    userSuccessMessage: '',
    userErrorMessage: '',
    userStatusCode: '',
    email: '',
    username: '',
    roles: '',
};

export const addUser = createAsyncThunk('user/add', async () => {
    try {
        const response = await fetch(`${addUserUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const getUser = createAsyncThunk('user/getUser', async () => {
    try {
        const response = await fetch(`${getUserUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify({
                "email": email
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(
                addUser.fulfilled, (state, action) => {
                    state.userLoading = false;
                    state.userError = '';
                    state.userSuccessMessage = action.payload.success_message;
                    state.userErrorMessage = '';
                    state.userStatusCode = action.payload.status_code;
                    state.email = action.payload.email;
                    state.username = action.payload.username;
                })
            .addCase(
                getUser.fulfilled, (state, action) => {
                    state.userLoading = false;
                    state.userError = '';
                    state.userSuccessMessage = '';
                    state.userErrorMessage = '';
                    state.userStatusCode = action.payload.status_code;
                    state.email = action.payload.email;
                    state.username = action.payload.username;
                    state.roles = action.payload.roles;
                })
            .addMatcher(isAnyOf(
                addUser.pending,
                getUser.pending
            ), (state) => {
                state.userLoading = true;
                state.userError = null;
                state.userSuccessMessage = '';
                state.userErrorMessage = '';
                state.userStatusCode = '';
            })
            .addMatcher(isAnyOf(
                addUser.rejected,
                getUser.rejected
            ), (state, action) => {
                state.userLoading = false;
                state.userError = action.error;
                state.userErrorMessage = action.payload.error_message ? action.payload.error_message : action.error.message;
                state.userStatusCode = action.payload.status_code ? action.payload.status_code : action.error.code;
            });
    }
})

export default userSlice;

