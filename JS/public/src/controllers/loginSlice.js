import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { addHeaders, addSecureHeaders } from '../../../utils/Headers';

const loginUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/auth/login" : "/wp-json/seven-tech/v1/auth/login";
const loginWithTokenUrl = import.meta.env.VITE_BACKEND_URL ? import.meta.env.VITE_BACKEND_URL + "/auth/loginWithToken" : "/wp-json/seven-tech/v1/auth/loginWithToken";

const initialState = {
    loginLoading: false,
    loginError: '',
    loginSuccessMessage: '',
    loginErrorMessage: '',
    id: '',
    username: '',
    email: '',
    profileImage: '',
    accessToken: '',
    refreshToken: ''
};

export const updateAccountID = (id) => {
    return {
        type: 'login/updateAccountID',
        payload: id
    };
};

export const updateEmail = (email) => {
    return {
        type: 'login/updateEmail',
        payload: email
    };
};

export const updateUsername = (username) => {
    return {
        type: 'login/updateUsername',
        payload: username
    };
};

export const updateProfileImage = (profileImage) => {
    return {
        type: 'login/updateProfileImage',
        payload: profileImage
    };
};

export const updateAccessToken = (access_token) => {
    return {
        type: 'login/updateAccessToken',
        payload: access_token
    };
};

export const updateRefreshToken = (refresh_token) => {
    return {
        type: 'login/updateRefreshToken',
        payload: refresh_token
    };
};

export const login = createAsyncThunk('login/withEmailAndPassword', async (loginRequest) => {
    try {
        const response = await fetch(`${loginUrl}`, {
            method: 'POST',
            headers: await addHeaders(),
            body: JSON.stringify(loginRequest)
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
});

export const loginWithToken = createAsyncThunk('login/withToken', async () => {
    try {
        const response = await fetch(`${loginWithTokenUrl}`, {
            method: 'POST',
            headers: await addSecureHeaders()
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
});

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateAccountID: (state, action) => {
            state.id = action.payload;
            localStorage.setItem('id', action.payload);
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
            localStorage.setItem('email', action.payload);
        },
        updateUsername: (state, action) => {
            state.username = action.payload;
            localStorage.setItem('username', action.payload);
        },
        updateProfileImage: (state, action) => {
            state.profileImage = action.payload;
            localStorage.setItem('profile_image', action.payload);
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem('access_token', action.payload);
        },
        updateRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
            localStorage.setItem('refresh_token', action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(login.fulfilled,
                loginWithToken.fulfilled), (state, action) => {
                    state.loginLoading = false;
                    state.loginError = '';
                    state.loginSuccessMessage = action.payload.success_message;
                    state.loginErrorMessage = action.payload.error_message;
                    state.loginStatusCode = action.payload.status_code;
                    state.username = action.payload.username;
                    state.profileImage = action.payload.profile_image;
                    state.refreshToken = action.payload.refresh_token;
                    state.accessToken = action.payload.access_token;
                })
            .addMatcher(isAnyOf(login.pending,
                loginWithToken.pending), (state) => {
                    state.loginLoading = true;
                    state.loginError = '';
                    state.loginSuccessMessage = '';
                    state.loginErrorMessage = '';
                    state.loginStatusCode = '';
                })
            .addMatcher(isAnyOf(login.rejected,
                loginWithToken.rejected), (state, action) => {
                    state.loginLoading = false;
                    state.loginError = action.error || null;
                    state.loginErrorMessage = action.error?.message || action.payload?.error_message || "Unknown error";
                    state.loginStatusCode = action.error?.code || action.payload?.status_code || 500;
                });
    }
})

export default loginSlice;