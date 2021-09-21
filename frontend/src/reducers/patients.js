import {
    GET_PATIENTS,
    DELETE_PATIENT,
    ADD_PATIENT,
    UPDATE_PATIENT,
    GET_PAGINATOR_PATIENTS,
} from '../actions/types'

const initialState = {
    patients: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PATIENTS:
            return {
                ...state,
                patients: action.payload,
            };
        case DELETE_PATIENT:
            return {
                ...state,
                patients: state.patients.filter(
                    patient => patient.id !== action.payload
                )
            };
        case UPDATE_PATIENT:
        case ADD_PATIENT:
            return {
                ...state,
                patients: [...state.patients, action.payload]
            }
        case GET_PAGINATOR_PATIENTS:
            const LIMIT_PAGE = 10

            const end_page = (action.payload.page * LIMIT_PAGE > action.payload.total)
                ? action.payload.total : action.payload.page * LIMIT_PAGE

            const paginator = {
                ...action.payload,
                start_page: action.payload.page * LIMIT_PAGE - LIMIT_PAGE + 1,
                end_page: end_page
            }

            return {
                ...state,
                paginator: paginator
            }
        default:
            return state;
    }
}