import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addSecureHeaders } from '../../../utils/Headers';

const logoutUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/auth/logout" : "/wp-json/seven-tech/v1/auth/logout";
export const logoutAllUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/auth/logout-all" : "/wp-json/seven-tech/v1/auth/logout-all";

const initialState = {
    logoutLoading: false,
    logoutError: '',
    logoutSuccessMessage: '',
    logoutErrorMessage: '',
    logoutStatusCode: ''
};

export const logout = createAsyncThunk('logout/logout', async () => {
    try {
        const response = await fetch(logoutUrl, {
            method: 'POST',
            headers: await addSecureHeaders()
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.status_code == 200) {
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            localStorage.removeItem('username');
            localStorage.removeItem('profile_image');
            localStorage.removeItem('display_name');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const logoutAll = createAsyncThunk('logout/logoutAll', async () => {
    try {
        const response = await fetch(logoutAllUrl, {
            method: 'POST',
            headers: await addSecureHeaders()
        });

        const responseData = await response.json();

        if (responseData.status_code == 200) {
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            localStorage.removeItem('username');
            localStorage.removeItem('profile_image');
            localStorage.removeItem('display_name');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(logout.fulfilled, logoutAll.fulfilled), (state, action) => {
                state.logoutLoading = false;
                state.logoutError = '';
                state.logoutSuccessMessage = action.payload.success_message;
                state.logoutErrorMessage = '';
                state.logoutStatusCode = action.payload.status_code;
            })
            .addMatcher(isAnyOf(
                logout.pending,
                logoutAll.pending
            ), (state) => {
                state.logoutLoading = true;
                state.logoutError = '';
                state.logoutSuccessMessage = '';
                state.logoutErrorMessage = '';
                state.logoutStatusCode = '';

            })
            .addMatcher(isAnyOf(
                logout.rejected,
                logoutAll.rejected
            ),
                (state, action) => {
                    state.logoutLoading = false;
                    state.logoutError = action.error;
                    state.logoutErrorMessage = action.payload.error_message ? action.payload.error_message : action.error.message;
                    state.logoutStatusCode = action.payload.status_code ? action.payload.status_code : action.error.code;
                });
    }
})

export default logoutSlice;