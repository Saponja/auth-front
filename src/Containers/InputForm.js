import React, { useEffect, useState} from 'react';
import {Button, FormControl, Grid, MenuItem, Select, TextField, withStyles} from "@material-ui/core";
import useForm from './useForm';
import { addAirplane, addAirplaneWithFeed, updateAirplane, updateAirplaneWithFeed } from '../Actions/userActions';
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
    const [btnText, setBtnText] = useState("Add");

    const {
        values,
        setValues,
        handleInputChange

    } = useForm(initalValues)

    const success = (text) => {

        props.setColor("success");
        props.setText(text);
        props.setOpen(true)
        setValues({
            aname : "",
            company : "",
            model : ""
        })
        props.setCurrentId(0);
    }

    const badRequest = () => {
        props.setColor("error");
        props.setText("Bad request");
        props.setOpen(true)
    }

    const notAuthorized = () => {
        props.setColor("warning");
        props.setText("Not authorized");
        props.setOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.currentId == 0){
            dispatch(addAirplaneWithFeed(values))
            .then((response) => {
                success("Airplane has been added successfully");
              }, (status) => {
                    if(status == 400){
                        badRequest();
                    }else if(status == 403){
                        notAuthorized();
                    }
              })
            
        }
        if(props.currentId != 0){
            dispatch(updateAirplaneWithFeed(props.currentId, values))
            .then((response) => {
               success("Airplane has been updated successfully");
              }, (status) => {
                    if(status == 400){
                        badRequest();
                    }else if(status == 403){
                        notAuthorized();
                    }
              })
            
        }
        
    }

    

    useEffect(() => {

        if(props.currentId == 0){
            setBtnText("Add");
        }else{
            setBtnText("Edit");
        }

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
                            <MenuItem value = "Aeroflot">Aeroflot</MenuItem>
                            <MenuItem value = "LuftHansa">LuftHansa </MenuItem>
                            <MenuItem value = "BritishAirways">BritishAirways</MenuItem>
                            <MenuItem value = "TurkishAirlines">TurkishAirlines</MenuItem>
                            <MenuItem value = "QuatarAirways">QuatarAirways</MenuItem>
                            <MenuItem value = "AirSerbia">AirSerbia</MenuItem>
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
                            name = "sub"
                            variant = "contained"
                            color = "primary"
                            type = "submit"
                            className = {classes.btnMargin}
                            >
                            {btnText}
                        </Button>
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
                    </div>
                    
                </Grid>

            </Grid>
        </form>
    )
}

export default withStyles(styles)(InputForm);