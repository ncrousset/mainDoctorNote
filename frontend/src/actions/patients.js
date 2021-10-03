import { returnErrors } from "./messages";
import { Token } from "../common/Token"
import { Redirect } from "react-router-dom";
// import store from '../store'

import {
    GET_PATIENTS,
    DELETE_PATIENT,
    ADD_PATIENT,
    GET_ERRORS,
    GET_PATIENT,
    UPDATE_PATIENT,
    GET_PAGINATOR_PATIENTS,
    SEARCH_PATIENTS,
    GET_SESSION_PATIENT,
    GET_ALERT,
} from './types';

import axios from 'axios';

//GET PATIENTS
// /api/patients
export const getPatients = (page = 1) => (dispatch, getState) => {

    let url = `/api/patients/?p=${page}`

    if (getState().patients.search.length > 1) {
        url += `&q=${getState().patients.search}`
    }

    axios.get(url, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_PATIENTS,
                payload: response.data.data
            });

            dispatch({
                type: GET_PAGINATOR_PATIENTS,
                payload: { 'page': response.data.page, 'total': response.data.total }
            });

        }).catch(error => {
            dispatch(returnErrors(error.response.data.detail, error.response.status))
            dispatch({ type: GET_ERRORS })
        })
}

// GET Patient
export const getPatient = (id) => (dispatch, getState) => {

    axios.get(`/api/patient/${id}`, Token.getTokenConfig(getState))
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
export const deletePatient = (id) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`/api/patient/${id}/`, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: DELETE_PATIENT,
                    payload: id
                });

                const alert = {
                    type: 'str',
                    msg:  "Patient Deleted",
                    status: response.status
                }
    
                dispatch({
                    type: GET_ALERT,
                    payload: alert
                })

                resolve(response)
            }).catch(error => {
                dispatch(returnErrors(error.response.data.detail, error.response.status))
                dispatch({ type: GET_ERRORS })
                reject()
            })
    })
}

//ADD PATIENT
export const addPatient = (patient) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/patients/create', patient, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: ADD_PATIENT,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Patient Added",
                    status: response.status
                }
    
                dispatch({
                    type: GET_ALERT,
                    payload: alert
                })

                resolve(response.data)

            }).catch(error => {

                const errors = {
                    type: 'str',
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

//UPDATE PATIENT
export const updatePatient = (patient) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/patient/${patient.id}/`, patient, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: UPDATE_PATIENT,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Patient updated",
                    status: response.status
                }
    
                dispatch({
                    type: GET_ALERT,
                    payload: alert
                })

                resolve(response.data)

            }).catch(error => {
                const errors = {
                    type: 'str',
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

// SEARCH PATIENT 
export const searchPatient = (search) => dispatch => {
    dispatch({
        type: SEARCH_PATIENTS,
        payload: search
    });
}

// SET_SESSION_PATIENT
export const setSessionPatient = (session) => (dispatch) => {
    dispatch({
        type: GET_SESSION_PATIENT,
        payload: session
    });
}