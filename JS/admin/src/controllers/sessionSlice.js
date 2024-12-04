import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addSecureHeaders } from '../../../utils/Headers';

const findSessionUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/session/find" : "/wp-json/seven-tech/v1/session/find";
const getSessionsUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/session/get" : "/wp-json/seven-tech/v1/session/get";
const sessionLengthUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/session/length" : "/wp-json/seven-tech/v1/session/length";

const initialState = {
    sessionLoading: false,
    sessionError: '',
    sessionSuccessMessage: '',
    sessionErrorMessage: '',
    sessionStatusCode: ''
};

export const findSession = createAsyncThunk('session/find', async () => {
    try {
        const response = await fetch(`${findSessionUrl}`, {
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

export const getSessions = createAsyncThunk('session/get', async () => {
    try {
        const response = await fetch(`${getSessionsUrl}`, {
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

export const sessionLength = createAsyncThunk('session/length', async () => {
    try {
        const response = await fetch(`${sessionLengthUrl}`, {
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

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(
                findSession.fulfilled, (state, action) => {
                    state.sessionLoading = false;
                    state.sessionError = '';
                    state.sessionSuccessMessage = action.payload.success_message;
                    state.sessionErrorMessage = '';
                    state.sessionStatusCode = action.payload.status_code;
                })
            .addCase(
                getSessions.fulfilled, (state, action) => {
                    state.sessionLoading = false;
                    state.sessionError = '';
                    state.sessionSuccessMessage = action.payload.success_message;
                    state.sessionErrorMessage = '';
                    state.sessionStatusCode = action.payload.status_code;
                })
            .addCase(
                sessionLength.fulfilled, (state, action) => {
                    state.sessionLoading = false;
                    state.sessionError = '';
                    state.sessionSuccessMessage = action.payload.success_message;
                    state.sessionErrorMessage = '';
                    state.sessionStatusCode = action.payload.status_code;
                })
            .addMatcher(isAnyOf(
                findSession.pending,
                getSessions.pending,
                sessionLength.pending
            ), (state) => {
                state.sessionLoading = true;
                state.sessionError = null;
                state.sessionSuccessMessage = '';
                state.sessionErrorMessage = '';
                state.sessionStatusCode = '';
            })
            .addMatcher(isAnyOf(
                findSession.rejected,
                getSessions.rejected,
                sessionLength.rejected
            ), (state, action) => {
                state.sessionLoading = false;
                state.sessionError = action.error;
                state.sessionErrorMessage = action.payload.error_message ? action.payload.error_message : action.error.message;
                state.sessionStatusCode = action.payload.status_code ? action.payload.status_code : action.error.code;
            });
    }
})

export default sessionSlice;