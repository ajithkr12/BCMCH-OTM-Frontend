import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {Grid,TextField} from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

import {SurgeryType} from '../data/Data';
import {PostBookingData} from '../services/UserServices';




const BookingRegistrationForm = (props) => {
    console.log("###",props.results)
    ////////////////////////////////////////
    const PatientName="Hari Devan";
    const WardName="B21";
    const OtName="OT1"
    ///////////////////////////////////////

    const navigate = useNavigate();
    console.log("form vannu");
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

    const { register,control,formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            RegistrationNo: props.uhid,
            DoctorId:props.EpId,
            
        }
    });

    const [periodStart, setPeriodStart] = useState('11/12/2022');
    const [TimeStart, setTimeStart] = useState();
    const [TimeEnd, setTimeEnd] = useState();
    const [inputs, setInputs] = useState({
        loading:false,
        errorMessage:'',
    });

    const onSubmit =  async(data) => {
        console.log(data)
        data.EmployeeIdArray=[...data.OdEmployeeIdArray,...data.EmployeeIdArray]
        try {
          console.log("data sentomo")
          await PostBookingData(data); 
          alert("Post created!");
          setInputs({
            ...inputs,
            loading:true
          }) ;
          
        } 
        catch (error) {
          const _error =
          (error.response &&
            error.response.data &&
              error.response.data.message) ||
                error.message ||
                  error.toString();
          setInputs({
            ...inputs,
            loading:false,
            errorMessage:_error
          }) ;
          console.log('error vannu',_error);  
        }
  
        navigate("/");
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
                    {...register('RegistrationNo', { required: true,minLength: 2})}
                />
                    {errors.RegistrationNo && errors.RegistrationNo.type === "required" && <p style={useStyles.errortext}>UHID is required.</p>}
                    {errors.RegistrationNo && errors.RegistrationNo.type === "minLength" && (<p style={useStyles.errortext}>Your UHID must be at 6 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's Name" 
                    variant="outlined" 
                    value={PatientName}
                    disabled
                    style={useStyles.textfield} 
                    // {...register('Name', { required: true,minLength: 2})}
                />
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="OT Name" 
                    variant="outlined" 
                    value={OtName}
                    style={useStyles.textfield} 
                    {...register('OperationTheatreId', { required: true,minLength: 2})}
                />
                    {errors.OperationTheatreId && errors.OperationTheatreId.type === "required" && <p style={useStyles.errortext}>OT Name is required.</p>}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's Ward" 
                    variant="outlined" 
                    value={WardName}
                    disabled
                    style={useStyles.textfield} 
                    // {...register('Ward', { required: true,minLength: 2})}
                />
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        label="Date "
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
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                        label="Start time"
                        style={useStyles.textfield} 
                        value={TimeStart}
                        onChange={(newDate) => {
                            setTimeStart(newDate)
                        }}
                        renderInput={(params) => 
                            <TextField {...params} 
                                {...register('sTime')}
                            />}
                        />
                    {errors.sTime && errors.sTime.type === "required" && <p style={useStyles.errortext}>Start time is required.</p>}
                </LocalizationProvider>
            </Grid>

            <Grid md={3} style={useStyles.root}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                    label="End time"
                    style={useStyles.textfield} 
                    value={TimeEnd}
                    onChange={(newDate) => {
                        setTimeEnd(newDate)
                    }}
                    renderInput={(params) => 
                        <TextField {...params} 
                            {...register('eTime')}
                        />}
                    />
                {errors.eTime && errors.eTime.type === "required" && <p style={useStyles.errortext}>End time is required.</p>}
            </LocalizationProvider>
        </Grid>
 

            <Grid md={3} style={useStyles.root}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Surgery Type</InputLabel>
                <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"    
                    label="Surgery Type"   
                    defaultValue=""
                    style={useStyles.textfield} 
                    {...register('SurgeryId',{ required: true})}
                >
                {
                    props.results.SurgeryType.map((data) => {
                        return (
                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                        )})
                }
                </Select>
                {errors.SurgeryId && errors.SurgeryId.type === "required" && <p style={useStyles.errortext}>Surgery Type is required.</p>}
            </FormControl>
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Doctor ID" 
                    variant="outlined" 
                    disabled
                    style={useStyles.textfield} 
                    {...register('DoctorId', { required: true,minLength: 2})}
                />
                    {errors.DoctorId && errors.DoctorId.type === "required" && <p style={useStyles.errortext}>Surgery Name is required.</p>}
                    {errors.DoctorId && errors.DoctorId.type === "minLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>


            <Grid md={3} style={useStyles.root}>
                <Controller
                    name="EmployeeIdArray"
                    control={control}
                    type="text"
                    defaultValue={[]}
                    rules={{ required: true }}
                    render={({ field:{value,onChange} })=> (
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Assistant Surgeon Name</InputLabel>
                                <Select 
                                    {...register}
                                    labelId="EmployeeIdArray"
                                    id="EmployeeIdArray"    
                                    label="Assistant Surgeon Name"   
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
                                        props.results.AbcType.map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                            )})
                                    }
                                </Select>
                        </FormControl>
                    )}
                />
                {errors.EmployeeIdArray && errors.EmployeeIdArray.type === "required" && <p style={useStyles.errortext}>A Surgery Name is required.</p>}
            </Grid>


            <Grid md={3} style={useStyles.root}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Anesthesia Type</InputLabel>
                <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"    
                    label="Anesthesia Type"  
                    defaultValue="" 
                    style={useStyles.textfield} 
                    {...register('AnaesthesiaTypeId',{ required: true})}
                >
                {
                    props.results.AnaesthesiaType.map((data) => {
                        return (
                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                        )})
                }
                </Select>
                {errors.AnaesthesiaTypeId && errors.AnaesthesiaTypeId.type === "required" && <p style={useStyles.errortext}>Anesthesia Type is required.</p>}
            </FormControl>
            </Grid>

            <Grid md={3} style={useStyles.root}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Preffered Anasthetist</InputLabel>
                <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"    
                    label="Preffered Anasthetist"   
                    defaultValue=""
                    style={useStyles.textfield} 
                    {...register('AnaesthetistId',{ required: true})}
                >
                {
                    props.results.AbcType.map((data) => {
                        return (
                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                        )})
                }
                </Select>
                {errors.AnaesthetistId && errors.AnaesthetistId.type === "required" && <p style={useStyles.errortext}>Preffered Anasthetist is required.</p>}
            </FormControl>
            </Grid>
            <Grid md={3} style={useStyles.root}>
                <Controller
                    name="DepartmentId"
                    control={control}
                    type="text"
                    defaultValue={[]}
                    rules={{ required: true }}
                    render={({ field:{value,onChange} })=> (
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Other Department Names</InputLabel>
                                <Select 
                                    {...register}
                                    labelId="DepartmentId"
                                    id="DepartmentId"    
                                    label="Other Department Names"   
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
                                        props.results.AbcType.map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                            )})
                                    }
                                </Select>
                        </FormControl>
                    )}
                />
                {errors.DepartmentId && errors.DepartmentId.type === "required" && <p style={useStyles.errortext}>Other Department Names is required.</p>}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <Controller
                    name="OdEmployeeIdArray"
                    control={control}
                    type="text"
                    defaultValue={[]}
                    rules={{ required: true }}
                    render={({ field:{value,onChange} })=> (
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Other Department Surgen Names</InputLabel>
                                <Select 
                                    {...register}
                                    labelId="OdEmployeeIdArray"
                                    id="OdEmployeeIdArray"    
                                    label="Other Department Surgen Names"   
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
                                        props.results.AbcType.map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                            )})
                                    }
                                </Select>
                        </FormControl>
                    )}
                />
                {errors.OdEmployeeIdArray && errors.OdEmployeeIdArray.type === "required" && <p style={useStyles.errortext}>Other Department Surgen Names is required.</p>}
            </Grid>



            <Grid md={3} style={useStyles.root}>
                <Controller
                    name="EquipmentsIdArray"
                    control={control}
                    type="text"
                    defaultValue={[]}
                    rules={{ required: true }}
                    render={({ field:{value,onChange} })=> (
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Special Equipment</InputLabel>
                                <Select 
                                    {...register}
                                    labelId="EquipmentsIdArray"
                                    id="EquipmentsIdArray"    
                                    label="Special Equipment"   
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
                                        props.results.AbcType.map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                            )})
                                    }
                                </Select>
                        </FormControl>
                    )}
                />
                {errors.EquipmentsIdArray && errors.EquipmentsIdArray.type === "required" && <p style={useStyles.errortext}>Special Equipment is required.</p>}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Instructions for Nurses" 
                    variant="outlined" 
                    defaultValue=""
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('InstructionToNurse', { required: true,maxLength: 1000})}
                />
                    {errors.InstructionToNurse && errors.InstructionToNurse.type === "required" && <p style={useStyles.errortext}>Instructions is required.</p>}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Instructions for anaesthetist" 
                    variant="outlined" 
                    defaultValue=""
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('InstructionToAnaesthetist', { required: true,maxLength: 1000})}
                />
                    {errors.InstructionToAnaesthetist && errors.InstructionToAnaesthetist.type === "required" && <p style={useStyles.errortext}>Instructions is required.</p>}

            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Instructions for OT Person" 
                    variant="outlined" 
                    defaultValue=""
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('InstructionToOperationTeatrePersons', { required: true,maxLength: 1000})}
                />
                    {errors.InstructionToOperationTeatrePersons && errors.InstructionToOperationTeatrePersons.type === "required" && <p style={useStyles.errortext}>Instructions is required.</p>}
                    {errors.InstructionToOperationTeatrePersons && errors.InstructionToOperationTeatrePersons.type === "maxLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Special Material Requests" 
                    variant="outlined" 
                    defaultValue=""
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('RequestForSpecialMeterial', { required: true,maxLength: 1000})}
                />
                    {errors.RequestForSpecialMeterial && errors.RequestForSpecialMeterial.type === "maxLength" && (<p style={useStyles.errortext}>Your name must be at least 2 characters.</p>)}
            </Grid>

        </Grid>
        <button type="submit" >Submit</button>
        </form>

    )
}

export default BookingRegistrationForm;



// <Grid md={3} style={useStyles.root}>
// <Controller
//     name="od_a_surgery_Name"
//     control={control}
//     type="text"
//     defaultValue={[]}
//     rules={{ required: true }}
//     render={({ field:{value,onChange} })=> (
//         <FormControl fullWidth>
//             <InputLabel id="demo-multiple-name-label">Other Department A.Surgen Names</InputLabel>
//                 <Select 
//                     {...register}
//                     labelId="od_a_surgery_Name"
//                     id="od_a_surgery_Name"    
//                     label="Other Department A.Surgen Names"   
//                     multiple
//                     defaultValue={[]}
//                     style={useStyles.textfield} 
//                     onChange={(e)=>{
//                         let newData = SelectChange(e);
//                         onChange(newData)
//                     }}
//                     // MenuProps={MenuProps}
                    
//                 >
//                     {
//                         SurgeryType.map((data) => {
//                             return(
//                                 <MenuItem key={data.id} value={data.value}>{data.label}</MenuItem>
//                             )    
//                         })
//                     }
//                 </Select>
//         </FormControl>
//     )}
// />
// {errors.od_surgenName && errors.od_surgenName.type === "required" && <p style={useStyles.errortext}>Other Department A.Surgen Names is required.</p>}
// </Grid>

