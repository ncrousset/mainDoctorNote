import { GET_PATIENTS } from '../actions/types.js'

const initialState = {
    patients: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PATIENTS:
            return {
                ...state,
                patients: action.payload,
            }
        default:
            return state;
    }
}