import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

import EventContainer from '../layouts/EventContainer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Grid} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BookingList from '../layouts/BookingList'

const TabMenu = () => {

  let { uhid, name } = useParams();
  const [value, setValue] = useState('one');
  const [OperationTheatreId, setOperationTheatreId] = useState('');

  const handleChangeOT = (event) => {
    setOperationTheatreId(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    
    <>
        <Grid  container style={{marginBottom:'2%'}}>
          <Grid  md={10}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="scheduler" />
              <Tab value="two" label="Booking List" />
            </Tabs>
          </Grid>
          <Grid  md={2}>
          <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={OperationTheatreId}
            onChange={handleChangeOT}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
          </Grid>
        </Grid>   
        {value === "one" && <EventContainer uhid={uhid} EpId={name} />}
        {value === "two" && <BookingList />} 
    </>  

  )
}

export default TabMenu
