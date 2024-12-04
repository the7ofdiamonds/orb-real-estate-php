import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addSecureHeaders } from '../../../utils/Headers';

const getUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/details/get' : "/wp-json/seven-tech/v1/details/get";
const expireCredentialsUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/details/expire-credentials' : "/wp-json/seven-tech/v1/details/expire-credentials";
const unexpireCredentialsUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/details/unexpire-credentials' : "/wp-json/seven-tech/v1/details/unexpire-credentials";
const lockAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/details/lock-account' : "/wp-json/seven-tech/v1/details/lock-account";
const unlockAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/details/unlock-account' : "/wp-json/seven-tech/v1/details/unlock-account";
const disableAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/details/disable-account' : "/wp-json/seven-tech/v1/details/disable-account";
const enableAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/detailse-account' : "/wp-json/seven-tech/v1/details/enable-account";
const expireAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/details/expire-account' : "/wp-json/seven-tech/v1/details/expire-account";
const unexpireAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/details/unexpire-account' : "/wp-json/seven-tech/v1/details/unexpire-account";

const initialState = {
    detailsLoading: false,
    detailsError: '',
    detailsSuccessMessage: '',
    detailsErrorMessage: '',
    detailsStatusCode: '',
    isAuthenticated: false,
    isCredentialsNonExpired: false,
    isAccountNonLocked: false,
    isEnabled: false,
    isAccountNonExpired: false
};

export const get = createAsyncThunk('details/get', async (email) => {
    try {
        const response = await fetch(`${getUrl}`, {
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

export const expireCredentials = createAsyncThunk('details/expireCredentials', async (email) => {
    try {
        const response = await fetch(`${expireCredentialsUrl}`, {
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

export const unexpireCredentials = createAsyncThunk('details/unexpireCredentials', async (email) => {
    try {
        const response = await fetch(`${unexpireCredentialsUrl}`, {
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

export const lockAccount = createAsyncThunk('details/lockAccount', async (email) => {
    try {
        const response = await fetch(`${lockAccountUrl}`, {
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

export const unlockAccount = createAsyncThunk('details/unlockAccount', async (email) => {
    try {
        const response = await fetch(`${unlockAccountUrl}`, {
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

export const disableAccount = createAsyncThunk('details/disableAccount', async (email) => {
    try {
        const response = await fetch(`${disableAccountUrl}`, {
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

export const enableAccount = createAsyncThunk('details/enableAccount', async (email) => {
    try {
        const response = await fetch(`${enableAccountUrl}`, {
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

export const expireAccount = createAsyncThunk('details/expireAccount', async () => {
    try {
        const response = await fetch(`${expireAccountUrl}`, {
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

export const unexpireAccount = createAsyncThunk('details/unexpireAccount', async () => {
    try {
        const response = await fetch(`${unexpireAccountUrl}`, {
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

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(
                get.fulfilled,
                expireCredentials.fulfilled,
                unexpireCredentials.fulfilled,
                lockAccount.fulfilled,
                unlockAccount.fulfilled,
                disableAccount.fulfilled,
                enableAccount.fulfilled,
                expireAccount.fulfilled,
                unexpireAccount.fulfilled
            ), (state, action) => {
                state.detailsLoading = false;
                state.detailsError = '';
                state.detailsSuccessMessage = action.payload.success_message;
                state.detailsErrorMessage = '';
                state.detailsStatusCode = action.payload.status_code;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.isCredentialsNonExpired = action.payload.isCredentialsNonExpired;
                state.isAccountNonLocked = action.payload.isAccountNonLocked;
                state.isEnabled = action.payload.isEnabled;
                state.isAccountNonExpired = action.payload.isAccountNonExpired;
            })
            .addMatcher(isAnyOf(
                get.pending,
                expireCredentials.pending,
                unexpireCredentials.pending,
                lockAccount.pending,
                unlockAccount.pending,
                disableAccount.pending,
                enableAccount.pending,
                expireAccount.pending,
                unexpireAccount.pending
            ), (state) => {
                state.detailsLoading = true;
                state.detailsError = null;
                state.detailsSuccessMessage = '';
                state.detailsErrorMessage = '';
                state.detailsStatusCode = '';
            })
            .addMatcher(isAnyOf(
                get.rejected,
                expireCredentials.rejected,
                unexpireCredentials.rejected,
                lockAccount.rejected,
                unlockAccount.rejected,
                disableAccount.rejected,
                enableAccount.rejected,
                expireAccount.rejected,
                unexpireAccount.rejected
            ), (state, action) => {
                state.detailsLoading = false;
                state.detailsError = action.error;
                state.detailsErrorMessage = action.payload.error_message ? action.payload.error_message : action.error.message;
                state.detailsStatusCode = action.payload.status_code ? action.payload.status_code : action.error.code;
            });
    }
})

export default detailsSlice;