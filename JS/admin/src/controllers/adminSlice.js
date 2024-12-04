import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addSecureHeaders } from '../../../utils/Headers';

const envFilePresentUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/admin/env-present' : "/wp-json/seven-tech/v1/admin/env-present";
const googleCredentialsPresentUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/admin/google/credentials-present' : "/wp-json/seven-tech/v1/admin/google/credentials-present";
const redisCredentialsPresentUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/admin/redis/credentials-present' : "/wp-json/seven-tech/v1/admin/redis/credentials-present";
const uploadENVFileUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/admin/env' : "/wp-json/seven-tech/v1/admin/env";
const uploadGoogleCredentialsUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/admin/google/credentials' : "/wp-json/seven-tech/v1/admin/google/credentials";
const uploadRedisCredentialsUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/admin/redis/credentials' : "/wp-json/seven-tech/v1/admin/redis/credentials";
const adminDeleteUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/admin/delete' : "/wp-json/seven-tech/v1/admin/delete";

const initialState = {
    adminLoading: false,
    adminError: '',
    adminSuccessMessage: '',
    adminErrorMessage: '',
    adminStatusCode: '',
    firebaseENVFilePresent: '',
    redisENVFilePresent: '',
    googleServiceAccountValid: '',
    googleCredentialsPresent: '',
    redisCredentialsPresent: '',
    redisReady: '',
};

export const envFilePresent = createAsyncThunk('admin/envFilePresent', async () => {
    try {
        const response = await fetch(`${envFilePresentUrl}`, {
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

export const googleCredentialsPresent = createAsyncThunk('admin/googleCredentialsPresent', async () => {
    try {
        const response = await fetch(`${googleCredentialsPresentUrl}`, {
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

export const redisCredentialsPresent = createAsyncThunk('admin/redisCredentialsPresent', async () => {
    try {
        const response = await fetch(`${redisCredentialsPresentUrl}`, {
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

export const uploadENVFile = createAsyncThunk('admin/uploadENVFile', async (file) => {
    try {
        const formData = new FormData();
        formData.append('envFile', file); 

        const response = await fetch(`${uploadENVFileUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: formData
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const uploadGoogleCredentials = createAsyncThunk('admin/uploadGoogleCredentials', async (email) => {
    try {
        const response = await fetch(`${uploadGoogleCredentialsUrl}`, {
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

export const uploadRedisCredentials = createAsyncThunk('admin/uploadRedisCredentials', async (email) => {
    try {
        const response = await fetch(`${uploadRedisCredentialsUrl}`, {
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

export const adminDelete = createAsyncThunk('admin/delete', async (email) => {
    try {
        const response = await fetch(`${adminDeleteUrl}`, {
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

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(envFilePresent.fulfilled, (state, action) => {
                state.adminLoading = false;
                state.adminError = '';
                state.adminSuccessMessage = action.payload.success_message;
                state.adminErrorMessage = action.payload.error_message;
                state.adminStatusCode = action.payload.status_code;
                state.firebaseENVFilePresent = action.payload.firebaseENVFilePresent;
                state.redisENVFilePresent = action.payload.redisENVFilePresent;
            })
            .addCase(googleCredentialsPresent.fulfilled, (state, action) => {
                state.adminLoading = false;
                state.adminError = '';
                state.adminSuccessMessage = action.payload.success_message;
                state.adminErrorMessage = action.payload.error_message;
                state.adminStatusCode = action.payload.status_code;
                state.googleServiceAccountValid = action.payload.googleServiceAccountValid;
                state.googleCredentialsPresent = action.payload.googleCredentialsPresent;
            })
            .addCase(redisCredentialsPresent.fulfilled, (state, action) => {
                state.adminLoading = false;
                state.adminError = '';
                state.adminSuccessMessage = action.payload.success_message;
                state.adminErrorMessage = action.payload.error_message;
                state.adminStatusCode = action.payload.status_code;
                state.redisCredentialsPresent = action.payload.redisCredentialsPresent;
                state.redisReady = action.payload.redisReady;
            })
            .addMatcher(isAnyOf(
                uploadENVFile.fulfilled,
                uploadGoogleCredentials.fulfilled,
                uploadRedisCredentials.fulfilled,
                adminDelete.fulfilled
            ), (state, action) => {
                state.adminLoading = false;
                state.adminError = '';
                state.adminSuccessMessage = action.payload.success_message;
                state.adminErrorMessage = action.payload.error_message;
                state.adminStatusCode = action.payload.status_code;
            })
            .addMatcher(isAnyOf(
                envFilePresent.pending,
                googleCredentialsPresent.pending,
                redisCredentialsPresent.pending,
                uploadENVFile.pending,
                uploadGoogleCredentials.pending,
                uploadRedisCredentials.pending,
                adminDelete.pending
            ), (state) => {
                state.adminLoading = true;
                state.adminError = null;
                state.adminSuccessMessage = '';
                state.adminErrorMessage = '';
                state.adminStatusCode = '';
            })
            .addMatcher(isAnyOf(
                envFilePresent.rejected,
                googleCredentialsPresent.rejected,
                redisCredentialsPresent.rejected,
                uploadENVFile.rejected,
                uploadGoogleCredentials.rejected,
                uploadRedisCredentials.rejected,
                adminDelete.rejected
            ), (state, action) => {
                state.adminLoading = false;
                state.adminError = action.error;
                state.adminErrorMessage = action.payload.error_message ? action.payload.error_message : action.error.message;
                state.adminStatusCode = action.payload.status_code ? action.payload.status_code : action.error.code;
            });
    }
})

export default adminSlice;