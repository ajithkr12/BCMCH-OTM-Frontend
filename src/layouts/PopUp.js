import { Button, Dialog,DialogTitle,Typography,DialogContent,DialogActions} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import BookingRegistrationForm from './BookingRegistrationForm';
import React, { useState, useEffect, useContext } from 'react';

import { ContextConsumer } from '../Utils/Context';

const PopUp = (props) => {
    // const {dataToForm,otherData}=props;



    const DialogTitleStyle={
        display:'flex',
        // align:'flex-end'
    }

    const {bookingFormOpen , setBookingFormOpen } = useContext(ContextConsumer);

    const OnCancel = ()=>{
        setBookingFormOpen(false)
    }

    
    return (
        <Dialog open={bookingFormOpen} maxWidth="xxl">

            <DialogTitle style={DialogTitleStyle}  >
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    Enter the Operation Booking Details
                </Typography>

                <CloseIcon  onClick={() =>OnCancel()} />
                
            </DialogTitle>
            
            <DialogContent dividers >
                <BookingRegistrationForm dataToForm={props.dataToForm}  />
            </DialogContent>

            <DialogActions>
                <Button onClick={ () => OnCancel()}>Cancel</Button>
                <Button type='submit' >Submit</Button>              
          </DialogActions>

        </Dialog>
    )
}

export default PopUp