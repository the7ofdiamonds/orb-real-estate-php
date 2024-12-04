import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addHeaders, addSecureHeaders } from '../../../utils/Headers';

const createUserUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/user/create' : "/wp-json/seven-tech/v1/user/create";
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
    firstname: '',
    lastname: '',
    nickname: '',
    nicename: '',
    roles: '',
    phone: ''
};

export const createUser = createAsyncThunk('user/create', async () => {
    try {
        const response = await fetch(`${createUserUrl}`, {
            method: 'POST',
            headers: await addHeaders(),
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
 });

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
            headers: await addSecureHeaders()
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
            createUser.fulfilled, (state, action) => {
                state.userLoading = false;
                    state.userError = '';
                    state.userSuccessMessage = action.payload.success_message;
                    state.userErrorMessage = '';
                    state.userStatusCode = action.payload.status_code;
                    state.username = action.payload.username;
                    state.accessToken = action.payload.access_token;
                    state.refreshToken = action.payload.refresh_token;
            })
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
                    state.firstname = action.payload.firstname;
                    state.lastname = action.payload.lastname;
                    state.nickname = action.payload.nickname;
                    state.nicename = action.payload.nicename;
                    state.roles = action.payload.roles;
                    state.phone = action.payload.phone;
                })
            .addMatcher(isAnyOf(
                createUser.pending,
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
                createUser.rejected,
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

