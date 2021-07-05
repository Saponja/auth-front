import React from 'react'
import { useSelector } from 'react-redux'
import {Route, Redirect} from 'react-router-dom'


export default function PrivateRoute({component : Component, ...rest}) {
    const isLoggedIn = useSelector(state =>  state.loginReducer.loggedIn);
    return (
        <Route
        {...rest}
        render={props => {
            return (isLoggedIn || localStorage.getItem("token") !== null) ? <Component {...props} /> : <Redirect to="/signin" />
        }}
        >

        </Route>

    )
}
