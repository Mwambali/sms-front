import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, ThunkAPI } from '../../store';
import { CLASS_FAIL, CLEAR_ERRORS, Class } from '../actions/types';
import { returnErrors } from '../actions/errorActions';

/* Async Thunks */
const BASE_URL = 'http://localhost:5000/api/classes';

export const createClass = createAsyncThunk<void, string, ThunkAPI>(
    'class/createClass',
    async (className: string, { dispatch }) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ className });

        try {
            const res = await axios.post(`${BASE_URL}/create`, body, config);
            dispatch({ type: CLEAR_ERRORS });
            dispatch(classCreated());
            dispatch(addClass(res.data));

        } catch (err) {
            dispatch({ type: CLASS_FAIL });
            dispatch(
                returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status
                )
            );
        }
    }
);

export const getClasses = createAsyncThunk/*<Class[], void>*/('class/getClasses', async (_, { dispatch }) => {
    try {
        const res = await axios.get(`${BASE_URL}`);
        console.log(res
            .data);

        // dispatch({ type: 'CLEAR_ERRORS' });
        dispatch({ type: CLEAR_ERRORS });
        dispatch(addClass(res.data));
    } catch (err) {
        dispatch(
            returnErrors(
                (err as { response: { data: { msg: string } } }).response.data.msg,
                (err as { response: { status: number } }).response.status
            )
        );
    }
});

export const deleteClass = createAsyncThunk(
    'class/deleteClass',
    async (id: string, { dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.delete(`${BASE_URL}/delete/${id}`, config);
            dispatch(classDeleted(id));
        } catch (err) {
            dispatch(
                returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status
                )
            );
        }
    }
);

export const updateAClass = createAsyncThunk(
    'class/updateAClass',
    async ({ className, id }: Class, { dispatch }) => {
        const body = JSON.stringify({ className });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.patch(`${BASE_URL}/update/${id}`, body, config);
            dispatch(updateClass());
        } catch (err) {
            dispatch(
                returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status,
                    'UPDATE_ERROR'
                )
            );
        }
    }
);



/* Slice */

interface ClassState {
    classes: Class[];
    deleted: boolean;
    updated: boolean;
    created: boolean;
}

const initialState: ClassState = {
    classes: [],
    deleted: false,
    updated: false,
    created: false,
};

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        addClass: (state, action: PayloadAction<Class[]>) => {
            state.classes = [...state.classes, ...action.payload];
        },
        updateClass: (state) => {
            state.updated = true;
        },
        classCreated: (state) => {
            state.created = true;
        },
        classDeleted: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            state.classes = state.classes.filter((c) => c.id !== idToDelete);
            state.deleted = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createClass.fulfilled, (state) => {
                state.created = true;
            })

    },
});

export const { addClass, updateClass, classCreated, classDeleted } = classSlice.actions;

export default classSlice.reducer;

/* Selectors */

export const selectClasses = (state: RootState) => state.class.classes;
export const selectDeletedStatus = (state: RootState) => state.class.deleted;
export const selectUpdatedStatus = (state: RootState) => state.class.updated;
export const selectCreatedStatus = (state: RootState) => state.class.created;
