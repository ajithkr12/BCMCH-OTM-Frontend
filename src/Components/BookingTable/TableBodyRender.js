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
import Dots from "../Dots";

import { JsDatetimeToSQLDate,GetTimeFromJsDateTime } from "../../services/DateTimeServices";
const TableBodyRender = (props) => {
    
    const {events,
        DeleteClick,
        EditClick,
        handleMarkClick,
        OpenDetailedClick ,
        isSelected,
    } = props;


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFFFFF",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#D7E9B9",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableBody>
              {events.map((event, index) => {
                const isItemSelected = isSelected(event.event_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow
                    hover
                    // onClick={(event) => handleMarkClick(event, event.uhid)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={event.event_id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <IconButton onClick={() => DeleteClick(event)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell padding="checkbox">
                      <IconButton onClick={() => EditClick(event)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={() => handleMarkClick(event)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>

                    {/* patientRegistrationNo START */}
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="event"
                      padding="none"
                      align="center"
                      onClick={(e) =>
                        OpenDetailedClick(e, event.event_id)
                      }
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      {event.patientRegistrationNo}
                    </TableCell>
                    {/* patientRegistrationNo END */}

                    {/* patientName START */}
                    <TableCell align="center">{event.patientName}</TableCell>
                    {/* patientName END */}
                    
                    {/* Surgeon Name Section START  */}
                    <TableCell align="center">
                      {event.bookedByDoctorFirstName !== null ? (
                        event.bookedByDoctorFirstName +
                        " " +
                        event.bookedByDoctorMiddleName +
                        " " +
                        event.bookedByDoctorLastName
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    {/* Surgeon Name Section START  */}

                    {/* Surgery Name START */}
                    <TableCell align="center">{event.surgeryPrintName}</TableCell>
                    {/* Surgery Name END */}



                    {/* date START*/}
                    <TableCell align="center">
                      {JsDatetimeToSQLDate(event.start)}
                    </TableCell>
                    {/* date END*/}

                    {/* Start Time START */}
                    <TableCell align="center">
                      {GetTimeFromJsDateTime(event.start)}
                    </TableCell>
                    {/* Start Time END */}

                    {/* End Time START */}
                    <TableCell align="center">
                      {GetTimeFromJsDateTime(event.end)}
                    </TableCell>
                    {/* End Time END */}

                    <TableCell align="center">
                      <Dots />
                    </TableCell>
                    <TableCell align="center">
                      <Dots />
                    </TableCell>
                    <TableCell align="center">
                      <Dots />
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
  )
}

export default TableBodyRender
