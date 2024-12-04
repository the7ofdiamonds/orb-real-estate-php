import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addSecureHeaders } from '../../../utils/Headers';

const sendForgotPasswordEmailUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/password/forgot" : "/wp-json/seven-tech/v1/password/forgot";
const sendUpdatePasswordEmailUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/password/update" : "/wp-json/seven-tech/v1/password/update";

const initialState = {
    passwordLoading: false,
    passwordError: '',
    passwordSuccessMessage: '',
    passwordErrorMessage: '',
    passwordStatusCode: ''
};

export const sendForgotPasswordEmail = createAsyncThunk('password/sendForgotPasswordEmail', async (email) => {
    try {
        const response = await fetch(`${sendForgotPasswordEmailUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify({
                email: email
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const sendUpdatePasswordEmail = createAsyncThunk('password/sendUpdatePasswordEmail', async (email) => {
    try {
        const response = await fetch(`${sendUpdatePasswordEmailUrl}`, {
            method: 'POST',
            headers: await addHeaders(),
            body: JSON.stringify({
                email: email
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(
                sendForgotPasswordEmail.fulfilled,
                sendUpdatePasswordEmail.fulfilled
            ), (state, action) => {
                state.passwordLoading = false;
                state.passwordError = '';
                state.passwordSuccessMessage = action.payload.success_message;
                state.passwordErrorMessage = action.payload.error_message;
                state.passwordStatusCode = action.payload.status_code;
            })
            .addMatcher(isAnyOf(
                sendForgotPasswordEmail.pending,
                sendUpdatePasswordEmail.pending
            ), (state) => {
                state.passwordLoading = true;
                state.passwordError = '';
                state.passwordSuccessMessage = '';
                state.passwordErrorMessage = '';
                state.passwordStatusCode = '';
            })
            .addMatcher(isAnyOf(
                sendForgotPasswordEmail.rejected,
                sendUpdatePasswordEmail.rejected
            ), (state, action) => {
                state.passwordLoading = false;
                state.passwordError = action.error;
                state.passwordErrorMessage = action.error.message;
            });
    }
})

export default passwordSlice;

