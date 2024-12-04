import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    messageType: ''
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setMessageType: (state, action) => {
            state.messageType = action.payload;
        }
    }
})

export const { setMessage, setMessageType } = messageSlice.actions;

export default messageSlice;