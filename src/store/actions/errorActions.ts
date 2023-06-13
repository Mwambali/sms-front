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
