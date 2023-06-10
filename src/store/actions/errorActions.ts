interface ErrorPayload {
    msg: string;
    status: number;
    id: string | null;
}

export const returnErrors = (msg: string, status: number, id: string | null = null) => {
    const payload: ErrorPayload = { msg, status, id };
    return {
        type: 'error/getErrors',
        payload,
    };
};

export const clearErrors = () => {
    return {
        type: 'error/clearErrors',
    };
};



// import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// interface ErrorPayload {
//     msg: string;
//     status: number;
//     id: string | null;
// }

// // RETURN ERRORS
// export const returnErrors = (msg: string, status: number, id: string | null = null) => {
//     const payload: ErrorPayload = { msg, status, id };
//     return {
//         type: GET_ERRORS,
//         payload,
//     };
// };

// // CLEAR ERRORS
// export const clearErrors = () => {
//     return {
//         type: CLEAR_ERRORS,
//     };
// };
