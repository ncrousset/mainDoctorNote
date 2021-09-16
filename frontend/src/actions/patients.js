import { returnErrors } from "./messages";

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

    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get('/api/patients/', config)
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
export const addPatient = (patient) => dispatch => {
    axios
        .post('/api/patients/', patient)
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
