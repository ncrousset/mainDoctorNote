import { GET_ALERT } from '../actions/types';

const initialState = {
    type: 'str',
    msg: {},
    status: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALERT:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                type: action.payload.type
            };
        default:
            return state;
    }
}