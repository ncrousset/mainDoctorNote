import { GET_PATIENTS } from './types';
import axios from 'axios';

//GET PATIENTS
//127.0.0.1:8000/api/patients
export const getPatients = () => dispatch => {
    axios('/api/patients/')
        .then(response => {
            console.log(response.data)

            dispatch({
                type: GET_PATIENTS,
                payload: response.data
            });
        }).catch(error => console.log(error))
}