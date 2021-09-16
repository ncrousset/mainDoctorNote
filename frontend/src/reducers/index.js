import { combineReducers } from 'redux';
import patients from './patients';
import errors from './errors';
import auth from './auth';
import lastSuccessAction from './lastSuccessAction';

export default combineReducers({
    patients, errors, auth, lastSuccessAction
});