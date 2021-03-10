import React, { useEffect, useState} from 'react';
import {Button, FormControl, Grid, MenuItem, Select, TextField, withStyles} from "@material-ui/core";
import useForm from './useForm';
import { addAirplane, updateAirplane } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const styles = theme => ({
    root : {
        '& .MuiTextField-root' : {
            margin: theme.spacing(1),
            minWidth : 230
        }
    },
    formControl : {
        margin: theme.spacing(1),
        minWidth : 230
    },
    btnMargin : { 
        margin: theme.spacing(1)

    }
})

const initalValues = {
    aname : "",
    company: "",
    model: ""
}

const InputForm = ({classes ,...props}) => {

    const dispatch = useDispatch();
    const airplanes = useSelector(state => state.airplaneReducer.airplanes);

    const {
        values,
        setValues,
        handleInputChange

    } = useForm(initalValues)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.currentId);
        if(props.currentId == 0){
            dispatch(addAirplane(values));
            props.setCurrentId(0);
        }
        if(props.currentId != 0){
            dispatch(updateAirplane(props.currentId, values));
            props.setCurrentId(0);

        }
        
    }

    

    useEffect(() => {
        if(props.currentId != 0){
            let airplane = airplanes.find(x => x.airplaneId == props.currentId);
            setValues({
                ...values,
                aname : airplane.name,
                company : airplane.company,
                model : airplane.model
            })
        }

    }, [props.currentId])

    return (
        <form autoComplete = "off" noValidate className = {classes.root} onSubmit = {handleSubmit}>
            <Grid container>

                <Grid item xs = {6}>
                    <TextField 
                        name = "aname"
                        variant = "outlined"
                        label = "Name"
                        value = {values.aname}
                        onChange = {handleInputChange}
                    />
                    <FormControl variant = "outlined" className = {classes.formControl}>
                        <Select
                            name = "company"
                            value = {values.company}
                            onChange = {handleInputChange} 
                        >
                            <MenuItem value = "">Select Company</MenuItem>
                            <MenuItem value = "0">Aeroflot</MenuItem>
                            <MenuItem value = "1">LuftHansa </MenuItem>
                            <MenuItem value = "2">BritishAirways</MenuItem>
                            <MenuItem value = "3">TurkishAirlines</MenuItem>
                            <MenuItem value = "4">QuatarAirways</MenuItem>
                            <MenuItem value = "5">AirSerbia</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        name = "model"
                        variant = "outlined"
                        label = "Model"
                        value = {values.model}
                        onChange = {handleInputChange}

                    />
                    
                </Grid>
                <Grid item xs = {6}>
                    <div>
                        <Button
                            name = "add"
                            variant = "contained"
                            color = "primary"
                            type = "submit"
                            className = {classes.btnMargin}
                            >
                            Edit
                        </Button>
                        <Button
                            name = "edit"
                            variant = "contained"
                            color = "primary"
                            type = "submit"
                            className = {classes.btnMargin}
                            >
                            Add
                        </Button>
                    </div>
                        <Button
                            name = "reset"
                            variant = "contained"
                            color = "secondary"
                            onClick = {() => {props.setCurrentId(0);
                            setValues({
                                ...values,
                                aname : "",
                                company : "",
                                model : ""
                            })}}
                            className = {classes.btnMargin}
                            >
                            Reset
                        </Button>

                </Grid>

            </Grid>


        </form>
    )
}

export default withStyles(styles)(InputForm);