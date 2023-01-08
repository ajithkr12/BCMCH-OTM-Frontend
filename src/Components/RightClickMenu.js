// import { Dialog, ListItem, ListItemIcon, Menu, MenuItem, MenuList, Paper } from '@mui/material';
// import React from 'react'

import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import { Dialog } from "@mui/material";

const RightClickMenu = (props) => {
  const { rightClickPosition, setRightClick, rightClick } = props;
  console.log(props);

  return (
    <Dialog
      open={rightClick}
      style={{
        top: rightClickPosition.y - 90,
        left: rightClickPosition.x - 100,
        width: 200,
        height: 300,
      }}
      BackdropProps={{ style: { backgroundColor: "transparent" } }}
      onClose={(event, reason) => {
        if (reason === "backdropClick") {
          setRightClick(false);
        }
      }}
    >
      <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Dialog>
  );
};

export default RightClickMenu;
