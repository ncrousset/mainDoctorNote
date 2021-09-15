import { combineReducers } from 'redux';
import patients from './patients'
import errors from './errors'

export default combineReducers({
    patients, errors
});