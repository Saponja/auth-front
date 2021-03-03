import createTypography from '@material-ui/core/styles/createTypography';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import {loginReducer} from './Reducers/loginReducer';
import {airplaneReducer} from './Reducers/airplaneReducer';
import {registerReducer} from './Reducers/registerReducer';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const loggerMiddleware  = createLogger();
const rootReducer = combineReducers({
    registerReducer,
    loginReducer,
    airplaneReducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk, loggerMiddleware )
);