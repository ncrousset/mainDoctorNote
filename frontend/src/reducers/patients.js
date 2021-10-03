import {
    GET_PATIENTS,
    DELETE_PATIENT,
    ADD_PATIENT,
    UPDATE_PATIENT,
    GET_PAGINATOR_PATIENTS,
    SEARCH_PATIENTS,
} from '../actions/types'

const initialState = {
    patients: [],
    search: '',
    paginator: []

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
        // case UPDATE_PATIENT:
        //     return {
        //         ...state,
        //         patients: state.patients.map(patient => {
        //             return patient.id !== action.payload.id ? patient : action.payload
        //         })
        //     };
        case ADD_PATIENT:
            return {
                ...state,
                patients: [...state.patients, action.payload]
            }
        case SEARCH_PATIENTS:
            return {
                ...state,
                search: action.payload
            }
        case GET_PAGINATOR_PATIENTS:
            const LIMIT_PAGE = 18

            const end_page = (action.payload.page * LIMIT_PAGE > action.payload.total)
                ? action.payload.total : action.payload.page * LIMIT_PAGE

            let start_page = 0
            if (action.payload.total > 0) {
                start_page = action.payload.page * LIMIT_PAGE - LIMIT_PAGE + 1
            }

            const paginator = {
                ...action.payload,
                start_page: start_page,
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