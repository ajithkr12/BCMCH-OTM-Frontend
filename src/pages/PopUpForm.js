import React,{useState,useEffect} from 'react'
import BookingRegistrationForm from '../layouts/BookingRegistrationForm';
import PopUp from '../layouts/PopUp';
import {GetSelectList} from "../services/UserServices";
import { Button, Dialog,DialogTitle,Typography,DialogContent,DialogActions} from '@mui/material';

const PopUpForm = (props) => {
    let {uhid,EpId} = props;
   

    const [state, setState] = useState({
      loading:false,
      results:{},
      errorMessage:'',
    });
 
    const DialogTitleStyle={
      display:'flex',
  }

    useEffect(() => {

      const FetchData= async () => {
        console.log('##############')
        try {
              const response =  await GetSelectList();
              console.log("from fetch  time " ,response)
              setState({
                  ...state,
                  loading:false,
                  results:response,
                
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
        }
        finally {
          console.log("The END");
        }
      };
      FetchData();
    },[])

    let { loading,results,errorMessage}=state;
    console.log("from popupform " ,results.AnaesthesiaType)
  return (   
<div>
    <DialogTitle style={DialogTitleStyle}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Enter the Operation Booking Details
        </Typography>
    </DialogTitle>
    <DialogContent dividers >
      <BookingRegistrationForm uhid={uhid} EpId={EpId} results={results} />
    </DialogContent>
    <DialogActions>
        <Button onClick={''}>Cancel</Button>
        <Button type='submit' >Submit</Button>              
  </DialogActions>
</div>

  )
}

export default PopUpForm



// <PopUp openPopUp={openPopUp}>
// <BookingRegistrationForm uhid={uhid} EpId={EpId} results={results} />
// </PopUp>
