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

const EventContainer = (props) => {
  let { uhid, EpId } = props;
  const [loading, setLoading] = useState(true);
  const [isEventEditor, setIsEventEditor] = useState(false);

  const [events, setEvents] = useState([]);
  const [allocation, setAllocation] = useState([]);

  const { bookingFormOpen, setBookingFormOpen, dbdateTimeToday } =
    useContext(ContextConsumer);

  // const InconomingData = {
  //                 Patientid:"1234",
  //                 SurgeonId:"546",
  //                 DepartmentId:"546",
  //               };
  // console.log("date: ",new Date("02-02-2022"))

  const [dataToForm, setdataToForm] = useState({});
  const [schedulerStartDate, setSchedulerStartDate] = useState("");
  const [schedulerEndDate, setSchedulerEndDate] = useState("2023-01-02");


  const LoadEventsAndAllocations = async () => {
    var opThetreid = 1;
    const { bookings, allocations } = await GetEventsAndAllocations(
                                            opThetreid,
                                            schedulerStartDate,
                                            schedulerEndDate,
                                            setLoading
                                          );

    // console.log("schedulerStartDate : ", schedulerStartDate)
    // console.log("schedulerEndDate : ", schedulerEndDate)
    var bookingsformatted = await EventDataFormatter(bookings);
    setAllocation(allocations);
    setEvents(bookingsformatted);
    console.log("bookings : ", bookings);
    console.log("allocations : ", allocations);
    return bookingsformatted;
  };



  const CustomEventRenderer = (_event) => {
    // renders the event
    // console.log("event : ", _event)
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
  };



  const CustomCellRenderer = (props) => {
    // Renders a single cell in scheduler
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




  
  useEffect(() => {
    // executes whenever there is a change in schedulerStartDate, dbdateTimeToday
    // console.log("dbdatetime : ", dbdateTimeToday);

    if (dbdateTimeToday.loaded === true) {
      // executed only if dbdateTimeToday is fetched in the context. 
      // if dbdateTimeToday the dbdateTimeToday.loaded status will be true 
      // and then is set as schedulerStartDate using SchedulerStartDate
      if(schedulerStartDate===""){
        setSchedulerStartDate(dbdateTimeToday.date);
      }
      if(schedulerStartDate!=""){
        LoadEventsAndAllocations();
      }
      // fetches the events and allocations
    }

  }, [schedulerStartDate, dbdateTimeToday ]);





  return loading ? (
    <Loader />
  ) : (
    <>
      <Scheduler
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
          endHour: 23,
          step: 30,
          navigation: true,
          cellRenderer: CustomCellRenderer,
        }}
        
        eventRenderer={(event) => CustomEventRenderer(event)}

        getRemoteEvents={(e) => {
          // this will be called when we press the event date switcher on the top 
          console.log(e);
          var startDate = JsDatetimeToSQLDatetTme(e.start);
          // console.log("startDate : ",startDate)
          var endDate = JsDatetimeToSQLDatetTme(e.end);
          // console.log("endDate : ",endDate)
          setSchedulerStartDate(startDate);
          setSchedulerEndDate(endDate);
        }}
        events={events}
        // navigationPickerProps={{
        //   views: ["week"]
          
        // }}
        translations = {{
          navigation: {
          today: false,
          month: false,
          week: false,
          day: false
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
