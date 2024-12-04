import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addHeaders } from '../../../utils/Headers';

const signupUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/account/create' : '/wp-json/seven-tech/v1/account/create';

const initialState = {
    signupLoading: false,
    signupError: '',
    signupSuccessMessage: '',
    signupErrorMessage: '',
    signupStatusCode: '',
    accessToken: '',
    refreshToken: ''
};

export const signup = createAsyncThunk('signup/signup', async (credentials) => {
    try {
        const response = await fetch(signupUrl, {
            method: 'POST',
            headers: await addHeaders(),
            body: JSON.stringify(credentials)
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
});

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.signupLoading = false;
                state.signupError = '';
                state.signupSuccessMessage = action.payload.success_message;
                state.signupErrorMessage = action.payload.error_message;;
                state.signupStatusCode = action.payload.status_code;
                state.username = action.payload.username;
                state.refreshToken = action.payload.refresh_token;
                state.accessToken = action.payload.access_token;
            })
            .addMatcher(isAnyOf(
                signup.pending,
            ), (state) => {
                state.signupLoading = true;
                state.signupError = '';
                state.signupSuccessMessage = '';
                state.signupErrorMessage = '';
                state.signupStatusCode = '';
            })
            .addMatcher(isAnyOf(
                signup.rejected,
            ), (state, action) => {
                state.signupLoading = false;
                state.signupError = action.error;
                state.signupErrorMessage = action.error.message;
            });
    }
})

export default signupSlice;