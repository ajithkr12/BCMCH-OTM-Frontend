import React, { useState, useEffect, useContext } from "react";

import { Scheduler } from "@aldabil/react-scheduler";
// import PopUpForm from '../pages/PopUpForm';
import PopUp from "./PopUp";
import Loader from "../Components/Loader";

import { ContextConsumer } from "../Utils/Context";
import {
  GetAllocation,
  GetEvents,
  GetEventsAndAllocations,
} from "../API/GetEventsService";
import {
  EventTypeCheck,
  CellStatusCheck,
  EventDataFormatter,
} from "../services/SchedulerServices";
import {
  JsDatetimeToSQLDatetTme,
  DateOnly,
} from "../services/DateTimeServices";
import { MenuItem, Select } from "@mui/material";

const EventContainer = (props) => {
  let { uhid, EpId } = props;
  const [loading, setLoading] = useState(true);
  const [isEventEditor, setIsEventEditor] = useState(false);

  const [events, setEvents] = useState([]);
  const [allocation, setAllocation] = useState([]);

  const { bookingFormOpen, setBookingFormOpen, dbdateTimeToday,setAllocatedOperationTheatres,operationTheatreIdTab,setOperationTheatreIdTab } = useContext(ContextConsumer);
  console.log('from Event Container',operationTheatreIdTab);
  // const InconomingData = {
  //                 Patientid:"1234",
  //                 SurgeonId:"546",
  //                 DepartmentId:"546",
  //               };
  // console.log("date: ",new Date("02-02-2022"))

  const [dataToForm, setdataToForm] = useState({});
  const [schedulerStartDate, setSchedulerStartDate] = useState("");
  const [schedulerEndDate, setSchedulerEndDate] = useState("");

  const LoadEventsAndAllocations = async () => {
    var departmentId = 1;

    const { bookings, allocations,allocatedOperationTheatres } = await GetEventsAndAllocations(
                                            departmentId,
                                            schedulerStartDate,
                                            schedulerEndDate,
                                            setLoading
                                          );
    var bookingsformatted = await EventDataFormatter(bookings);

    setAllocatedOperationTheatres(allocatedOperationTheatres);
    setAllocation(allocations);
    setEvents(bookingsformatted);
    console.log("bookings : ", bookings);
    console.log("allocations : ", allocations);
    console.log("allocatedOperationTheatres : ", allocatedOperationTheatres);
    
    return bookingsformatted;
  };


  const CustomEventRenderer = (_event) => {
    // renders the event
    // console.log("event : ", _event)
    if(_event.operationTheatreId === operationTheatreIdTab){
      console.log("event poda@@@ : ", _event)
      var { _eventStyle } = EventTypeCheck(_event.statusName);
      return (
     
            <div
            style={_eventStyle}
            onClick={() => {
              setIsEventEditor(true);
              setdataToForm(_event);
              setBookingFormOpen(true);
            }}
          >
            <div>{_event.title}</div>
            
          </div>
     
      );
    }
    else{
      return (
        <div>
        </div>
      )
    }

  };

  const AllocationDataFilter = allocation.filter(allocation => {
    // console.log("filter data")
    return allocation.operationTheatreId === operationTheatreIdTab;
  });

  const CustomCellRenderer = (props) => {
    // Renders a single cell in scheduler
    const allocationData = AllocationDataFilter;
    // console.log("filter data..",allocationData)
    var { _style, _isallocatedStatus } = CellStatusCheck(
      // allocation,
      allocationData,
      props.start,
      props.end
    );
    // The above function returns the style of a cell in accordance with its allocation table
    // if is allocacted then the mouse pointer will be clickable and also the background is white
    // else the mouse pointer is not clickable and background will be a disabled color
    return (
      <div
        style={_style}
        onClick={(e) => {
          if (!_isallocatedStatus) {
            return "";
          }
          setIsEventEditor(false);
          setdataToForm({
            props
            // start: props.start,
            // otherData: props,
          });
          setBookingFormOpen(true);
        }}
      ></div>
    );
  };




  
  useEffect(() => {
    // executes whenever there is a change in schedulerStartDate, dbdateTimeToday
    if (dbdateTimeToday.loaded === true) 
    {
      // executed only if dbdateTimeToday is fetched in the context. 
      // if dbdateTimeToday the dbdateTimeToday.loaded status will be true 
      // and then is set as schedulerStartDate using SchedulerStartDate 
      if(schedulerStartDate==="")
      {
        // enters here if schedulerStartDate==="" :
        // this condition is exeutedd when the code is executed first time 
        // then we loads the date of today from db and set it as scheduler startdate 
        // so that the we can fetch the events and allocations from that date  
        var _endDateTime = new Date(dbdateTimeToday.date);
        // converts sql date formate to js datetime 
        _endDateTime.setDate(_endDateTime.getDate() + 6) 
        // ADDS 6 DAYS TO TODAY - to form end date
        var _endDate = JsDatetimeToSQLDatetTme(_endDateTime);
        // converts js date time to sql date , then used to fetch data from db after

        setSchedulerStartDate(dbdateTimeToday.date);
        setSchedulerEndDate(_endDate);
        
      }
      if(schedulerStartDate!="")
      {
        LoadEventsAndAllocations();
      }
      // fetches the events and allocations
    }

  }, [schedulerStartDate, dbdateTimeToday ]);



  return loading ? (
    <Loader />
  ) : 
  (
    <>

{/*  */}
      {/* <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={OperationTheatreId}
        // onChange={handleChangeOT}
        style={{height:45,width:200, alignContent:"right", alignSelf:"right"}}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select> */}
{/*  */}
    
      <Scheduler
        loading={loading}
        view="week"
        navigationPickerProps={{navigation:{month:false}}}
        selectedDate={new Date(schedulerStartDate)}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: new Date(schedulerStartDate).getDay(), 
          // weekStartOn defines wihich day we want to show as scheduler start day
          // if weekStartOn=0 then calendar will start on sunday 
          // loads the week day number from schedulerstartdate 
          // new Date(schedulerStartDate).getDay() will return the weekend count 
          startHour: 1,
          endHour: 17,
          step: 30,
          navigation: true,
          cellRenderer: CustomCellRenderer,
        }}
        
        eventRenderer={(event) => CustomEventRenderer(event)}
      
        getRemoteEvents={(e) => {
          // this will be called when we press the event date switcher on the top 
          // console.log(e);
          var startDate = JsDatetimeToSQLDatetTme(e.start);
          // console.log("startDate : ",startDate)
          var endDate = JsDatetimeToSQLDatetTme(e.end);
          // console.log("endDate : ",endDate)
          setSchedulerStartDate(startDate);
          setSchedulerEndDate(endDate);
        }}
        events={events}
        
        // to disable right top menu to switch between views
        // currently it is set to "" but we need to find a way to disable that 
        translations = {{
          navigation: {
          today: "",
          month: "",
          week: "",
          day: ""
          }
        }}
      />

      {bookingFormOpen && (
        <PopUp dataToForm={dataToForm} isEventEditor={isEventEditor} />
      )}
    </>
  );
};

export default EventContainer;
