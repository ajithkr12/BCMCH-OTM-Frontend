import React, { useState, useEffect, useContext } from "react";

import { Scheduler } from "@aldabil/react-scheduler";
// import PopUpForm from '../pages/PopUpForm';
import PopUp from "./PopUp";
import Loader from "../Components/Loader";

import { ContextConsumer } from "../Utils/Context";
import { GetAllocation, GetEvents } from "../API/GetEventsService";
import {EventTypeCheck, CellStatusCheck} from "../services/SchedulerServices";

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


  const CustomEventRenderer = (_event) => {
    // renders the event 
    var {_eventStyle} = EventTypeCheck(_event.statusName);
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

  const CustomCellRenderer = ({ height, start, ...props }) => {
    // Renders a single cell in scheduler 
    var {_style,_isallocatedStatus} = CellStatusCheck(allocation, start,props.end);
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
            start: start,
            otherData: props,
          });
          setBookingFormOpen(true);
        }}
      ></div>
    );
  }





  useEffect(() => {
    LoadEvents();
  }, []);

  return loading ? (
    <Loader />
    // <>
    //   <Scheduler loading={true} />
    // </>
  ) : (
    <>
      <Scheduler
        view="week"
        selectedDate={new Date()}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 0,
          startHour: 1,
          endHour: 23,
          step: 30,
          navigation: true,

          cellRenderer:CustomCellRenderer,
        }}

        eventRenderer={CustomEventRenderer}

        // getRemoteEvents={LoadEvents}
        events={events}
      />

      {bookingFormOpen && (
        <PopUp dataToForm={dataToForm} isEventEditor={isEventEditor} />
      )}
    </>
  );
};

export default EventContainer;
