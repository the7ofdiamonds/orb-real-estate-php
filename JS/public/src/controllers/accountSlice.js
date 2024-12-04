import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addHeaders, addSecureHeaders } from '../../../utils/Headers';

const activateAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/account/activate' : "/wp-json/seven-tech/v1/account/activate";
const lockAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/account/lock" : "/wp-json/seven-tech/v1/account/lock";
const recoverAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/account/recovery" : "/wp-json/seven-tech/v1/account/recovery";

const initialState = {
    accountLoading: false,
    accountError: '',
    accountSuccessMessage: '',
    accountErrorMessage: '',
    accountStatusCode: ''
};

export const updateAccountEmail = (email) => {
    return {
        type: 'account/updateAccountEmail',
        payload: email
    };
};

export const updateAccountSuccessMessage = () => {
    return {
        type: 'account/updateAccountSuccessMessage',
        payload: ''
    };
};

export const updateAccountErrorMessage = () => {
    return {
        type: 'account/updateAccountErrorMessage',
        payload: ''
    };
};

export const activateAccount = createAsyncThunk('account/activateAccount', async (activationRequest) => {
    try {
        const response = await fetch(`${activateAccountUrl}`, {
            method: 'POST',
            headers: await addHeaders(),
            body: JSON.stringify(activationRequest)
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const lockAccount = createAsyncThunk('account/lockAccount', async () => {
    try {
        const response = await fetch(`${lockAccountUrl}`, {
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

export const recoverAccount = createAsyncThunk('account/recoverAccount', async (activationRequest) => {
    try {
        const response = await fetch(`${recoverAccountUrl}`, {
            method: 'POST',
            headers: await addHeaders(),
            body: JSON.stringify(activationRequest)
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        updateAccountSuccessMessage: (state, action) => {
            state.accountSuccessMessage = action.payload;
        },
        updateAccountErrorMessage: (state, action) => {
            state.accountError = action.payload;
            state.accountErrorMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(
                activateAccount.fulfilled,
                lockAccount.fulfilled,
                recoverAccount.fulfilled
            ), (state, action) => {
                state.accountLoading = false;
                state.accountError = '';
                state.accountSuccessMessage = action.payload.success_message;
                state.accountErrorMessage = action.payload.error_message;
                state.accountStatusCode = action.payload.status_code;
            })
            .addMatcher(isAnyOf(
                activateAccount.pending,
                lockAccount.pending,
                recoverAccount.pending
            ), (state) => {
                state.accountLoading = true;
                state.accountError = '';
                state.accountSuccessMessage = '';
                state.accountErrorMessage = '';
                state.accountStatusCode = '';
            })
            .addMatcher(isAnyOf(
                activateAccount.rejected,
                lockAccount.rejected,
                recoverAccount.rejected
            ), (state, action) => {
                state.accountLoading = false;
                state.accountError = action.error;
                state.accountErrorMessage = action.payload.error_message ? action.payload.error_message : action.error.message;
                state.accountStatusCode = action.payload.status_code ? action.payload.status_code : action.error.code;
            });
    }
})

export default accountSlice;