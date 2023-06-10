/* Course Types */
export const GET_COURSES = "GET_COURSES";
export const ADD_COURSE = "ADD_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";
export const COURSE_FAIL = "COURSE_FAIL";
export const UPDATE_COURSE = "UPDATE_COURSE";

/* Class Types */
export const GET_CLASS = "GET_CLASS";
export const ADD_CLASS = "ADD_CLASS";
export const DELETE_CLASS = "DELETE_CLASS";
export const UPDATE_CLASS = "UPDATE_CLASS";
export const CLASS_FAIL = "CLASS_FAIL";

/* Student Types*/
export const GET_STUDENT = "GET_STUDENT";
export const ADD_STUDENT = "ADD_STUDENT";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";
export const STUDENT_FAIL = "STUDENT_FAIL";

/* Error Types */
export const LOADING = "LOADING";
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

interface ErrorAction {
    type: typeof GET_ERRORS;
    payload: {
        msg: string;
        status: number;
        id?: string;
    };
}

interface ClearErrorAction {
    type: typeof CLEAR_ERRORS;
}

export type ErrorActionTypes = ErrorAction | ClearErrorAction;

interface LoadingAction {
    type: typeof LOADING;
}

export type LoadingActionTypes = LoadingAction;

interface AddStudentAction {
    type: typeof ADD_STUDENT;
    payload: Student[];
}

interface UpdateStudentAction {
    type: typeof UPDATE_STUDENT;
}

interface DeleteStudentAction {
    type: typeof DELETE_STUDENT;
    payload: string;
}

interface GetStudentAction {
    type: typeof GET_STUDENT;
    payload: Student[];
}

export type StudentActionTypes =
    | AddStudentAction
    | UpdateStudentAction
    | DeleteStudentAction
    | GetStudentAction;

interface AddCourseAction {
    type: typeof ADD_COURSE;
    payload: Course[];
}

interface UpdateCourseAction {
    type: typeof UPDATE_COURSE;
}

interface DeleteCourseAction {
    type: typeof DELETE_COURSE;
    payload: string;
}

interface GetCourseAction {
    type: typeof GET_COURSES;
    payload: Course[];
}

export type CourseActionTypes =
    | AddCourseAction
    | UpdateCourseAction
    | DeleteCourseAction
    | GetCourseAction;

interface AddClassAction {
    type: typeof ADD_CLASS;
    payload: Class[];
}

interface UpdateClassAction {
    type: typeof UPDATE_CLASS;
}

interface DeleteClassAction {
    type: typeof DELETE_CLASS;
    payload: string;
}

interface GetClassAction {
    type: typeof GET_CLASS;
    payload: Class[];
}

export type ClassActionTypes =
    | AddClassAction
    | UpdateClassAction
    | DeleteClassAction
    | GetClassAction;

export interface Student {
    id?: string;
    studentName: string;
    studentAge: number;
    studentCourse: string[];
    studentClass: string;
    slug?: string;
}

export interface Course {
    id?: string;
    courseName: string;
    credits: number;
    students: string[];
    slug?: string;
}

export interface Class {
    id?: string;
    className: string;
    slug: string;
}
