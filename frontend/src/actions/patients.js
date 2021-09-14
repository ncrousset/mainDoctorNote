import { GET_PATIENTS, DELETE_PATIENT } from './types';
import axios from 'axios';

//GET PATIENTS
// /api/patients
export const getPatients = () => dispatch => {
    axios('/api/patients/')
        .then(response => {
            dispatch({
                type: GET_PATIENTS,
                payload: response.data
            });
        }).catch(error => console.log(error))
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
