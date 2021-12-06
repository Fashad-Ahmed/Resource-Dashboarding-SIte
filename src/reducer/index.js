import { combineReducers } from 'redux';
import alert from './alert.js';
import auth from './auth.js';
export default combineReducers({
    auth: auth,
    alert: alert
});


// import combineReducers from '../../store/reducers';