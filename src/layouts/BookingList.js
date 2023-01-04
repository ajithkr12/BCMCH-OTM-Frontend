import React, { useState, useEffect, useContext } from "react";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
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
import { DeleteEvents } from "../API/UpdateEventServices";

import TableHeader from "../Components/BookingTable/TableHeader";
import TableToolBar from "../Components/BookingTable/TableToolBar";
import TableBodyRender from "../Components/BookingTable/TableBodyRender";

// Props for table START
TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  // order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  // orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
// Props for table END

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
    setSelectedOperationTheatre(_allocatedTheatres[0] ?? 0);
    // by doing this we set the default value to the ot selector drop down
  };
  // **** LOCAL FUNCTIONS END ****



  // The head of table START
  const TableHeaderArray = [
    "Patient's UHID",
    "Patient",
    "Surgeon",
    "Surgery",
    "Date",
    "Start Time",
    "End Time",
    "PAC Status",
    "Admit Status",
    "Ready Status",
  ];
  // The head of table END




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
          if (selectedOperationTheatre !== 0) {
            // console.log("EVENT LOADING");
            // console.log(schedulerStartDate, " : ", schedulerEndDate);
            // console.log(
            //   "selectedOperationTheatre : ",
            //   selectedOperationTheatre
            // );
            LoadEventsAndAllocations();
          } else {
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



  // Table Handlers START
  const handleMarkClick = (event) => {
    // console.log("handleMarkClick : ", event)
    // console.log("handleMarkClick : ", event_id)
    const event_id = event.event_id;
    const selectedIndex = selected.indexOf(event_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, event_id);
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
    console.log("newSelected : ",newSelected)
  };

  const OpenDetailedClick = (event) => {
    setOpenDetailed(!openDetailed);
  };
  const EditClick = (event) => {
    console.log("edit : ", event);
  };
  const DeleteClick = async (event) => {
    console.log("delete : ",event);
    var selectedArray = [event.event_id];

    await DeleteEvents(selectedArray);
    await LoadEventsAndAllocations();
  };

  const isSelected = (event_id) => {
    return selected.indexOf(event_id) !== -1
  };
  const deleteButtonClick =async () =>{
    console.log("Main Delete : ",selected)
    await DeleteEvents(selected);
    await LoadEventsAndAllocations();
  }
  // Table Handlers END





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
              TableHeaderArray={TableHeaderArray}
              numSelected={selected.length}
              deleteButtonClick={deleteButtonClick}
              // order={order}
              // orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={events.length}
            />

            <TableBodyRender
              events={events}
              DeleteClick={DeleteClick}
              EditClick={EditClick}
              handleMarkClick={handleMarkClick}
              OpenDetailedClick={OpenDetailedClick}
              isSelected={isSelected}
            />

          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
