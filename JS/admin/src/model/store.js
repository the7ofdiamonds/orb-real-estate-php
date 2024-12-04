import { configureStore } from '@reduxjs/toolkit';

import accountSlice from '../controllers/accountSlice';
import adminSlice from '../controllers/adminSlice';
import changeSlice from '../controllers/changeSlice';
import detailsSlice from '../controllers/detailsSlice';
import messageSlice from '../controllers/messageSlice';
import passwordSlice from '../controllers/passwordSlice';
import sessionSlice from '../controllers/sessionSlice';
import userSlice from '../controllers/userSlice';

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        admin: adminSlice.reducer,
        change: changeSlice.reducer,
        details: detailsSlice.reducer,
        message: messageSlice.reducer,
        password: passwordSlice.reducer,
        session: sessionSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;