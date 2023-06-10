import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { CLEAR_ERRORS, Course } from '../actions/types';
import { returnErrors } from '../actions/errorActions';

/* Async Thunks */
const BASE_URL = 'http://localhost:5000/api/courses';

export const createCourse = createAsyncThunk(
    'course/createCourse',
    async ({ courseName, students, credits }: Course, { dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ courseName, students, credits });
        try {
            const res = await axios.post(`${BASE_URL}/create`, body, config);
            const data = res.data;
            console.log(res);
            console.log(res
                .data
            );

            // dispatch({ type: 'CLEAR_ERRORS' });
            dispatch({ type: CLEAR_ERRORS });
            dispatch(courseCreated());
            dispatch(addCourse(data));

        } catch (err) {
            dispatch({ type: 'COURSE_FAIL' });
            dispatch(
                returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status
                )
            );
        }
    }
);

export const getCourses = createAsyncThunk('course/getCourses', async (_, { dispatch }) => {
    try {
        const res = await axios.get(`${BASE_URL}`);
        // dispatch({ type: 'CLEAR_ERRORS' });
        console.log(res.data);

        dispatch({ type: CLEAR_ERRORS });

        dispatch(addCourse(res.data));
    } catch (err) {
        dispatch(
            returnErrors(
                (err as { response: { data: { msg: string } } }).response.data.msg,
                (err as { response: { status: number } }).response.status
            )
        );
    }
});

export const deleteCourse = createAsyncThunk(
    'course/deleteCourse',
    async (id: string, { dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.delete(`${BASE_URL}/delete/${id}`, config);
            dispatch(courseDeleted(id));
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

export const updateACourse = createAsyncThunk(
    'course/updateACourse',
    async ({ courseName, credits, students, slug, id }: Course,
        { dispatch }) => {

        const body = JSON.stringify({ courseName, credits, students, slug, id });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.patch(`${BASE_URL}/update/${id}`, body, config);
            dispatch(updateCourse());
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
interface CourseState {
    courses: Course[];
    updated: boolean;
    deleted: boolean;
    created: boolean;
}

const initialState: CourseState = {
    courses: [],
    created: false,
    updated: false,
    deleted: false,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        addCourse: (state, action: PayloadAction<Course[]>) => {
            state.courses = [...state.courses, ...action.payload];
        },
        courseCreated: (state) => {
            state.created = true;
        },
        updateCourse: (state) => {
            state.updated = true;
        },
        courseDeleted: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            state.courses = state.courses.filter((c) => c.id !== idToDelete);
            state.deleted = true;
        },
    },
});

export const { addCourse, courseCreated, updateCourse, courseDeleted } = courseSlice.actions;

export default courseSlice.reducer;

/* Selectors */

export const selectCourses = (state: RootState) => state.course.courses;
export const selectDeletedStatus = (state: RootState) => state.course.deleted;
export const selectUpdatedStatus = (state: RootState) => state.course.updated;
export const selectCreatedStatus = (state: RootState) => state.course.created;


// import { ADD_COURSE, COURSE_FAIL, UPDATE_COURSE, CourseActionTypes, Course } from "../actions/types";

// interface CourseState {
//     loading: boolean;
//     courses: Course[];
//     created: boolean;
//     updated: boolean;
//     deleted: boolean;
// }

// const initialState: CourseState = {
//     loading: true,
//     courses: [],
//     created: false,
//     updated: false,
//     deleted: false,
// };

// export default function courseReducer(state = initialState, action: CourseActionTypes): CourseState {
//     switch (action.type) {
//         case ADD_COURSE:
//             return {
//                 ...state,
//                 courses: [...state.courses, ...action.payload],
//             };
//         case "COURSE_CREATED":
//             return {
//                 ...state,
//                 created: true,
//             };
//         case COURSE_FAIL:
//             return {
//                 ...state,
//                 created: false,
//             };
//         case UPDATE_COURSE:
//             return {
//                 ...state,
//                 updated: true,
//             };
//         case "COURSE_DELETED":
//             return {
//                 ...state,
//                 deleted: true,
//             };
//         default:
//             return state;
//     }
// }
