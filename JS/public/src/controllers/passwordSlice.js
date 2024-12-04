import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addHeaders, addSecureHeaders } from '../../../utils/Headers';

const sendForgotPasswordEmailUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/password/forgot" : "/wp-json/seven-tech/v1/password/forgot";
const sendChangePasswordEmailUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/password/change" : "/wp-json/seven-tech/v1/password/change";
const sendUpdatePasswordEmailUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/password/update" : "/wp-json/seven-tech/v1/password/update";
const changePasswordUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/change-password" : "/wp-json/seven-tech/v1/password/change";
const updatePasswordUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/update-password" : "/wp-json/seven-tech/v1/password/update";

const initialState = {
    passwordLoading: false,
    passwordError: '',
    passwordSuccessMessage: '',
    passwordErrorMessage: '',
    passwordStatusCode: ''
};

export const updatePasswordSuccessMessage = () => {
    return {
        type: 'password/updatePasswordSuccessMessage',
        payload: ''
    };
};

export const updatePasswordErrorMessage = () => {
    return {
        type: 'password/updatePasswordErrorMessage',
        payload: ''
    };
};

export const sendForgotPasswordEmail = createAsyncThunk('password/sendForgotPasswordEmail', async (email) => {
    try {
        const response = await fetch(`${sendForgotPasswordEmailUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

export const sendChangePasswordEmail = createAsyncThunk('password/sendChangePasswordEmail', async (email) => {
    try {
        const response = await fetch(`${sendChangePasswordEmailUrl}`, {
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

export const changePassword = createAsyncThunk('password/changePassword', async ({ password, confirmPassword }) => {
    try {
        const response = await fetch(`${changePasswordUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify({
                password: password,
                confirmPassword: confirmPassword
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const updatePassword = createAsyncThunk('password/updatePassword', async ({ email, confirmationCode, password, confirmPassword }) => {
    try {
        const response = await fetch(`${updatePasswordUrl}`, {
            method: 'POST',
            headers: await addHeaders(),
            body: JSON.stringify({
                email: email,
                confirmationCode: confirmationCode,
                password: password,
                confirmPassword: confirmPassword
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
                sendChangePasswordEmail.fulfilled,
                changePassword.fulfilled,
                sendUpdatePasswordEmail.fulfilled,
                updatePassword.fulfilled
            ), (state, action) => {
                state.passwordLoading = false;
                state.passwordError = '';
                state.passwordSuccessMessage = action.payload.success_message;
                state.passwordErrorMessage = action.payload.error_message;
                state.passwordStatusCode = action.payload.status_code;
            })
            .addMatcher(isAnyOf(
                sendForgotPasswordEmail.pending,
                sendChangePasswordEmail.pending,
                changePassword.pending,
                sendUpdatePasswordEmail.pending,
                updatePassword.pending
            ), (state) => {
                state.passwordLoading = true;
                state.passwordError = '';
                state.passwordSuccessMessage = '';
                state.passwordErrorMessage = '';
                state.passwordStatusCode = '';
            })
            .addMatcher(isAnyOf(
                sendForgotPasswordEmail.rejected,
                sendChangePasswordEmail.rejected,
                changePassword.rejected,
                sendUpdatePasswordEmail.rejected,
                updatePassword.rejected
            ), (state, action) => {
                state.passwordLoading = false;
                state.passwordError = action.error;
                state.passwordErrorMessage = action.error.message;
            });
    }
})

export default passwordSlice;

