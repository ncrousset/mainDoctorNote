import { GET_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, type) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, type },
    };
};