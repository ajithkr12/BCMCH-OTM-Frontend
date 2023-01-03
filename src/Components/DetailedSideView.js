import React from 'react'
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { styled, useTheme } from '@mui/material/styles';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  justifyContent: 'flex-start',
}));


const DetailedSideView = (props) => {
    const drawerWidth=600;
    const {openDetailed,setOpenDetailed}=props;
    const handleDrawerClose = () => {
      setOpenDetailed(!openDetailed);
    };

    return (
    <Drawer
    sx={{
      
      width: drawerWidth,
      flexShrink: 0,
      
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        marginTop:"60px",
        padding:"20px"
      },
    }}
    variant="persistent"
    anchor="right"
    open={openDetailed}
  >
  <DrawerHeader>
  <IconButton onClick={handleDrawerClose}>
    <ClearOutlinedIcon /> 
  </IconButton>
  </DrawerHeader>
  <Typography >Patient's UHID:AGTRW14644</Typography>
  <Typography >Patient's Name:Hari Shander</Typography>
  <Typography >Patient's Ward:1</Typography>
  <Typography >Patient's PhoneNumber:+91 9497086676</Typography>
  <Typography >Surgery's Name:dfgfgfh</Typography>
  <Typography >Surgeon's Name:Alex</Typography>
  <Typography >Surgery's Date&Time : 12/01/2023-1:00pm-5:00pm</Typography>
  <Typography >Anesthesia Type:hfhgghgg</Typography>
  <Typography >Instructions for Nurse:afd g gyftr gytryr gytrytrt fytr5e gftv ftrdrdrt</Typography>
  <Typography >Instructions:dds dfds drse drre dreswe uytyt</Typography>
  </Drawer>
  )
}

export default DetailedSideView