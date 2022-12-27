import React, { useState, useEffect, useContext } from "react";

import { Scheduler } from "@aldabil/react-scheduler";
// import PopUpForm from '../pages/PopUpForm';
import PopUp from "./PopUp";
import BookingRegistrationForm from "./BookingRegistrationForm";

import { ContextConsumer } from "../Utils/Context";
import { GetAllocation, GetEvents } from "../API/GetEventsService";

const EventContainer = (props) => {
  let { uhid, EpId } = props;
  const [loading, setLoading] = useState(true);
  const [isEventEditor, setIsEventEditor] = useState(false);

  const [events, setEvents] = useState([]);
  const [allocation, setAllocation] = useState([]);

  const { bookingFormOpen, setBookingFormOpen } = useContext(ContextConsumer);

  // const InconomingData = {
  //                 Patientid:"1234",
  //                 SurgeonId:"546",
  //                 DepartmentId:"546",
  //               };

  const [dataToForm, setdataToForm] = useState({});

  const EventDataFormatter = async (eventsFetchedFromDb) => {
    try {
      var reformattedArray = await eventsFetchedFromDb.map(
        ({ event_id, startDate, endDate, ...props }) => ({
          ["title"]: "event " + event_id,
          ["start"]: new Date(startDate),
          ["end"]: new Date(endDate),
          ...props,
        })
      );
      // console.log("reformattedArray : ", reformattedArray);
      return reformattedArray;
    } catch (error) {
      console.log("errror thrown : ", error )
    }
  };



  const IsAllocated = (_allocations, _startTimeToCheck, _endTimeToCheck) => {
    var _allocationStatus = false;

    _allocations.map((_allocation)=>{
      var _allocationStartDate  = new Date (_allocation.startDate);
      var _allocationEndDate    = new Date (_allocation.endDate);
      var _startDateTimeToCheck = new Date (_startTimeToCheck);
      var _endDateTimeToCheck   = new Date (_endTimeToCheck);
      
      
      if( (_startDateTimeToCheck >= _allocationStartDate)  )
      {
        if(_startDateTimeToCheck <= _allocationEndDate){
          if(_endDateTimeToCheck <= _allocationEndDate){
            _allocationStatus = true;
          }
        }
      }
      
      
    })
    return _allocationStatus;
  };

  const CellStatusCheck = (allocation, start,end)=>{
    var _isallocatedStatus = IsAllocated(allocation, start, end)
    
    var _style ={};
    _style.height= "100%";
    

    if(!_isallocatedStatus){
      _style.background ="#cccc";
      _style.cursor ="not-allowed";
      return {_style, _isallocatedStatus};
    }
    

    _style.background ="transperant";
    _style.cursor ="pointer";
    

    return {_style, _isallocatedStatus};

  }

  const EventTypeCheck = (eventType)=>{
    console.log("eventType",eventType)
    var _eventStyle ={};
    _eventStyle.height= "100%";
    _eventStyle.width= "100%";
    _eventStyle.display= "flex";
    _eventStyle.flexDirection= "column";
    _eventStyle.justifyContent= "space-between";

    if(eventType === "BOOKED"){
      _eventStyle.background= "green";
      return {_eventStyle};
    }
    else if(eventType === "BLOCKED"){
      _eventStyle.background= "red";
      return {_eventStyle};
    }
    _eventStyle.background= "blue";
    return { _eventStyle};

  }


  const LoadEvents = async () => {
    const _events = await GetEvents(1, "01/01/2022", "01/01/2023");
    var _eventsformatted = await EventDataFormatter(_events);

    const _allocation = await GetAllocation(1, "01/01/2022", "01/01/2023");
    
    setAllocation(_allocation);
    setEvents(_eventsformatted);
    setLoading(false);
    
    console.log("_allocation : ", _eventsformatted);
    return _eventsformatted;
  };



  useEffect(() => {
    LoadEvents();
  }, []);

  return loading ? (
    <>
      loading ..
      <Scheduler loading={true} />
    </>
  ) : (
    <>
      <Scheduler
        view="week"
        // loading={loading}
        // selectedDate={new Date("2022-12-26T10:20:30Z")}
        selectedDate={new Date()}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 0,
          startHour: 1,
          endHour: 23,
          step: 30,
          navigation: true,

          cellRenderer: ({ height, start, ...props }) => {
            var {_style,_isallocatedStatus} = CellStatusCheck(allocation, start,props.end);
            return (
              <div
                style={_style}

                onClick={(e) => {
                  if (!_isallocatedStatus) {
                    return "";
                  }
                  
                  setIsEventEditor(false);
                  setdataToForm({
                    start: start,
                    otherData: props,
                  });
                  setBookingFormOpen(true);
                }}
              ></div>
            );
          },
        }}

        eventRenderer={(event) => {
          console.log("events>>",event)
          var {_eventStyle} = EventTypeCheck(event.statusName);
          return (
            <div
              style={_eventStyle}
              onClick={() => {
                setIsEventEditor(true);
                setdataToForm(event);
                setBookingFormOpen(true);
              }}
            >
              <div>{event.title}</div>
            </div>
          );
        }}
        getRemoteEvents={LoadEvents}
        // events={events}
      />

      {bookingFormOpen && (
        <PopUp dataToForm={dataToForm} isEventEditor={isEventEditor} />
      )}
    </>
  );
};

export default EventContainer;
