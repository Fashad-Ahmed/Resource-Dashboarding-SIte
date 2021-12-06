import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./types";
import setAuthToken from '../utils/setAuthToken';

export const loadStudent = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = axios.post('/api/authStud/studentSignup');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {

        dispatch({
            type: AUTH_ERROR
        })
    }

}


export const register = ({ name, email, password, status }) => async dispatch => {
    console.log('entered')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, status });
    console.log(body)
    try {
        console.log('config->', config);
        console.log('body->', body);
        // http://localhost:5000
        const res = await axios.post('/api/authStud/studentSignup', body, config);
        console.log(`api hit student`)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadStudent());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            console.log(errors)
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'

        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth/studentLogin', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadStudent());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        })

    }
}

//LOGOUT / CLEAR PROFILE
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}
