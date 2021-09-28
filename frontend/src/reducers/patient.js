import {
    GET_PATIENT,
    GET_SESSION_PATIENT,
    GET_BACKGROUND,
    ADD_BACKGROUND
} from '../actions/types'

const initialState = {
    patient: null,
    session: 'background',
    background: [],
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
        case GET_BACKGROUND:
            return {
                ...state,
                background: action.payload,
            };
        case ADD_BACKGROUND:
                return {
                    ...state,
                    background: [...state.background, action.payload]
            };
        default:
            return state;
    }
}