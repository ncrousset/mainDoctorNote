import { Token } from "../common/Token"
import axios from 'axios'

import {
    GET_BACKGROUND,
    ADD_BACKGROUND,
    GET_ERRORS,
    GET_ALERT,
    DELETE_BACKGROUND,
    UPDATE_BACKGROUND,
    GET_MEDICAL_HISTORIES,
    ADD_MEDICAL_HISTORY,
    UPDATE_MEDICAL_HISTORY,
    DELETE_MEDICAL_HISTORY,
    GET_MEDICAL_STUDIES,
    ADD_MEDICAL_STUDY,
    DELETE_MEDICAL_STUDY,
    UPDATE_MEDICAL_STUDY,
    GET_MEDICAL_TREATMENTS,
    ADD_MEDICAL_TREATMENT,
    UPDATE_MEDICAL_TREATMENT,
    DELETE_MEDICAL_TREATMENT
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

//Add Background 
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

//Edit Background 
export const editBackground = (backgroud, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/patient/background/${backgroud.id}`, data, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: UPDATE_BACKGROUND,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Background udated",
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

// GET Medical histories
export const getMedicalHistories = (patient) => (dispatch, getState) => {

    axios.get(`/api/patient/${patient}/medical-history`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_MEDICAL_HISTORIES,
                payload: response.data.data
            });
        }).catch(error => {
            // dispatch(returnErrors('error', 45))
            // dispatch({ type: GET_ERRORS })
        })
}

//Add Medical histories 
export const addMedicalHistories = (patient, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/patient/${patient}/medical-history`, data, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: ADD_MEDICAL_HISTORY,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Medical histories create",
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

// Delete Medical histories 
export const deleteMedicalHistories = (medicalHistory) => (dispatch, getState) => {
    axios.delete(`/api/patient/medical-history/${medicalHistory}`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: DELETE_MEDICAL_HISTORY,
                payload: medicalHistory
            });

            const alert = {
                type: 'str',
                msg:  "Medical History Deleted",
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

//Edit Medical histories  
export const editMedicalHistory = (medicalHistory, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/patient/medical-history/${medicalHistory.id}`, data, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: UPDATE_MEDICAL_HISTORY,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Medical history udated",
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

// GET Medical studies
export const getMedicalStudies = (patient) => (dispatch, getState) => {

    axios.get(`/api/patient/${patient}/medical-studies`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_MEDICAL_STUDIES,
                payload: response.data.data
            });
        }).catch(error => {
            // dispatch(returnErrors('error', 45))
            // dispatch({ type: GET_ERRORS })
        })
}

//Add Medical study 
export const addMedicalStudy = (patient, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/patient/${patient}/medical-studies`, data, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: ADD_MEDICAL_STUDY,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Medical study create",
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

// Delete Medical study 
export const deleteMedicalStudy = (medicalStudy) => (dispatch, getState) => {
    axios.delete(`/api/patient/medical-study/${medicalStudy}`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: DELETE_MEDICAL_STUDY,
                payload: medicalStudy
            });

            const alert = {
                type: 'str',
                msg:  "Medical Study Deleted",
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

//Edit Medical Study  
export const editMedicalStudy = (medicalStudy, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/patient/medical-study/${medicalStudy.id}`, data, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: UPDATE_MEDICAL_STUDY,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Medical study udated",
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

// GET Medical treatments
export const getMedicalTreatments = (patient) => (dispatch, getState) => {

    axios.get(`/api/patient/${patient}/medical-treatments`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_MEDICAL_TREATMENTS,
                payload: response.data.data
            });
        }).catch(error => {
            // dispatch(returnErrors('error', 45))
            // dispatch({ type: GET_ERRORS })
        })
}

//Add Medical treatment 
export const addMedicalTreatment= (patient, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/patient/${patient}/medical-treatments`, data, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: ADD_MEDICAL_TREATMENT,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Medical treatment create",
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

// Delete Medical treatment
export const deleteMedicalTreatment = (medicalTreatment) => (dispatch, getState) => {
    axios.delete(`/api/patient/medical-treatment/${medicalTreatment}`, Token.getTokenConfig(getState))
        .then(response => {
            dispatch({
                type: DELETE_MEDICAL_TREATMENT,
                payload: medicalTreatment
            });

            const alert = {
                type: 'str',
                msg:  "Medical Treatment Deleted",
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

//Edit Medical treatment  
export const editMedicalTreatment = (medicalTreatment, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/patient/medical-treatment/${medicalTreatment.id}`, data, Token.getTokenConfig(getState))
            .then(response => {
                dispatch({
                    type: UPDATE_MEDICAL_TREATMENT,
                    payload: response.data
                });

                const alert = {
                    type: 'str',
                    msg:  "Medical Treatment udated",
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