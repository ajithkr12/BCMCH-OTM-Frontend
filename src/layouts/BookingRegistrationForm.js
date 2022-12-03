import React from 'react'
import {Grid,TextField} from '@mui/material';
import { useForm } from "react-hook-form";


const BookingRegistrationForm = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    
    const useStyles = {
        root: {
            padding: '6px',
        
          },
        textfield:{
            width:'100%',
            fontSize:"12px"
            
        },
        errortext:{
            color:'red',
            margin:'3px 0px',
            fontSize:"12px"
        },
      };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

        <Grid container>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's UHID" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('Name', { required: true,minLength: 2})}
                />
                    {errors.Name && errors.Name.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.Name && errors.Name.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's Name" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="OT Name" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's Ward" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Name" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('Name', { required: true,minLength: 2})}
                />
                    {errors.Name && errors.Name.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.Name && errors.Name.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="UHID" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="UHID" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="UHID" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Name" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('Name', { required: true,minLength: 2})}
                />
                    {errors.Name && errors.Name.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.Name && errors.Name.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="UHID" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="UHID" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="UHID" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>
        </Grid>
        <input type="submit" />
        </form>

    )
}

export default BookingRegistrationForm



