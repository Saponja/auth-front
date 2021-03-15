import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../Actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar({loggedIn, token, role}) {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  function handleSignin() {
    console.log(localStorage.getItem('token'));
    history.push('/signin');

  }

  function handleSignup() {
    console.log(localStorage.getItem('token'));

    history.push('/signup');
  }

  function handleSignout(){
    localStorage.removeItem('token');
    dispatch(logout());
    history.push('/signin');
    
  }

  if(!loggedIn && localStorage.getItem('token') == null){
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              BAir
            </Typography>
            <Button color="inherit" onClick = {handleSignin}>Sign in</Button>
            <Button color="inherit" onClick = {handleSignup}>Sign up</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }else{
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              BAir
            </Typography>
            <Button color="inherit" onClick = {handleSignout}>Sign out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
}