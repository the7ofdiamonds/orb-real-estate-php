import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { isValidEmail } from '../../../utils/Validation';

const getRolesUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/get' : "/wp-json/seven-tech/v1/roles/get";
const getAvailableRolesUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + '/available' : "/wp-json/seven-tech/v1/roles/available";

const initialState = {
    roleLoading: false,
    roleError: '',
    roleSuccessMessage: '',
    roleErrorMessage: '',
    roleStatusCode: '',
    roles: '',
    availableRoles: ''
};

export const updateChangeSuccessMessage = () => {
    return {
        type: 'role/updateChangeSuccessMessage',
        payload: ''
    };
};

export const updateChangeErrorMessage = () => {
    return {
        type: 'role/updateChangeErrorMessage',
        payload: ''
    };
};

export const getRoles = createAsyncThunk('role/getRoles', async () => {
    try {
        const email = localStorage.getItem('email');
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (accessToken == '') {
            throw Error("An access token is required to get role data.")
        }

        if (refreshToken == '') {
            throw Error("A refresh token is required to get role data.")
        }

        if (!isValidEmail(email)) {
            throw new Error("The email provided is not valid.");
        }

        const response = await fetch(`${getRolesUrl}`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Refresh-Token': refreshToken,
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

export const getAvailableRoles = createAsyncThunk('role/getAvailableRoles', async () => {
    try {
        const email = localStorage.getItem('email');
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (accessToken == '') {
            throw Error("An access token is required to get role data.")
        }

        if (refreshToken == '') {
            throw Error("A refresh token is required to get role data.")
        }

        if (!isValidEmail(email)) {
            throw new Error("The email provided is not valid.");
        }

        const response = await fetch(`${getAvailableRolesUrl}`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Refresh-Token': refreshToken,
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

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        updateChangeSuccessMessage: (state, action) => {
            state.roleSuccessMessage = action.payload;
        },
        updateChangeErrorMessage: (state, action) => {
            state.roleError = action.payload;
            state.roleErrorMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.fulfilled, (state, action) => {
                state.roleLoading = false;
                state.roleError = '';
                state.roleSuccessMessage = action.payload.successMessage;
                state.roleErrorMessage = action.payload.errorMessage;
                state.roleStatusCode = action.payload.statusCode;
                state.roles = action.payload;
            })
            .addCase(getAvailableRoles.fulfilled, (state, action) => {
                state.roleLoading = false;
                state.roleError = '';
                state.roleSuccessMessage = action.payload.successMessage;
                state.roleErrorMessage = action.payload.errorMessage;
                state.roleStatusCode = action.payload.statusCode;
                state.availableRoles = action.payload;
            })
            .addMatcher(isAnyOf(
                getRoles.pending,
                getAvailableRoles.pending
            ), (state) => {
                state.roleLoading = true;
                state.roleError = null;
                state.roleSuccessMessage = '';
                state.roleErrorMessage = '';
                state.roleStatusCode = '';
            })
            .addMatcher(isAnyOf(
                getRoles.rejected,
                getAvailableRoles.rejected
            ), (state, action) => {
                state.roleLoading = false;
                state.roleError = action.error;
                state.roleErrorMessage = action.error.message;
                state.roleStatusCode = action.error.code;
            });
    }
})

export default roleSlice;

