import { Button, Dialog,DialogTitle,Typography,DialogContent,DialogActions} from '@mui/material';

import React from 'react'

const PopUp = (props) => {
    const {openPopUp,setOpen,children}=props;
    const DialogTitleStyle={
        display:'flex',
    }
    return (
        <Dialog open={openPopUp} maxWidth="xxl">
            <DialogTitle style={DialogTitleStyle}>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    Enter the Operation Booking Details
                </Typography>
                <Button variant="contained" onClick={()=>{setOpen(false)}}>Close</Button>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
                <Button type='submit'>Submit</Button>
          </DialogActions>
        </Dialog>
    )
}

export default PopUp