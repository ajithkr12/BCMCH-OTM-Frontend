import React, { useState } from 'react';
import { styled} from '@mui/material/styles';


import Header from '../Components/Header';
import SideMenu from '../Components/SideMenu';
import TabMenu from '../Components/TabMenu';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
      }),
      marginTop:60,
      
    }),
  );
const Home = () => {

  const [open, setOpen]=useState(false);

  return (
    <div>
      <Header open={open} setOpen={setOpen}/>
      <SideMenu open={open} setOpen={setOpen}/>
      <Main open={open}>
        <TabMenu />
      </Main>
      
    </div>
  )
}

export default Home

