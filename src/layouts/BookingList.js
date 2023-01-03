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

import Dots from "../Components/Dots";
import { Colors } from "../Constants/Colors";
import DateNavigator from "../Components/DateNavigator/DateNavigator";
import DetailedSideView from "../Components/DetailedSideView";
import Loader from "../Components/Loader";

import { ContextConsumer } from "../Utils/Context";
import {
  JsDatetimeToSQLDatetTme,
  GetTimeFromJsDateTime,
} from "../services/DateTimeServices";
import { GetEventsAndAllocations } from "../API/GetEventsService";
import { EventDataFormatter } from "../services/SchedulerServices";
import { GetAllocatedTheatres } from "../API/GetEventsService";


import TableHeader from "../Components/BookingTable/TableHeader";
import TableToolBar from "../Components/BookingTable/TableToolBar";

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



TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// function TableToolBar(props) {
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         ></Typography>
//       )}
//     </Toolbar>
//   );
// }

TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// MAIN FUNCTION START
export default function EnhancedTable() {
  const [selected, setSelected] = React.useState([]);
  const [openDetailed, setOpenDetailed] = React.useState(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = events.map((n) => n.uhid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const {
    bookingFormOpen,
    setBookingFormOpen,
    dbdateTimeToday,
    setAllocatedOperationTheatres,
    allocatedOperationTheatres,
    selectedOperationTheatre,
    setSelectedOperationTheatre,
  } = useContext(ContextConsumer);

  // DATA FETCH START
  const [loading, setLoading] = useState(true);
  const [isEventEditor, setIsEventEditor] = useState(false);

  const [events, setEvents] = useState([]);
  // const [allocation, setAllocation] = useState([]);

  const [schedulerStartDate, setSchedulerStartDate] = useState("");
  const [schedulerEndDate, setSchedulerEndDate] = useState("");

  // **** LOCAL FUNCTIONS START ****
  const LoadEventsAndAllocations = async () => {
    var departmentId = 1;

    const { bookings, allocations } = await GetEventsAndAllocations(
      departmentId,
      selectedOperationTheatre,
      schedulerStartDate,
      schedulerEndDate,
      setLoading
    );
    var bookingsformatted = await EventDataFormatter(bookings);
    var bookingOnly = bookingsformatted.filter(
      (e) => e.statusName === "BOOKED"
    );
    // setAllocation(allocations);
    setEvents(bookingOnly);
    console.log("bookings : ", bookingsformatted);
  };

  const FetchAllocatedOperationTheatres = async (_startDate, _endDate) => {
    var departmentId = 1;
    // setSelectedOperationTheatre(0);
    var _allocatedTheatres = await GetAllocatedTheatres(
      departmentId,
      _startDate,
      _endDate
    );
    setAllocatedOperationTheatres({
      list: _allocatedTheatres,
      loaded: true,
    });
    // set the selectedoperation theatre as the first otid of the allocated theatres array
    setSelectedOperationTheatre(_allocatedTheatres[0]??0);
    // by doing this we set the default value to the ot selector drop down
  };
  // **** LOCAL FUNCTIONS END ****

  useEffect(() => {
    if (dbdateTimeToday.loaded === true) {
      // executed only if dbdateTimeToday is fetched in the context.
      // if dbdateTimeToday the dbdateTimeToday.loaded status will be true
      // and then is set as schedulerStartDate using SchedulerStartDate
      if (schedulerStartDate === "") {
        // enters here if schedulerStartDate==="" :
        // this condition is exeutedd when the code is executed first time
        // then we loads the date of today from db and set it as scheduler startdate
        // so that the we can fetch the events and allocations from that date
        var _endDateTime = new Date(dbdateTimeToday.date);
        // converts sql date formate to js datetime
        _endDateTime.setDate(_endDateTime.getDate() + 6);
        // ADDS 6 DAYS TO TODAY - to form end date
        var _endDate = JsDatetimeToSQLDatetTme(_endDateTime);
        // converts js date time to sql date , then used to fetch data from db after

        setSchedulerStartDate(dbdateTimeToday.date);
        setSchedulerEndDate(_endDate);
      }
      if (schedulerStartDate !== "") {
        if (!allocatedOperationTheatres.loaded) {
          FetchAllocatedOperationTheatres(schedulerStartDate, schedulerEndDate);
        } else {
          if (selectedOperationTheatre != 0) {
            // console.log("EVENT LOADING");
            // console.log(schedulerStartDate, " : ", schedulerEndDate);
            // console.log(
            //   "selectedOperationTheatre : ",
            //   selectedOperationTheatre
            // );
            LoadEventsAndAllocations();
          }
           else {
            // setAllocation([]);
            setEvents([]);
          }

        }
      }
    }
  }, [dbdateTimeToday, allocatedOperationTheatres, selectedOperationTheatre]);

  useEffect(() => {
    // enters when we switch between date navigator of scheduler.
    // and fetches the allocated operation theatre in accordance with that start and end dates.
    // then it will automatically re render the Tabmenu because there is a useEffect in TabMenu.js
    if (schedulerStartDate !== "") {
      FetchAllocatedOperationTheatres(schedulerStartDate, schedulerEndDate);
    }
  }, [schedulerStartDate]);
  // DATA FETCH END




  const handleClick = (event, uhid) => {
    const selectedIndex = selected.indexOf(uhid);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uhid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const OpenDetailedClick = (event, uhid) => {
    setOpenDetailed(!openDetailed);
  };

  const EditClick = (event, uhid) => {
    console.log("edit");
  };
  const DeleteClick = (event, uhid) => {
    console.log("delete");
  };

  const isSelected = (uhid) => selected.indexOf(uhid) !== -1;

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ width: "100%" }}>
      <DetailedSideView
        openDetailed={openDetailed}
        setOpenDetailed={setOpenDetailed}
      />
      <DateNavigator
        selectedDate={new Date(schedulerStartDate)}
        onChange={(e) => {
          // console.log("e : ", e);
          var startDate = JsDatetimeToSQLDatetTme(e.startDate);
          var endDate = JsDatetimeToSQLDatetTme(e.endDate);
          setSchedulerStartDate(startDate);
          setSchedulerEndDate(endDate);
        }}
      />

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHeader
              numSelected={selected.length}
              // order={order}
              // orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={events.length}
            />
            <TableBody>
              {events.map((event, index) => {
                const isItemSelected = isSelected(event.event_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow
                    hover
                    // onClick={(event) => handleClick(event, event.uhid)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={event.event_id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <IconButton>
                        <DeleteIcon
                          onClick={(e) => DeleteClick(e, event.event_id)}
                        />
                      </IconButton>
                    </TableCell>

                    <TableCell padding="checkbox">
                      <IconButton>
                        <EditIcon
                          onClick={(e) => EditClick(e, event.event_id)}
                        />
                      </IconButton>
                    </TableCell>

                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(e) => handleClick(e, event.event_id)}
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
                    <TableCell align="center">{event.SurgeryPrintName}</TableCell>
                    {/* Surgery Name END */}



                    {/* date START*/}
                    <TableCell align="center">
                      {JsDatetimeToSQLDatetTme(event.start)}
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
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
