import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addSecureHeaders } from '../../../utils/Headers';

const changeUsernameUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/change/username' : "/wp-json/seven-tech/v1/change/username";
const changeNameUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/change/name' : "/wp-json/seven-tech/v1/change/name";
const changeNicknameUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/change/nickname' : "/wp-json/seven-tech/v1/change/nickname";
const changeNicenameUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/change/nicename' : "/wp-json/seven-tech/v1/change/nicename";
const changePhoneUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/change/phone' : "/wp-json/seven-tech/v1/change/phone";

const initialState = {
    changeLoading: false,
    changeError: '',
    changeSuccessMessage: '',
    changeErrorMessage: '',
    changeStatusCode: '',
    username: '',
    firstname: '',
    lastname: '',
    nickname: '',
    nicename: '',
    roles: '',
    phone: ''
};

export const changeUsername = createAsyncThunk('change/changeUsername', async (username) => {
    try {
        const response = await fetch(`${changeUsernameUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify({
                username: username
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const changeName = createAsyncThunk('change/changeName', async (fullName) => {
    try {
        const request = new Request(changeNameUrl, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify(fullName)
        });

        const response = await fetch(request);

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const changeNickname = createAsyncThunk('change/changeNickname', async (nickname) => {
    try {
        const response = await fetch(`${changeNicknameUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify({
                nickname: nickname
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const changeNicename = createAsyncThunk('change/changeNicename', async (nicename) => {
    try {
        const response = await fetch(`${changeNicenameUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify({
                nicename: nicename
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const changePhone = createAsyncThunk('change/changePhone', async (phone) => {
    try {
        const response = await fetch(`${changePhoneUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify({
                phone: phone
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const changeSlice = createSlice({
    name: 'change',
    initialState,
    reducers: {
        updateChangeSuccessMessage: (state, action) => {
            state.changeSuccessMessage = action.payload;
        },
        updateChangeErrorMessage: (state, action) => {
            state.changeError = action.payload;
            state.changeErrorMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                changeUsername.fulfilled, (state, action) => {
                    state.changeLoading = false;
                    state.changeError = '';
                    state.changeSuccessMessage = action.payload.success_message;
                    state.changeErrorMessage = '';
                    state.changeStatusCode = action.payload.status_code;
                    state.username = action.payload.username;
                })
            .addCase(
                changeName.fulfilled, (state, action) => {
                    state.changeLoading = false;
                    state.changeError = '';
                    state.changeSuccessMessage = action.payload.success_message;
                    state.changeErrorMessage = '';
                    state.changeStatusCode = action.payload.status_code;
                    state.firstname = action.payload.first_name;
                    state.lastname = action.payload.last_name;
                })
            .addCase(
                changeNickname.fulfilled, (state, action) => {
                    state.changeLoading = false;
                    state.changeError = '';
                    state.changeSuccessMessage = action.payload.success_message;
                    state.changeErrorMessage = '';
                    state.changeStatusCode = action.payload.status_code;
                    state.nickname = action.payload.nickname;
                })
            .addCase(
                changeNicename.fulfilled, (state, action) => {
                    state.changeLoading = false;
                    state.changeError = '';
                    state.changeSuccessMessage = action.payload.success_message;
                    state.changeErrorMessage = '';
                    state.changeStatusCode = action.payload.status_code;
                    state.nicename = action.payload.nicename;
                })
            .addCase(
                changePhone.fulfilled, (state, action) => {
                    state.changeLoading = false;
                    state.changeError = '';
                    state.changeSuccessMessage = action.payload.success_message;
                    state.changeErrorMessage = '';
                    state.changeStatusCode = action.payload.status_code;
                    state.phone = action.payload.phone;
                })
            .addMatcher(isAnyOf(
                changeUsername.pending,
                changeName.pending,
                changeNickname.pending,
                changeNicename.pending,
                changePhone.pending
            ), (state) => {
                state.changeLoading = true;
                state.changeError = null;
                state.changeSuccessMessage = '';
                state.changeErrorMessage = '';
                state.changeStatusCode = '';
            })
            .addMatcher(isAnyOf(
                changeUsername.rejected,
                changeName.rejected,
                changeNickname.rejected,
                changeNicename.rejected,
                changePhone.rejected
            ), (state, action) => {
                state.changeLoading = false;
                state.changeError = action.error;
                state.changeErrorMessage = action.payload.error_message ? action.payload.error_message : action.error.message;
                state.changeStatusCode = action.payload.status_code ? action.payload.status_code : action.error.code;
            });
    }
})

export default changeSlice;