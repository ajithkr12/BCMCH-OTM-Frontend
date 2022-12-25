import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import Button from '@mui/material/Button';

import Header from '../components/Header';

import EventContainer from '../layouts/EventContainer';

const Home = () => {


  let { uhid, name } = useParams();

  

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

