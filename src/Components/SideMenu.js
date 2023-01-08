import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ContextConsumer } from '../Utils/Context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
const drawerWidth = 220;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SideMenu = (props) => {
  const theme = useTheme();
  const {open,setOpen} =props;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { megaMenu } =useContext(ContextConsumer);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {/* Load megamenu only if it is loaded  */}
      {/* Megamenu list section START */}
      {megaMenu.loaded && (
        <List>
          {megaMenu.list.map((item, index) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                
                {/* <Link to="/" > */}
                  <ListItemText primary={item.name} />
                {/* </Link> */}

              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      {/*Megamenu list section END */}
    </Drawer>
  );
}
export default SideMenu;
// <DrawerHeader>
// <IconButton onClick={handleDrawerClose}>
//   {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
// </IconButton>
// </DrawerHeader>
