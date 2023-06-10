import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
    msg: string;
    status: number | null;
    id: string | null;
}

const initialState: ErrorState = {
    msg: '',
    status: null,
    id: null,
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        getErrors: (state, action: PayloadAction<ErrorState>) => {
            state.msg = action.payload.msg;
            state.status = action.payload.status;
            state.id = action.payload.id;
        },
        clearErrors: (state) => {
            state.msg = '';
            state.status = null;
            state.id = null;
        },
    },
});

export const { getErrors, clearErrors } = errorSlice.actions;

export default errorSlice.reducer;





// import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

// interface ErrorState {
//     msg: Record<string, any>;
//     status: number | null;
//     id: string | null;
// }

// const initialState: ErrorState = {
//     msg: {},
//     status: null,
//     id: null,
// };

// interface ErrorAction {
//     type: typeof GET_ERRORS | typeof CLEAR_ERRORS;
//     payload: {
//         msg: Record<string, any>;
//         status: number | null;
//         id: string | null;
//     };
// }

// export default function (state = initialState, action: ErrorAction) {
//     switch (action.type) {
//         case GET_ERRORS:
//             return {
//                 msg: action.payload.msg,
//                 status: action.payload.status,
//                 id: action.payload.id,
//             };
//         case CLEAR_ERRORS:
//             return {
//                 msg: {},
//                 status: null,
//                 id: null,
//             };
//         default:
//             return state;
//     }
// }
