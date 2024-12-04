import { createSlice, createAsyncThunk, isAnyOf, } from '@reduxjs/toolkit';

import { isValidUsername, isValidName, isValidPhone, isValidEmail } from '../../../utils/Validation';

import { addSecureHeaders } from '../../../utils/Headers';

const createAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/account/create' : "/wp-json/seven-tech/v1/account/create";
const findAccountUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/account/find' : "/wp-json/seven-tech/v1/account/find";

const initialState = {
    accountLoading: false,
    accountError: '',
    accountSuccessMessage: '',
    accountErrorMessage: '',
    accountStatusCode: '',
    id: '',
    providerGivenID: '',
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    nickname: '',
    nicename: '',
    roles: '',
    phone: '',
    isAuthenticated: false,
    isCredentialsNonExpired: false,
    isAccountNonLocked: false,
    isEnabled: false,
    isAccountNonExpired: false
};

export const createAccount = createAsyncThunk('account/create', async (credentials, thunkAPI) => {
    try {

        if (isValidEmail(credentials.email) == false) {
            throw new Error("A valid Email is required to signup.");
        }

        if (isValidUsername(credentials.username) == false) {
            throw new Error("A valid Username is required to signup.");
        }

        if (isValidName(credentials.firstname) == false) {
            throw new Error("Please provide a valid first name.");
        }

        if (isValidName(credentials.lastname) == false) {
            throw new Error("Please provide a valid last name.");
        }

        if (isValidPhone(credentials.phone) == false) {
            throw new Error("Please provide a valid phone number.");
        }

        const response = await fetch(`${createAccountUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify(credentials)
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const findAccount = createAsyncThunk('account/find', async (email, thunkAPI) => {
    try {

        if (isValidEmail(email) == false) {
            throw new Error("A valid Email is required to find account.");
        }

        const response = await fetch(`${findAccountUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders(),
            body: JSON.stringify({
                "email": email
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.fulfilled, (state, action) => {
                state.accountLoading = false;
                state.accountError = '';
                state.accountSuccessMessage = action.payload.success_message;
                state.accountErrorMessage = '';
                state.accountStatusCode = action.payload.status_code;
            })
            .addCase(findAccount.fulfilled, (state, action) => {
                state.accountLoading = false;
                state.accountError = '';
                state.accountSuccessMessage = '';
                state.accountErrorMessage = '';
                state.accountStatusCode = action.payload.status_code;
                state.id = action.payload.id;
                state.providerGivenID = action.payload.providerGivenID;
                state.email = action.payload.email;
                state.username = action.payload.username;
                state.firstname = action.payload.firstName;
                state.lastname = action.payload.lastName;
                state.nickname = action.payload.nickname;
                state.nicename = action.payload.nicename;
                state.roles = action.payload.roles;
                state.phone = action.payload.phone;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.isCredentialsNonExpired = action.payload.isCredentialsNonExpired;
                state.isAccountNonLocked = action.payload.isAccountNonLocked;
                state.isEnabled = action.payload.isEnabled;
                state.isAccountNonExpired = action.payload.isAccountNonExpired;
            })
            .addMatcher(isAnyOf(
                createAccount.pending,
                findAccount.pending
            ), (state) => {
                state.accountLoading = true;
                state.accountError = null;
                state.accountSuccessMessage = '';
                state.accountErrorMessage = '';
                state.accountStatusCode = '';
            })
            .addMatcher(isAnyOf(
                createAccount.rejected,
                findAccount.rejected
            ), (state, action) => {
                state.accountLoading = false;

                if (action.payload) {
                    state.accountError = action.payload;
                    state.accountErrorMessage = action.payload ? '' : action.payload.error_message;
                    state.accountStatusCode = action.payload.status_code;
                } else {
                    state.accountError = action.error.message;
                    state.accountStatusCode = action.error.code;
                }
            });
    }
})

export default accountSlice;