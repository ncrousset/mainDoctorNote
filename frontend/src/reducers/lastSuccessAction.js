import { LAST_SUCCESS_ACTION } from '../actions/types'

const initialState = {
    type: null,
    object: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LAST_SUCCESS_ACTION:
            return {
                type: action.payload.type,
                object: action.payload.object,
            }
        default:
            return state;
    }
}