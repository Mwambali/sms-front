import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { CLEAR_ERRORS, Student } from '../actions/types';
import { returnErrors } from '../actions/errorActions';

/* Async Thunks */
const BASE_URL = 'http://localhost:5000/api/students';

export const createStudent = createAsyncThunk(
    'student/createStudent',
    async (
        { studentName, studentAge, studentClass, studentCourse }: Student,
        { dispatch }
    ) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ studentName, studentAge, studentClass, studentCourse });

        try {
            const res = await axios.post(`${BASE_URL}/create`, body, config);
            const { data } = res.data;

            // dispatch({ type: 'CLEAR_ERRORS' });
            dispatch({ type: 'CLEAR_ERRORS' });
            dispatch(studentCreated());
            dispatch(addStudent(data));

        } catch (err) {
            dispatch({ type: 'STUDENT_FAIL' });
            dispatch(
                returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status
                )
            );
        }
    }
);


export const getStudents = createAsyncThunk(
    'student/getStudents',
    async (_, { dispatch }) => {
        try {
            const res = await axios.get(`${BASE_URL}`);
            // dispatch({ type: 'CLEAR_ERRORS' });
            console.log(res.data);

            dispatch({ type: CLEAR_ERRORS });
            dispatch(addStudent(res.data));
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

export const deleteStudent = createAsyncThunk(
    'student/deleteStudent',
    async (id: string, { dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.delete(`${BASE_URL}/${id}`, config);
            dispatch(studentDeleted(id));
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

export const updateStudent = createAsyncThunk(
    'student/updateStudent',
    async (
        { studentName, studentAge, studentClass, studentCourse, id }: Student,
        { dispatch }
    ) => {
        const body = JSON.stringify({ studentName, studentAge, studentClass, studentCourse });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.put(`/update/${id}`, body, config);
            dispatch(studentUpdate());
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


interface StudentState {
    students: Student[];
    updated: boolean;
    deleted: boolean;
    created: boolean;
}

const initialState: StudentState = {
    students: [],
    updated: false,
    deleted: false,
    created: false,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        addStudent: (state, action: PayloadAction<Student[]>) => {
            state.students = [...state.students, ...action.payload];
        },
        fetchedStudents: (state) => {
            state.students
        },
        studentCreated: (state) => {
            state.created = true;
        },
        studentUpdate: (state) => {
            state.updated = true;
        },
        studentDeleted: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            state.students = state.students.filter((c) => c.id !== idToDelete);
            state.deleted = true;
        },
    }
});

export const { addStudent, studentCreated, studentDeleted, studentUpdate } = studentSlice.actions;

export default studentSlice.reducer;

/* Selectors */

export const selectStudents = (state: RootState) => state.student.students;
export const selectDeletedStatus = (state: RootState) => state.student.deleted;
export const selectUpdatedStatus = (state: RootState) => state.student.updated;
export const selectCreatedStatus = (state: RootState) => state.student.created;


