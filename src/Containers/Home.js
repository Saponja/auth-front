import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {login} from '../Actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import {getAirplanes, getOne} from '../Actions/userActions'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core';


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home({role}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const airplanes = useSelector(state => state.airplaneReducer.airplanes)
  const airplane = useSelector(state => state.airplaneReducer.oneairplane)



  function handleClick(e){
      dispatch(getAirplanes());
  }

  function handleClick2(e){
    dispatch(getOne(5));
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Grid>

        <Grid item xs = {12}>
        <Button
            onClick = {handleClick}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            CLICKME
          </Button>
        </Grid>
        <Grid item xs = {12}>
        <Button
            onClick = {handleClick2}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            CLICKME
          </Button>
        </Grid>
        </Grid>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Model</StyledTableCell>
              <StyledTableCell>Compnay</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              airplanes.map((item, i) => {
                return (
                  <TableRow key = {i}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.company}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </Container>
  );
}