import React from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from '../store';
import Navbar from './Navbar';
import {Register} from './Register';
import SignIn from './Login';
import Home from './Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';

function App() {

  const {token, role} = useSelector(state => state.loginReducer.user);
  const loggedIn = useSelector(state => state.loginReducer.loggedIn);


  return (
    <div>
      <Router>
        <Navbar loggedIn = {loggedIn} token = {token} role = {role}/>
          <Switch>
            <Route path = '/signup'>
              <Register />
            </Route>
            <Route exact path = "/signin">
              <SignIn />
            </Route>
            <PrivateRoute exact path = "/home" component={Home} />
          </Switch>
        </Router>
    </div>
  )
}

export default App;
