import React,{useState,useEffect} from 'react'
import BookingRegistrationForm from '../layouts/BookingRegistrationForm';
import PopUp from '../layouts/PopUp';
import {GetSelectList} from "../services/UserServices";
import { Button, Dialog,DialogTitle,Typography,DialogContent,DialogActions,Grid,Box} from '@mui/material';

import Dummy from '../layouts/Dummy';

const PopUpForm = (props) => {
    let {uhid,EpId,scheduler} = props;
    console.log("scheduler>>>",scheduler.state.start)

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
        try {
              const response =  await GetSelectList();
              
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
    console.log("from popupform " ,results)
  return (   
      <div>
            <DialogTitle style={DialogTitleStyle}>
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                  Enter the Operation Booking Details
              </Typography>
            </DialogTitle>
            <DialogContent dividers >
              <Dummy results={results} uhid={uhid} EpId={EpId} />
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



// <DialogTitle style={DialogTitleStyle}>
// <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
//     Enter the Operation Booking Details
// </Typography>
// </DialogTitle>
// <DialogContent dividers >
// <BookingRegistrationForm uhid={uhid} EpId={EpId} results={results} />
// </DialogContent>
// <DialogActions>
// <Button onClick={''}>Cancel</Button>
// <Button type='submit' >Submit</Button>              
// </DialogActions>

