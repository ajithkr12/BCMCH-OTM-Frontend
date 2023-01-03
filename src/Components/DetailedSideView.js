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
  <Typography paragraph>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
  enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
  imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
  Convallis convallis tellus id interdum velit laoreet id donec ultrices.
  Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
  adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
  nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
  leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
  feugiat vivamus at augue. At augue eget arcu dictum varius duis at
  consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
  sapien faucibus et molestie ac.
</Typography>
<Typography paragraph>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
Convallis convallis tellus id interdum velit laoreet id donec ultrices.
Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
feugiat vivamus at augue. At augue eget arcu dictum varius duis at
consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
sapien faucibus et molestie ac.
</Typography>

  </Drawer>
  )
}

export default DetailedSideView