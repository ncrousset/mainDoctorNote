import { combineReducers } from 'redux';
import patients from './patients';
import errors from './errors';
import auth from './auth';

export default combineReducers({
    patients, errors, auth
});