import React,{useState} from 'react'
import Button from '@mui/material/Button';

import BookingRegistrationForm from '../layouts/BookingRegistrationForm';
import PopUp from '../layouts/PopUp';

const Home = () => {
    const BtnStyle={backgroundColor:'#874563'}

    const [open,setOpen] =useState(false);

    const handleClickOpen =()=>{
        setOpen(true)
    }

  return (
    <div>
        <Button variant="contained" onClick={handleClickOpen} style={BtnStyle}>Click</Button>
        <PopUp openPopUp={open} setOpen={setOpen}>
            <BookingRegistrationForm/>
        </PopUp>
  </div>
  )
}

export default Home