import { Button, Dialog,DialogTitle,Typography,DialogContent,DialogActions} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import BookingRegistrationForm from './BookingRegistrationForm';
import React, { useState, useEffect, useContext } from 'react';

import { ContextConsumer } from '../Utils/Context';

const PopUp = (props) => {

    const DialogTitleStyle={
        display:'flex',
    }

    const {bookingFormOpen , setBookingFormOpen } = useContext(ContextConsumer);

    const OnClose = ()=>{
        setBookingFormOpen(false)
    }

    
    return (
        <Dialog open={bookingFormOpen} maxWidth="xxl">
            <DialogTitle style={DialogTitleStyle}>

                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {
                        !props.isEventEditor?
                            <>Booking Form</>
                            :
                            <>Event {props.dataToForm.event_id}</>
                    }
                </Typography>

                <CloseIcon onClick={()=>OnClose()}/>

            </DialogTitle>
            
            <DialogContent dividers >
                
                <BookingRegistrationForm 
                    dataToForm={props.dataToForm} 
                    isEventEditor={props.isEventEditor} 
                />

            </DialogContent>

        </Dialog>
    )
}

export default PopUp