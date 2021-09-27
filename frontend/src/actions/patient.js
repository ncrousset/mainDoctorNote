import { Token } from "../common/Token"
import { returnErrors } from "./messages";
import axios from 'axios'

import {
    GET_BACKGROUND,
    GET_ERRORS
} from './types';

// GET Baground
export const getBackground = (patient_id) => (dispatch, getState) => {

    axios.get(`/api/patient/${patient_id}/background`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_BACKGROUND,
                payload: response.data.data
            });
        }).catch(error => {
            // dispatch(returnErrors('error', 45))
            // dispatch({ type: GET_ERRORS })
        })
}