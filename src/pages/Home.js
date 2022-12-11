import React,{useState} from 'react'
import {useParams} from 'react-router-dom';

import Button from '@mui/material/Button';

import BookingRegistrationForm from '../layouts/BookingRegistrationForm';
import PopUp from '../layouts/PopUp';

const Home = () => {

  let { uhid, name} = useParams();

    const BtnStyle={backgroundColor:'#874563'}

    const [open,setOpen] =useState(false);

    const handleClickOpen =()=>{
        setOpen(true)
    }

  return (   
    <div>
        <Button variant="contained" onClick={handleClickOpen} style={BtnStyle}>Click</Button>
        <PopUp openPopUp={open} setOpen={setOpen}>
            <BookingRegistrationForm uhid={uhid} name={name}/>
        </PopUp>
    </div>
  )
}

export default Home