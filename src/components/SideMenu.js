import React ,{useState} from 'react'
import { Drawer, IconButton, Toolbar,Stack,Typography,Avatar,Box } from '@mui/material';

const SideMenu = () => {

  const container = window !== undefined ? () => window().document.body : undefined;
  const [open ,setOpen]= useState(true)
  const handleDrawerToggle = () => {
      setOpen(!open)
  }
  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">

        <Drawer
            container={container}
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
                display: { xs: 'block', lg: 'none' },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: '120px',
                    borderRight: `1px solid `,
                    backgroundImage: 'none',
                    boxShadow: 'inherit'
                }
            }}
        >
        gggi
        </Drawer>
</Box>
  )
}

export default SideMenu