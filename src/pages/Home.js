import React,{useState} from 'react'
import {useParams} from 'react-router-dom';

import Button from '@mui/material/Button';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import PopUpForm from './PopUpForm';
import EventContainer from '../layouts/EventContainer';

const Home = () => {

  let {uhid,name} = useParams();

    const BtnStyle={backgroundColor:'#874563'}

    const [open,setOpen] =useState(true);

    const handleClickOpen =()=>{
        setOpen(true)
    }


  return (   
    <div>
      <Header />
      <Button variant="contained" onClick={handleClickOpen} style={BtnStyle}>Click</Button>
      <EventContainer uhid={uhid} EpId={name}/>

    </div>
  )
}

export default Home

      // <PopUpForm openPopUp={open} setOpen={setOpen} uhid={uhid} EpId={name} />
