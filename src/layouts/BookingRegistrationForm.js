import React,{useState,useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Divider, Grid,List,ListItem,TextField} from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {PostBookingData,GetSurgeryList} from '../services/UserServices';
import Autocomplete from '@mui/material/Autocomplete';
import {SurgeryType,SurgeonName} from "../data/Data"

import { ContextConsumer } from '../Utils/Context';

const BookingRegistrationForm = (props) => {

    ////////////////////////////////////////
    const PatientName="Hari Devan";
    const WardName="B21";
    const OtName="OT1";
    ///////////////////////////////////////

    const {startTime, otherData }=props.dataToForm;

    console.log("dataToForm booking: ", startTime)

    // dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    // const startDateTime = new Date( startTime ).toISOString();
    const startDateTime = new Date( startTime );
    
    let day     = startDateTime.getDate();
    let month   = startDateTime.getMonth()+1;
    let year    = startDateTime.getFullYear();
    var dateSelected = day+"/"+month+"/"+year;
    
    var startTimeSelected =  startDateTime.getTime();
    const endTimeSelected = startTimeSelected + (30 * 60 * 1000);

    const navigate = useNavigate();

    const {setBookingFormOpen } = useContext(ContextConsumer);

    const OnCancel = ()=>{
        setBookingFormOpen(false)
    }
    
    // style START
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
    // style END




    // console.log("register====",register)


    const [dateSelector, setDateSelector] = useState(dateSelected);
    const [TimeStart, setTimeStart] = useState(startTimeSelected);
    const [TimeEnd, setTimeEnd] = useState(endTimeSelected);
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('a');
    const [page,setPage] = useState('1');
    const [dummy,setDummy] = useState({});
    // console.log(dummy);


    const [state, setState] = useState({
        loading:false,
        results:{},
        errorMessage:'',
    });

    const onSubmit =  async(data) => {
        data.EmployeeIdArray=[...data.OdEmployeeIdArray,...data.EmployeeIdArray]
        navigate("/");
      };
    
      const SelectChange = (e)=>{
        console.log("typing >>>>>>>>> ",e)
        return e.target?.value;
      }


      const loadMoreResults = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        console.log("page number",nextPage)
    
      };
      
      const handleScroll = (event) => {
        const listboxNode = event.currentTarget;
        const position = listboxNode.scrollTop + listboxNode.clientHeight;
        console.log(listboxNode.scrollHeight - position);
        if (listboxNode.scrollHeight - position <= 1) {
          loadMoreResults();
        }
      };


      useEffect(() => {
      },[inputValue])




    let { results}=state;

    //   console.log("inner side",results)
    //   console.log ("outer side",props.results)

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

        <Grid container>



            {/* UHID Field START */}
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
            {/* UHID Field END */}








            {/* Patient Name Field START */}
            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Patient's Name" 
                    variant="outlined" 
                    value={PatientName}
                    disabled
                    style={useStyles.textfield} 
                    {...register('Name', { required: true,minLength: 2})}
                />
            </Grid>
            {/* Patient Name Field END */}





            {/* OT ID Field START */}
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
            {/* OT ID Field END */}




            {/* Patient Ward Field START */}
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
            {/* Patient Ward Field END */}





            
            {/* Select Date Picker START */}
            <Grid md={3} style={useStyles.root}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                        label="Date "
                        inputFormat="MM/DD/YYYY"
                        style={useStyles.textfield} 
                        value={dateSelector}
                        onChange={(newDate) => {
                            setDateSelector(newDate)
                        }}
                        renderInput={(params) => 
                            <TextField {...params} 
                                {...register('bDate')}
                            />}
                        />
                    {errors.bDate && errors.bDate.type === "required" && <p style={useStyles.errortext}>Date is required.</p>}
                </LocalizationProvider>
            </Grid>
            {/* Select Date Picker END*/}





            {/* Start Time Picker START */}
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
            {/* Start Time Picker END */}



            
            {/* End Time Picker START */}
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
            {/* End Time Picker END */}

 



            {/* Surgery Type Selector START */}
            <Grid md={3} style={useStyles.root}>
                <Autocomplete
                    // ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
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
                    renderInput={
                                    (params) => (
                                                    <TextField 
                                                        {...params}  
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            type: 'search',
                                                        }}

                                                        {...register('SurgeryId',{ required: true})}
                                                        label="Surgery Type" />
                                                )
                                }

                    ListboxProps={{
                        onScroll: handleScroll,
                        style: { maxHeight: 200, overflow: 'auto' }
                    }}
                />
                {errors.SurgeryId && errors.SurgeryId.type === "required" && <p style={useStyles.errortext}>Surgery Type is required.</p>}
            </Grid>
            {/* Surgery Type Selector END */}







            {/* Doctor ID Field START */}
            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Doctor ID" 
                    variant="outlined" 
                    disabled
                    style={useStyles.textfield} 
                    {...register('DoctorId', { required: true})}
                />
                    {errors.DoctorId && errors.DoctorId.type === "required" && <p style={useStyles.errortext}>Doctor Id is required.</p>}
            </Grid>
            {/* Doctor ID Field END */}







            {/* Employee name selector START */}
            <Grid md={3} style={useStyles.root}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={value}
                    options={SurgeonName}
                    style={useStyles.textfield}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={
                                    (value) => (
                                                    <TextField 
                                                        {...value}  
                                                        InputProps={{
                                                            ...value.InputProps,
                                                            type: 'search',
                                                        }}

                                                        {...register('SurgeonId',{ required: true})}
                                                        label="Surgeon List" />
                                                )
                                }

                    ListboxProps={{
                        onScroll: handleScroll
                    }}
                />
                {errors.SurgeonId && errors.SurgeonId.type === "required" && <p style={useStyles.errortext}>surgeon is required.</p>}
            </Grid>
            {/* <Grid md={3} style={useStyles.root}>
                <Controller
                    name="EmployeeIdArray"
                    control={control}
                    type="text"
                    defaultValue={[]}
                    rules={{ required: true }}
                    render={({ field:{value,onChange} })=> (
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Add. Surgeon Name</InputLabel>
                                <Select 
                                    {...register}
                                    labelId="EmployeeIdArray"
                                    id="EmployeeIdArray"    
                                    label="Additional Surgeon Name"   
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
                                        SurgeonName.map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                            )})
                                    }
                                </Select>
                        </FormControl>
                    )}
                />
                {errors.EmployeeIdArray && errors.EmployeeIdArray.type === "required" && <p style={useStyles.errortext}>A Name is required.</p>}
            </Grid> */}
            {/* Employee name selector END */}










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
                    // props.results.AnaesthesiaType.map((data) => {
                    //     return (
                    //         <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                    //     )
                    // })
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
                    // props.results.AbcType.map((data) => {
                    //     return (
                    //         <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                    //     )})
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
                                        setDummy(newData)

                                    }}
                                    // MenuProps={MenuProps}
                                    
                                >
                                    {
                                        // props.results.AbcType.map((data) => {
                                        //     return (
                                        //         <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        //     )})
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
                                        // props.results.AbcType.map((data) => {
                                        //     return (
                                        //         <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        //     )
                                        // })
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
                                        // props.results.AbcType.map((data) => {
                                        //     return (
                                        //         <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        //     )
                                        // })
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
                    {...register('InstructionToNurse', { required: true})}
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
            </Grid>

            <Grid md={3} style={useStyles.root}>
                <TextField 
                    label="Special Material Requests" 
                    variant="outlined" 
                    defaultValue=""
                    multiline
                    maxRows={4}
                    style={useStyles.textfield} 
                    {...register('RequestForSpecialMeterial')}
                />
            </Grid>


        </Grid> 
        
        <Divider/>

        <Grid style={{display:'flex', align:"right"}}> 
        <Grid style={{ flexGrow: 1 }} item></Grid>                                    
            <Grid style={{align:"right"}} item>
                <Button onClick={ () => OnCancel()}>Cancel</Button>
                <Button type='submit' >Submit</Button>              
            </Grid>
        </Grid>
        
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




            // <Grid md={3} style={useStyles.root}>
            // <FormControl fullWidth>
            //     <InputLabel id="demo-simple-select-label">Surgery Type</InputLabel>
            //     <Select 
            //         labelId="demo-simple-select-label"
            //         id="demo-simple-select"    
            //         label="Surgery Type"   
            //         defaultValue=""
            //         style={useStyles.textfield} 
            //         {...register('SurgeryId',{ required: true})}
            //     >
            //     {
            //         props.results.SurgeryType.map((data) => {
            //             return (
            //                 <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
            //             )})
            //     }
            //     </Select>
            //     {errors.SurgeryId && errors.SurgeryId.type === "required" && <p style={useStyles.errortext}>Surgery Type is required.</p>}
            // </FormControl>
            // </Grid>

