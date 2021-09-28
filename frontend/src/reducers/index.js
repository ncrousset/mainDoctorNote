import { combineReducers } from 'redux';
import patients from './patients';
import errors from './errors';
import alert from './alert'
import auth from './auth';
import patient from './patient';

export default combineReducers({
    patients, patient, errors, alert, auth
});