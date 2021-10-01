import { Token } from "../common/Token"
import { returnErrors } from "./messages";
import axios from 'axios'

import {
    GET_BACKGROUND,
    ADD_BACKGROUND,
    GET_ERRORS,
    GET_ALERT,
    DELETE_BACKGROUND
} from './types';

// GET Background
export const getBackground = (patient) => (dispatch, getState) => {

    axios.get(`/api/patient/${patient}/background`, Token.getTokenConfig(getState))
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

//Add Background Estoy trabajando AQUI
export const addBackground = (patient, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/patient/${patient}/background`, data, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: ADD_BACKGROUND,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Background Create",
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
                    msg:  error.response.data,
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


// Delete Background
export const deleteBackground = (background) => (dispatch, getState) => {
    axios.delete(`/api/patient/background/${background}`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: DELETE_BACKGROUND,
                payload: background
            });

            const alert = {
                type: 'str',
                msg:  "Background Deleted",
                status: response.status
            }

            dispatch({
                type: GET_ALERT,
                payload: alert
            })
        }).catch(error => {
            const errors = {
                type: 'str',
                msg:  error.response.data,
                status: error.response.status
            }

            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        })
}