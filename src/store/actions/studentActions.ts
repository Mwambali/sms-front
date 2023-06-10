import { returnErrors } from "../actions/errorActions";
import axios from "axios";
import {
    CLEAR_ERRORS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    StudentActionTypes,
    Student,
} from "./types";

export const createStudent =
    ({
        name,
        age,
        courses,
        className,
    }: {
        name: string;
        age: number;
        courses: string[];
        className: string;
    }) =>
        async (dispatch: React.Dispatch<StudentActionTypes | ErrorActionTypes>) => {
            // Headers
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // Request body
            const body = JSON.stringify({ name, age, courses, className });

            try {
                const res = await axios.post("/api/student/create", body, config);
                const { data } = res.data;
                dispatch({ type: CLEAR_ERRORS });
                dispatch({ type: ADD_STUDENT, payload: [data] });
                dispatch({ type: "STUDENT_CREATED" });
            } catch (err) {
                dispatch(
                    returnErrors(
                        err.response.data.msg,
                        err.response.status,
                        "STUDENT__ERROR"
                    )
                );
            }
        };

export const getStudents = () => (dispatch: React.Dispatch<StudentActionTypes | ErrorActionTypes>) => {
    axios
        .get("/api/student")
        .then((res) => {
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: ADD_STUDENT, payload: res.data });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data.msg, err.response.status))
        );
};

export const updateStudent =
    ({
        name,
        age,
        className,
        courses,
        slug,
        id,
    }: Student) =>
        async (dispatch: React.Dispatch<StudentActionTypes | ErrorActionTypes>) => {
            // Request body
            const body = JSON.stringify({ name, age, courses, className, slug, id });

            // Headers
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            try {
                await axios.put("/api/student", body, config);
                dispatch({ type: UPDATE_STUDENT });
            } catch (err) {
                dispatch(
                    returnErrors(
                        err.response.data.msg,
                        err.response.status,
                        "UPDATE_ERROR"
                    )
                );
            }
        };

export const deleteStudent =
    (uid: string) =>
        async (dispatch: React.Dispatch<StudentActionTypes | ErrorActionTypes>) => {
            // Headers
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            try {
                await axios.delete(`/api/student/${uid}`, config);
                dispatch({
                    type: DELETE_STUDENT,
                    payload: uid,
                });
            } catch (err) {
                dispatch(returnErrors(
                    (err as { response: { data: { msg: string } } }).response.data.msg,
                    (err as { response: { status: number } }).response.status
                ));
            }
        };
