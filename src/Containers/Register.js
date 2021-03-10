import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Actions/userActions';
import { CheckRounded } from '@material-ui/icons';

export const Register = () => {
    const [user, setUser] = useState({
        username : "",
        password : "",
        email : "",
        role : "User"
    })
    const [submitted, setSubmitted] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const handleMouseClicked = useCallback(e => {
      checked ? setChecked(false) : setChecked(true);

    })

    
    const changeRole = useCallback(() => {
      setUser(user => ({...user, role : checked ? "Admin" : "User"}));
    })

    const changeRoleIf = () => {
      if((checked && user.role === "User") || (!checked && user.role === "Admin") ){
          changeRole();
      }
    }


    useEffect(() => {
        document.getElementById("check").addEventListener('mousedown', handleMouseClicked);
        changeRoleIf();

        return () => {
        if(document.getElementById("check") != null){
          document.getElementById("check").removeEventListener('mousedown', handleMouseClicked);
        }
        
      }
    }, [handleMouseClicked])

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value}));
    }

    function handleChecked (e) {

        if(checked == false){
          setChecked(true)
        }else{
          setChecked(false)
        }
        //setUser(user => ({...user, role : checked ? "User" : "Admin"}));

        
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        console.log(user.role)
        if (user.email && user.username && user.password && user.role) {
            dispatch(register(user));
        }
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      
        const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit = {handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                onChange = {handleChange}
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange = {handleChange}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange = {handleChange}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
            <FormControlLabel
            control={<Checkbox checked={checked} value = {checked} name="role" id = "check"/>}
            label="Admin"
            />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Button
            onClick = {(e) => {                
              console.log(checked);
              console.log(user.role)}}
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            check
          </Button>
        </form>
      </div>
    </Container>
  );



    // return (
    //     <div className="col-lg-4 offset-lg-2 ">
    //         <h2>Register</h2>
    //         <form name="form" onSubmit={handleSubmit}>
    //             <div className="form-group">
    //                 <label>Email</label>
    //                 <input type="text" name="email" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
    //             </div>
    //             <div className="form-group">
    //                 <label>Username</label>
    //                 <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
    //                 {submitted && !user.username &&
    //                     <div className="invalid-feedback">Username is required</div>
    //                 }
    //             </div>
    //             <div className="form-group">
    //                 <label>Password</label>
    //                 <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
    //                 {submitted && !user.password &&
    //                     <div className="invalid-feedback">Password is required</div>
    //                 }
    //             </div>
    //             <div className="form-group">
    //                 <button className="btn btn-primary">
    //                     Register
    //                 </button>
                    
    //             </div>
    //         </form>
    //     </div>
    // );
}

