import React, { useState, useEffect, useContext } from "react";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

import { Colors } from "../../Constants/Colors";

const TableHeader = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  return (
    <TableHead
      style={{ backgroundColor: Colors.SecondaryBlue, color: "white" }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </TableCell>

        <TableCell padding="checkbox"></TableCell>

        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          Patient's UHID
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          Patient's Name
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          Surgeon's Name
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          Surgery's Name
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          Date
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          Start Time
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          End Time
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          PAC Status
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          Admit Status
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 800 }}>
          Ready Status
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
