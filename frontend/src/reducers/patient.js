import {
    GET_PATIENT,
    GET_SESSION_PATIENT,
    GET_BACKGROUND,
    ADD_BACKGROUND,
    DELETE_BACKGROUND,
    UPDATE_BACKGROUND,
    GET_MEDICAL_HISTORIES,
    ADD_MEDICAL_HISTORY,
    DELETE_MEDICAL_HISTORY,
    UPDATE_MEDICAL_HISTORY,
    GET_MEDICAL_STUDIES,
    ADD_MEDICAL_STUDY,
    UPDATE_MEDICAL_STUDY,
    DELETE_MEDICAL_STUDY,
    GET_MEDICAL_TREATMENTS,
    ADD_MEDICAL_TREATMENT,
    UPDATE_MEDICAL_TREATMENT,
    DELETE_MEDICAL_TREATMENT,
    UPDATE_PATIENT
} from '../actions/types'

const initialState = {
    patient: null,
    session: 'background',
    background: [],
    medical_histories: [],
    medical_studies: [],
    medical_treatments: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PATIENT:
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
        case ADD_MEDICAL_HISTORY:
            return {
                ...state,
                medical_histories: [action.payload, ...state.medical_histories]
            };
        case UPDATE_MEDICAL_HISTORY:
            return {
                ...state,
                medical_histories: state.medical_histories.map(medical_histories => {
                    return medical_histories.id !== action.payload.id ? medical_histories : action.payload
                })
            };
        case DELETE_MEDICAL_HISTORY:
            return {
                ...state,
                medical_histories: state.medical_histories.filter(medical_histories => {
                    return medical_histories.id !== action.payload
                })
            };
        case GET_MEDICAL_STUDIES:
            return {
                ...state,
                medical_studies: action.payload,
            };
        case ADD_MEDICAL_STUDY:
            return {
                ...state,
                medical_studies: [action.payload, ...state.medical_studies]
            };
        case UPDATE_MEDICAL_STUDY:
            return {
                ...state,
                medical_studies: state.medical_studies.map(medical_study => {
                    return medical_study.id !== action.payload.id ? medical_study : action.payload
                })
            };
        case DELETE_MEDICAL_STUDY:
            return {
                ...state,
                medical_studies: state.medical_studies.filter(medical_study => {
                    return medical_study.id !== action.payload
                })
            };
        case GET_MEDICAL_TREATMENTS:
            return {
                ...state,
                medical_treatments: action.payload,
            };
        case ADD_MEDICAL_TREATMENT:
            return {
                ...state,
                medical_treatments: [action.payload, ...state.medical_treatments]
            };
        case UPDATE_MEDICAL_TREATMENT:
            return {
                ...state,
                medical_treatments: state.medical_treatments.map(medical_treatment => {
                    return medical_treatment.id !== action.payload.id ? medical_treatment : action.payload
                })
            };
        case DELETE_MEDICAL_TREATMENT:
            return {
                ...state,
                medical_treatments: state.medical_treatments.filter(medical_treatment => {
                    return medical_treatment.id !== action.payload
                })
            };
        default:
            return state;
    }
}