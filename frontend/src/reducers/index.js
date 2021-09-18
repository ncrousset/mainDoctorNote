import { combineReducers } from 'redux';
import patients from './patients';
import errors from './errors';
import auth from './auth';
import patient from './patient';

export default combineReducers({
    patients, patient, errors, auth
});