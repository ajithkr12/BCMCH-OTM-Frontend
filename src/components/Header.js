import React ,{useState} from 'react'
import { AppBar, IconButton, Toolbar,Stack,Typography,Avatar,Box } from '@mui/material';
 import { AiOutlineMenuFold,AiOutlineMenuUnfold } from "react-icons/ai";
const Header = () => {
  
    const [open ,setOpen]= useState(false)
    const handleDrawerToggle = () => {
        setOpen(!open)
    }
    
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          {!open ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={''} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">John Doe</Typography>
      </Stack>

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header