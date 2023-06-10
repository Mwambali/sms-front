import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { Course, Class } from './types';
import { returnErrors } from './errorActions';

/* Create a course */
export const createCourse = createAsyncThunk(
    'course/createCourse',
    async (name: string, { dispatch }) => {
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Request body
        const body = JSON.stringify({ name });

        try {
            const res = await axios.post('/api/course/create', body, config);
            const { data } = res.data;

            dispatch({ type: 'CLEAR_ERRORS' });
            dispatch({ type: 'course/addCourse', payload: [data] });
            dispatch({ type: 'COURSE_CREATED' });
        } catch (err) {
            dispatch({ type: 'COURSE_FAIL' });
            dispatch(
                returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status,
                    'COURSE__ERROR'
                )
            );
        }
    }
);

export const getCourses = createAsyncThunk(
    'course/getCourses',
    async (_, { dispatch }) => {
        try {
            const res = await axios.get('/api/course');
            dispatch({ type: 'CLEAR_ERRORS' });
            dispatch({ type: 'course/addCourse', payload: res.data });
        } catch (err) {
            dispatch(returnErrors(
                (err as { response: { data: { msg: string } } }).response.data.msg,
                (err as { response: { status: number } }).response.status,
                'COURSE__ERROR'
            ));
        }
    }
);

/* Class Actions */
export const createClass = createAsyncThunk(
    'class/createClass',
    async (name: string, { dispatch }) => {
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Request body
        const body = JSON.stringify({ name });

        try {
            const res = await axios.post('/api/class/create', body, config); //add necessary data type e.g <ProductDocument[]> from amazon product service
            const { data } = res.data;

            dispatch({ type: 'CLEAR_ERRORS' });
            dispatch({ type: 'class/addClass', payload: [data] });
            dispatch({ type: 'CLASS_CREATED' });
        } catch (err) {
            dispatch({ type: 'CLASS_FAIL' });
            dispatch(
                returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status,
                )
            );
        }
    }
);

export const getClasses = createAsyncThunk(
    'class/getClasses',
    async (_, { dispatch }) => {
        try {
            const res = await axios.get('/api/class');
            dispatch({ type: 'CLEAR_ERRORS' });
            dispatch({ type: 'class/addClass', payload: res.data });
        } catch (err) {
            dispatch(returnErrors(
                (err as { response: { data: { msg: string } } }).response.data.msg,
                (err as { response: { status: number } }).response.status,
            ));
        }
    }
);

export const deleteClass = createAsyncThunk(
    'class/deleteClass',
    async (uid: string, { dispatch }) => {
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.delete(`/api/class/${uid}`, config);
            dispatch({
                type: 'CLASS_DELETED',
                payload: uid,
            });
        } catch (err) {
            dispatch(returnErrors(
                (err as { response: { data: { msg: string } } }).response.data.msg,
                (err as { response: { status: number } }).response.status,
            ));
        }
    }
);

export const updateAClass = createAsyncThunk(
    'class/updateAClass',
    async ({ class_name, slug, uid }: Class, { dispatch }) => {
        // Request body
        const body = JSON.stringify({ class_name, slug, uid });

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.put('/api/class', body, config);
            dispatch({ type: 'UPDATE_CLASS' });
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

export const updateACourse = createAsyncThunk(
    'course/updateACourse',
    async ({ course_name, students, slug, uid }: Course, { dispatch }) => {
        // Request body
        const body = JSON.stringify({ course_name, slug, uid, students });

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.put('/api/course', body, config);
            dispatch({ type: 'UPDATE_COURSE' });
        } catch (err) {
            dispatch(
                returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status,
                    'UPDATE_COURSE_ERROR'
                )
            );
        }
    }
);

export const deleteCourse = createAsyncThunk(
    'course/deleteCourse',
    async (id: string, { dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.delete(`/api/course`, { data: { course_id: id } }, config);
            dispatch({
                type: 'COURSE_DELETED',
                payload: id,
            });
        } catch (err) {
            dispatch(returnErrors(
                (err as { response: { data: { msg: string } } }).response.data.msg,
                (err as { response: { status: number } }).response.status,
            ));
        }
    }
);



// import axios from "axios";
// import { Dispatch } from "redux";
// import {
//     ADD_CLASS,
//     ADD_COURSE,
//     CLASS_FAIL,
//     CLEAR_ERRORS,
//     COURSE_FAIL,
//     DELETE_STUDENT,
//     UPDATE_CLASS,
//     UPDATE_COURSE,
// } from "./types";
// import { returnErrors, AppThunk } from "./errorActions";

// /* Create a course */
// export const createCourse = (name: string): AppThunk => async (dispatch) => {
//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

//     // Request body
//     const body = JSON.stringify({ name });

//     try {
//         const res = await axios.post("/api/course/create", body, config);
//         const { data } = res.data;
//         dispatch({ type: CLEAR_ERRORS });
//         dispatch({ type: ADD_COURSE, payload: [data] });
//         dispatch({ type: "COURSE_CREATED" });
//     } catch (err: any) {
//         dispatch({ type: COURSE_FAIL });
//         dispatch(
//             returnErrors(
//                 err.response.data.msg,
//                 err.response.status,
//                 "COURSE__ERROR"
//             )
//         );
//     }
// };

// export const getCourses = (): AppThunk => (dispatch) => {
//     axios
//         .get("/api/course")
//         .then((res) => {
//             dispatch({ type: CLEAR_ERRORS });
//             dispatch({ type: ADD_COURSE, payload: res.data });
//         })
//         .catch((err) => {
//             dispatch(returnErrors(err.response.data.msg, err.response.status));
//         });
// };

// /* Class Actions */
// export const createClass = (name: string): AppThunk => async (dispatch) => {
//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

//     // Request body
//     const body = JSON.stringify({ name });

//     try {
//         const res = await axios.post("/api/class/create", body, config);
//         const { data } = res.data;
//         dispatch({ type: CLEAR_ERRORS });
//         dispatch({ type: ADD_CLASS, payload: [data] });
//         dispatch({ type: "CLASS_CREATED" });
//     } catch (err: any) {
//         dispatch({ type: CLASS_FAIL });
//         dispatch(
//             returnErrors(
//                 err.response.data.msg,
//                 err.response.status,
//                 "CLASS__ERROR"
//             )
//         );
//     }
// };

// export const getClasses = (): AppThunk => (dispatch) => {
//     axios
//         .get("/api/class")
//         .then((res) => {
//             dispatch({ type: CLEAR_ERRORS });
//             dispatch({ type: ADD_CLASS, payload: res.data });
//         })
//         .catch((err) =>
//             dispatch(returnErrors(err.response.data.msg, err.response.status))
//         );
// };

// export const deleteClass = (uid: string): AppThunk => async (dispatch) => {
//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

//     try {
//         await axios.delete(`/api/class/${uid}`, config);
//         dispatch({
//             type: "CLASS_DELETED",
//             payload: uid,
//         });
//     } catch (err: any) {
//         dispatch(returnErrors(err.response.data, err.response.status));
//     }
// };

// export const updateAClass = (
//     class_name: string,
//     slug: string,
//     uid: string
// ): AppThunk => async (dispatch) => {
//     // Request body
//     const body = JSON.stringify({ class_name, slug, uid });

//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

//     try {
//         const res = await axios.put(/api/class / ${ uid }, body, config);
//         const { data } = res.data;
//         dispatch({ type: CLEAR_ERRORS });
//         dispatch({ type: UPDATE_CLASS, payload: data });
//         dispatch({ type: "CLASS_UPDATED" });
//     } catch (err: any) {
//         dispatch({ type: CLASS_FAIL });
//         dispatch(
//             returnErrors(
//                 err.response.data.msg,
//                 err.response.status,
//                 "CLASS__ERROR"
//             )
//         );
//     }
// };

// /* Student Actions */
// export const deleteStudent = (uid: string): AppThunk => async (dispatch) => {
//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

//     try {
//         await axios.delete(/api/student / ${ uid }, config);
//         dispatch({
//             type: DELETE_STUDENT,
//             payload: uid,
//         });
//     } catch (err: any) {
//         dispatch(returnErrors(err.response.data, err.response.status));
//     }
// };

// export const updateStudent = (
//     name: string,
//     email: string,
//     phone: string,
//     courses: string[],
//     uid: string
// ): AppThunk => async (dispatch) => {
//     // Request body
//     const body = JSON.stringify({ name, email, phone, courses, uid });

//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     };

//     try {
//         const res = await axios.put(/api/student / ${ uid }, body, config);
//         const { data } = res.data;
//         dispatch({ type: CLEAR_ERRORS });
//         dispatch({ type: "STUDENT_UPDATED" });
//     } catch (err: any) {
//         dispatch(returnErrors(err.response.data, err.response.status));
//     }
// };
