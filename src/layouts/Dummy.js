import React,{useState,useEffect} from 'react'
import {PostBookingData,GetSurgeryList} from '../services/UserServices';
import { Controller, useForm } from "react-hook-form";
import {Grid,TextField} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Autocomplete from '@mui/material/Autocomplete';
import {SurgeryType} from "../data/Data"
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Dummy = (props) => {

      ////////////////////////////////////////
      const PatientName="Hari Devan";
      const WardName="B21";
      const OtName="OT1"
      ///////////////////////////////////////
    console.log("dummy--1",props)
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
  const { register, control, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
        RegistrationNo: props.uhid,
        DoctorId: props.EpId,

    }
});

const [periodStart, setPeriodStart] = useState('11/12/2022');
const [TimeStart, setTimeStart] = useState();
const [TimeEnd, setTimeEnd] = useState();
const [value, setValue] = useState();
const [inputValue, setInputValue] = useState('a');
const [page,setPage] = useState('1');
const [dummy,setDummy] = useState({});
const [state, setState] = useState({
  loading:false,
  results:{},
  errorMessage:'',
});
console.log("dummy--2",state.results);

const onSubmit =  async(data) => {
    console.log("Post data",data)
    data.EmployeeIdArray=[...data.OdEmployeeIdArray,...data.EmployeeIdArray]
    try {
      await PostBookingData(data); 
      alert("Post created!");
      setState({
        ...state,
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
      setState({
        ...state,
        loading:false,
        errorMessage:_error
      }) ;
      // console.log('error vannu',_error);  
    }

    // navigate("/");
  };

  const SelectChange = (e)=>{
    // console.log("typing >>>>>>>>> ",e)
    return e.target?.value;
  }

  const loadMoreResults = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    // console.log("page number",nextPage)

  };
  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;
    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    // console.log(listboxNode.scrollHeight - position);
    if (listboxNode.scrollHeight - position <= 1) {
      loadMoreResults();
    }
  };


    useEffect(() => {
      const FetchData= async () => {
        try {
              const response =  await GetSurgeryList();
              setState({
                  ...state,
                  loading:false,
                  results:response,
                  errorMessage:""
              }) ;
        } 
        catch (error) {
          const _error =
          (error.response &&
            error.response.data &&
              error.response.data.message) ||
                error.message ||
                  error.toString();
              console.log("error>>>",_error)
          setState({
              ...state,
              loading:false,
              results:'',
              errorMessage:_error
          }) ;

        }
        finally {
          console.log("The END");
        }
      };
      FetchData();
    },[])

  return (
    <Grid container>
      <Grid item={true} md={3} style={useStyles.root}>
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
            
        />
      </Grid>

      <Grid md={3} style={useStyles.root}>
        <TextField 
            label="OT Name" 
            variant="outlined" 
            value={OtName}
            style={useStyles.textfield} 
            {...register('OperationTheatreId', { required: true})}
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
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={value}
            options={SurgeryType}
            style={useStyles.textfield}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}

            renderInput={(params) => <TextField {...params}  {...register('SurgeryId',{ required: true})} label="Surgery Type" />}
            ListboxProps={{
                onScroll: handleScroll
            }}
        />
        {errors.SurgeryId && errors.SurgeryId.type === "required" && <p style={useStyles.errortext}>Surgery Type is required.</p>}

      </Grid>

      <Grid md={3} style={useStyles.root}>
      <TextField 
          label="Doctor ID" 
          variant="outlined" 
          disabled
          style={useStyles.textfield} 
          {...register('DoctorId', { required: true})}
      />
          {errors.DoctorId && errors.DoctorId.type === "required" && <p style={useStyles.errortext}>Surgery Name is required.</p>}
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
    <button onClick={handleSubmit(onSubmit)}>Submit</button>
  </Grid>

  )
}

export default Dummy