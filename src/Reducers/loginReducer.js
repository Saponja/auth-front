import { act } from 'react-dom/test-utils';
import {login, LOGOUT} from '../actiontypes';

const initialState = {
    user : {},
    loggedIn : false,
    error : ""
}

export const loginReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case login.LOGIN_SUCCESS: 
            return {
                ...state,
                user : payload,
                loggedIn : true
            }
        case login.LOGIN_REQUEST:
            return {
                ...state
            }
        case login.LOGIN_FAILURE:
            return {
                ...state,
                error : payload
            }
        case LOGOUT:
            return {
                ...state,
                user : {},
                loggedIn : false
            }
        default:
            return state;

    }
}

