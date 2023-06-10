import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import classReducer from './store/reducers/classReducer';
import studentReducer from './store/reducers/studentReducer';
import courseReducer from './store/reducers/courseReducer';
import errorReducer from './store/reducers/errorReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        class: classReducer,
        student: studentReducer,
        course: courseReducer,
        error: errorReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAPI = {
    dispatch: AppDispatch;
    getState: () => RootState;
};
