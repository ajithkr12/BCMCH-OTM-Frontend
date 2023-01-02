import React, { useState, useEffect, useContext } from "react";

import { Scheduler } from "@aldabil/react-scheduler";
// import PopUpForm from '../pages/PopUpForm';
import PopUp from "./PopUp";
import Loader from "../Components/Loader";

import { ContextConsumer } from "../Utils/Context";
import {
  GetAllocatedTheatres,
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

  const { bookingFormOpen, setBookingFormOpen, dbdateTimeToday,setAllocatedOperationTheatres,allocatedOperationTheatres,selectedOperationTheatre, setSelectedOperationTheatre } = useContext(ContextConsumer);
 
  const [dataToForm, setdataToForm] = useState({});
  const [schedulerStartDate, setSchedulerStartDate] = useState("");
  const [schedulerEndDate, setSchedulerEndDate] = useState("");

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
    setAllocation(allocations);
    setEvents(bookingsformatted);
    console.log("bookings : ", bookings);
    console.log("allocations : ", allocations);
    // return bookingsformatted;
  };


  const CustomEventRenderer = (_event) => {
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
            <p>{_event.title}</p>    
            <p>{_event.patientRegistrationNo}</p> 
          </div>
      );
    

  };


  const CustomCellRenderer = (props) => {
    var { _style, _isallocatedStatus } = CellStatusCheck(
      allocation,
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


  
  const FetchAllocatedOperationTheatres = async(_startDate, _endDate) =>{
    var departmentId = 1;
    // setSelectedOperationTheatre(0);
    var _allocatedTheatres = await GetAllocatedTheatres(departmentId, _startDate, _endDate);
    setAllocatedOperationTheatres({
      list: _allocatedTheatres,
      loaded: true,
    });
    // set the selectedoperation theatre as the first otid of the allocated theatres array
    setSelectedOperationTheatre(_allocatedTheatres[0]);
    // by doing this we set the default value to the ot selector drop down
  }


  
  useEffect(() => {
    // executes whenever there is a change in schedulerStartDate, dbdateTimeToday
    if ((dbdateTimeToday.loaded === true)) 
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
      if(schedulerStartDate!=="") 
      {
        if(!allocatedOperationTheatres.loaded)
        {
          FetchAllocatedOperationTheatres(schedulerStartDate, schedulerEndDate);
        }
        else
        {
          if(selectedOperationTheatre!=0)
          {
            console.log("EVENT LOADING");
            console.log(schedulerStartDate," : ", schedulerEndDate);
            console.log("selectedOperationTheatre : ",selectedOperationTheatre);
            LoadEventsAndAllocations();
          } 
        }
      }
      // fetches the events and allocations
    }

  }, [ dbdateTimeToday,allocatedOperationTheatres,selectedOperationTheatre]);


  useEffect(()=>{
      // enters when we switch between date navigator of scheduler.
      // and fetches the allocated operation theatre in accordance with that start and end dates. 
      // then it will automatically re render the Tabmenu because there is a useEffect in TabMenu.js 
      if(schedulerStartDate!=="")
      {
        console.log("FetchAllocatedOperationTheatres : " , selectedOperationTheatre);
        FetchAllocatedOperationTheatres(schedulerStartDate, schedulerEndDate);
      }
  },[schedulerStartDate])




  return loading ? (
    <Loader />
  ) : 
  (
    <>

    
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
          // console.log("im here")

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
