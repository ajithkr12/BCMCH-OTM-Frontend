import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import Button from '@mui/material/Button';

import Header from '../components/Header';

import EventContainer from '../layouts/EventContainer';

import { ContextConsumer } from '../Utils/Context';

const Home = () => {

  const contextValues = useContext(ContextConsumer);
  console.log(contextValues);

  // const contextValues = useContext(ContextConsumer);
  // console.log(contextValues)


  let { uhid, name } = useParams();

  const BtnStyle = { backgroundColor: '#874563' }

  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true)
  }


  

  return (
    <div>
      <Header />
      <Grid md={8} p={4}>
        <EventContainer uhid={uhid} EpId={name} />
      </Grid>

    </div>
  )
}

export default Home

      // <PopUpForm openPopUp={open} setOpen={setOpen} uhid={uhid} EpId={name} />
