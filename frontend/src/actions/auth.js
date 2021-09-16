import axios from "axios";
import { returnErrors } from "./messages";
import { useLocation } from 'react-router-dom';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

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

    axios.get('/api/auth/user', config)
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
            console.log(window.location.pathname)
            dispatch(returnErrors(error.response.data, error.response.status))
            dispatch({ type: LOGIN_FAIL })
        })
}