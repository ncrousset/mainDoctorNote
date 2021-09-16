import { returnErrors } from "./messages";
import { Token } from "../common/Token"

import {
    GET_PATIENTS,
    DELETE_PATIENT,
    ADD_PATIENT,
    GET_ERRORS,
} from './types';

import axios from 'axios';

//GET PATIENTS
// /api/patients
export const getPatients = () => (dispatch, getState) => {

    axios.get('/api/patients/', Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_PATIENTS,
                payload: response.data
            });
        }).catch(error => {
            console.log('resorver mas adelante')
            dispatch(returnErrors(error.response.data.detail, error.response.status))
            dispatch({ type: GET_ERRORS })
        })
}

// DELETE PATIENT
export const deletePatient = (id) => dispatch => {
    axios
        .delete(`/api/patients/${id}/`, { id: id })
        .then(response => {
            dispatch({
                type: DELETE_PATIENT,
                payload: id
            });
        }).catch(error => console.log(error))
}

//ADD PATIENT
export const addPatient = (patient) => (dispatch, getState) => {
    axios
        .post('/api/patients/', patient, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: ADD_PATIENT,
                payload: response.data
            });
        }).catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }

            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        })
}
