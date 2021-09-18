import { returnErrors } from "./messages";
import { Token } from "../common/Token"
import { Redirect } from "react-router-dom";

import {
    GET_PATIENTS,
    DELETE_PATIENT,
    ADD_PATIENT,
    GET_ERRORS,
    GET_PATIENT
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
            dispatch(returnErrors(error.response.data.detail, error.response.status))
            dispatch({ type: GET_ERRORS })
        })
}

// GET Patient
export const getPatient = (id) => (dispatch, getState) => {

    axios.get(`/api/patients/${id}`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_PATIENT,
                payload: response.data
            });
        }).catch(error => {
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
    return new Promise((resolve, reject) => {
        axios
            .post('/api/patients/', patient, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: ADD_PATIENT,
                    payload: response.data
                });

                resolve(response.data)

            }).catch(error => {

                const errors = {
                    type: 'obj',
                    msg: error.response.data,
                    status: error.response.status
                }

                dispatch({
                    type: GET_ERRORS,
                    payload: errors
                })

                reject()
            })
    })
}
