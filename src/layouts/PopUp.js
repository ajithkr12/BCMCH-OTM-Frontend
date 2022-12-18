import { Button, Dialog,DialogTitle,Typography,DialogContent,DialogActions} from '@mui/material';
import BookingRegistrationForm from './BookingRegistrationForm';
import React from 'react'

const PopUp = (props) => {
    const {children}=props;
    const DialogTitleStyle={
        display:'flex',
    }

    return (
        <div>
            <DialogTitle style={DialogTitleStyle}>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    Enter the Operation Booking Details
                </Typography>
            </DialogTitle>
            <DialogContent dividers >
                <BookingRegistrationForm />
            </DialogContent>
            <DialogActions>
                <Button onClick={''}>Cancel</Button>
                <Button type='submit' >Submit</Button>              
          </DialogActions>
        </div>
    )
}

export default PopUp