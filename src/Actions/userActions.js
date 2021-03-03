
import * as actions from  '../actiontypes';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const baseUrl = "https://localhost:44355/api/auth/";

function getHeader(){
    const token = localStorage.getItem("token");
    if(token){
        return { Authorization: 'Bearer ' + token };
    }else{
        return {};
    }
}

export const register = user => dispatch => {
    
    dispatch({type : actions.register.REGISTER_REQUEST});

    axios.post(baseUrl + "register", user)
    .then(response => {
        dispatch({
            type : actions.register.REGISTER_SUCCESS,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type : actions.register.REGISTER_FAILURE,
            payload : error
        })
    })
}

export const login = credentials => dispatch => {
    
    dispatch({type : actions.login.LOGIN_REQUEST});

    axios.post(baseUrl + "login", credentials)
    .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch({
            type : actions.login.LOGIN_SUCCESS,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type : actions.login.LOGIN_FAILURE,
            payload : error
        })
    });
}


export const logout = () => dispatch => {
    localStorage.removeItem('token');

    dispatch({
        type : actions.LOGOUT
    })
}

export const getAirplanes = () => dispatch => {
    axios.get("https://localhost:44355/api/airplane/getall", {headers : getHeader()})
    .then(response => {
        dispatch({
            type : actions.airplanes.GETALL_SUCCESS,
            payload : response.data
        });
    })
    .catch(error => {
        dispatch({
            type : actions.airplanes.GETALL_FAILURE,
            payload : error
        });
    })
}


export const getOne = (id) => dispatch => {
    axios.get(`https://localhost:44355/api/airplane/get/${id}`, {headers : getHeader()})
    .then(response => {
        dispatch({
            type : actions.airplanes.GETONE_SUCCESS,
            payload : response.data
        });
    })
    .catch((error) => {
        dispatch({
            type : actions.airplanes.GETONE_FAILURE,
            payload : error.response
        });
    })
}