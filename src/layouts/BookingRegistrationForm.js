import React,{useState} from 'react'
import {Grid,TextField} from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

import moment from 'moment';

import {SurgeryType} from '../data/Data'





const BookingRegistrationForm = (props) => {
    console.log("form vannu")
    const { register,control,formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            UHID: props.uhid,
            surgery_Name:props.name
         }
     });
    const [periodStart, setPeriodStart] = useState(moment());

    const onSubmit = (data) => console.log(data);
    
    const useStyles = {
        root: {
            padding: '12px 6px',
        
          },
        textfield:{
            width:'100%',
            fontSize:"14px",
            
        },
        errortext:{
            color:'red',
            margin:'3px 0px',
            fontSize:"12px"
        },
      };
      const SelectChange = (e)=>{
        console.log(">>>>>>>>>",e)
        return e.target?.value;
      }
    return (

        <form onSubmit={handleSubmit(onSubmit)}>

        <Grid container>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's UHID" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('UHID', { required: true,minLength: 2})}
                />
                    {errors.UHID && errors.UHID.type === "required" && <p style={useStyles.errortext}>UHID is required.</p>}
                    {errors.UHID && errors.UHID.type === "minLength" && (<p style={useStyles.errortext}>Your UHID must be at 6 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's Name" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('Name', { required: true,minLength: 2})}
                />
                {errors.Name && errors.Name.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
                {errors.Name && errors.Name.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="OT Name" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('OT', { required: true,minLength: 2})}
                />
                    {errors.OT && errors.OT.type === "required" && <p style={useStyles.errortext}>OT Name is required.</p>}
                    {errors.OT && errors.OT.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's Ward" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('Ward', { required: true,minLength: 2})}
                />
                    {errors.Ward && errors.Ward.type === "required" && <p style={useStyles.errortext}>Ward is required.</p>}
                    {errors.Ward && errors.Ward.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        style={useStyles.textfield} 
                        value={periodStart}
                        onChange={(newDate) => {
                            setPeriodStart(newDate)
                        }}
                        renderInput={(params) => 
                            <TextField {...params} 
                                {...register('bDate')}
                            />}
                        />
                    {errors.bDate && errors.bDate.type === "required" && <p style={useStyles.errortext}>Date is required.</p>}
                </LocalizationProvider>
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Start time" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('sTime', { required: true,minLength: 2})}
                />
                    {errors.sTime && errors.sTime.type === "required" && <p style={useStyles.errortext}>Start time is required.</p>}
                    {errors.sTime && errors.sTime.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="End Time" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('eTime', { required: true,minLength: 2})}
                />
                    {errors.eTime && errors.eTime.type === "required" && <p style={useStyles.errortext}>End Time is required.</p>}
                    {errors.eTime && errors.eTime.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Surgery Type</InputLabel>
                <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"    
                    label="Surgery Type"   
                    style={useStyles.textfield} 
                    {...register('surgery_Type',{ required: true})}
                >
                {
                    SurgeryType.map((data) => {
                        return (
                            <MenuItem value={data.value}>{data.label}</MenuItem>
                        )})
                }
                </Select>
                {errors.surgery_Type && errors.surgery_Type.type === "required" && <p style={useStyles.errortext}>Surgery Type is required.</p>}
            </FormControl>
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Surgeon Name" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('surgery_Name', { required: true,minLength: 2})}
                />
                    {errors.surgery_Name && errors.surgery_Name.type === "required" && <p style={useStyles.errortext}>Surgery Name is required.</p>}
                    {errors.surgery_Name && errors.surgery_Name.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>


            <Grid md={3} style={useStyles.root}>
                <Controller
                    name="a_surgery_Name"
                    control={control}
                    type="text"
                    defaultValue={[]}
                    rules={{ required: true }}
                    render={({ field:{value,onChange} })=> (
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">A Surgery Name</InputLabel>
                                <Select 
                                    {...register}
                                    labelId="a_surgery_Name"
                                    id="a_surgery_Name"    
                                    label="A Surgery Name"   
                                    multiple
                                    defaultValue={[]}
                                    style={useStyles.textfield} 
                                    onChange={(e)=>{
                                        let newData = SelectChange(e);
                                        onChange(newData)
                                    }}
                                    // MenuProps={MenuProps}
                                    
                                >
                                    {
                                        SurgeryType.map((data) => {
                                            return(
                                                <MenuItem key={data.id} value={data.value}>{data.label}</MenuItem>
                                            )    
                                        })
                                    }
                                </Select>
                        </FormControl>
                    )}
                />
                {errors.a_surgery_Name && errors.a_surgery_Name.type === "required" && <p style={useStyles.errortext}>A Surgery Name is required.</p>}
            </Grid>


            <Grid md={3} style={useStyles.root}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Anesthesia Type</InputLabel>
                <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"    
                    label="Anesthesia Type"   
                    style={useStyles.textfield} 
                    {...register('anesthesia_Type',{ required: true})}
                >
                {
                    SurgeryType.map((data) => {
                        return (
                            <MenuItem value={data.value}>{data.label}</MenuItem>
                        )})
                }
                </Select>
                {errors.anesthesia_Type && errors.anesthesia_Type.type === "required" && <p style={useStyles.errortext}>Anesthesia Type is required.</p>}
            </FormControl>
            </Grid>

            <Grid md={3} style={useStyles.root}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Preffered Anasthetist</InputLabel>
                <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"    
                    label="Preffered Anasthetist"   
                    style={useStyles.textfield} 
                    {...register('anasthetist',{ required: true})}
                >
                {
                    SurgeryType.map((data) => {
                        return (
                            <MenuItem value={data.value}>{data.label}</MenuItem>
                        )})
                }
                </Select>
                {errors.anasthetist && errors.anasthetist.type === "required" && <p style={useStyles.errortext}>Preffered Anasthetist is required.</p>}
            </FormControl>
            </Grid>



            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Other Department Surgen Names" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('od_surgenName', { required: true,minLength: 2})}
                />
                    {errors.od_surgenName && errors.od_surgenName.type === "required" && <p style={useStyles.errortext}>Surgery Name is required.</p>}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Other Department A.Surgen Names" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('od_a_surgery_Name', { required: true,minLength: 2})}
                />
                    {errors.od_a_surgery_Name && errors.od_a_surgery_Name.type === "required" && <p style={useStyles.errortext}>Name is required.</p>}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Anesthesia Type" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('anesthesia_Type', { required: true,minLength: 2})}
                />
                    {errors.anesthesia_Type && errors.anesthesia_Type.type === "required" && <p style={useStyles.errortext}>Anesthesia Type is required.</p>}
                    {errors.anesthesia_Type && errors.anesthesia_Type.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Special Equipment" 
                    variant="outlined" 
                    style={useStyles.textfield} 
                    {...register('sEquipment', { required: true,minLength: 2})}
                />
                    {errors.sEquipment && errors.sEquipment.type === "required" && <p style={useStyles.errortext}>Special Equipment is required.</p>}
            </Grid>




            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Instructions for Nurses" 
                    variant="outlined" 
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('inst_nurses', { required: true,maxLength: 1000})}
                />
                    {errors.inst_nurses && errors.inst_nurses.type === "required" && <p style={useStyles.errortext}>Instructions is required.</p>}
                    {errors.inst_nurses && errors.inst_nurses.type === "maxLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Instructions for anaesthetist" 
                    variant="outlined" 
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('inst_anaesthetist', { required: true,maxLength: 1000})}
                />
                    {errors.inst_anaesthetist && errors.inst_anaesthetist.type === "required" && <p style={useStyles.errortext}>Instructions is required.</p>}
                    {errors.inst_anaesthetist && errors.inst_anaesthetist.type === "maxLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Instructions for OT Person" 
                    variant="outlined" 
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('inst_otp', { required: true,maxLength: 1000})}
                />
                    {errors.inst_otp && errors.inst_otp.type === "required" && <p style={useStyles.errortext}>Instructions is required.</p>}
                    {errors.inst_otp && errors.inst_otp.type === "maxLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Special Material Requests" 
                    variant="outlined" 
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('special_Material', { required: true,maxLength: 1000})}
                />
                    {errors.special_Material && errors.special_Material.type === "maxLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

        </Grid>
        <button type="submit" >Submit</button>
        </form>

    )
}

export default BookingRegistrationForm

