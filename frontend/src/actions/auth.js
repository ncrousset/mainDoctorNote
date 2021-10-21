import axios from "axios";
import { returnErrors } from "./messages";
import { useLocation } from 'react-router-dom';
import { Token } from "../common/Token";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    GET_ERRORS
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading

    console.log("load User")

    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: USER_LOADED,
                payload: response.data
            })
        }).catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status))
            dispatch({ type: AUTH_ERROR })
        })
}

// LOGIN USER
export const login = (username, password) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login', body, config)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        }).catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status))
            dispatch({ type: LOGIN_FAIL })
        })
}


// register USER
export const register = (username, password, email) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ username, password, email })

    axios.post('/api/auth/register', body, config)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        }).catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status))
            dispatch({ type: LOGIN_FAIL })
        })
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout', null, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        }).catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status))
        })
}

// Reset Password
export const resetPassword = (email) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ email })

    return new Promise((resolve, reject) => {
        axios.post('/api/auth/reset_password', body, config)
            .then(response => {
                resolve(response)
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

// Reset Password
export const changerPassword = (token, password) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ token, password })

    return new Promise((resolve, reject) => {
        axios.post('/api/auth/changer_password', body, config)
            .then(response => {
                resolve(response)
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