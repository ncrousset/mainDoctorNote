import {
    GET_PATIENT,
    GET_SESSION_PATIENT,
    GET_BACKGROUND,
    ADD_BACKGROUND,
    DELETE_BACKGROUND,
    UPDATE_BACKGROUND,
    GET_MEDICAL_HISTORIES,
    ADD_MEDICAL_HISTORIES
} from '../actions/types'

const initialState = {
    patient: null,
    session: 'background',
    background: [],
    medical_histories: []
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
        case UPDATE_BACKGROUND:
            return {
                ...state,
                background: state.background.map(background => {
                    return background.id !== action.payload.id ? background : action.payload
                })
            };
        case ADD_BACKGROUND:
            return {
                ...state,
                background: [action.payload, ...state.background]
            };
        case DELETE_BACKGROUND:
            return {
                ...state,
                background: state.background.filter(background => {
                    return background.id !== action.payload
                })
            };
        case GET_MEDICAL_HISTORIES:
            return {
                ...state,
                medical_histories: action.payload,
            };
        case ADD_MEDICAL_HISTORIES:
            return {
                ...state,
                medical_histories: [action.payload, ...state.medical_histories]
            };

        default:
            return state;
    }
}