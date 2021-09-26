import {
    GET_PATIENT,
    GET_SESSION_PATIENT
} from '../actions/types'

const initialState = {
    patient: null,
    session: 'background'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PATIENT:
            return {
                ...state,
                patient: action.payload,
            };
        case GET_SESSION_PATIENT:
            return {
                ...state,
                session: action.payload
            };
        default:
            return state;
    }
}