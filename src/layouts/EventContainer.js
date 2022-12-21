import React, { useState, useEffect, useContext } from 'react'

import { Scheduler } from "@aldabil/react-scheduler";
// import PopUpForm from '../pages/PopUpForm';
import PopUp from './PopUp';
import BookingRegistrationForm from './BookingRegistrationForm';


import {GetSelectList} from "../services/UserServices";
import { ContextConsumer } from '../Utils/Context';



const date = new Date(2017, 1, 29);

const EventContainer = (props) => {
  let { uhid, EpId } = props;

  const [loading, setLoading] = useState(true);

  const {bookingFormOpen , setBookingFormOpen } = useContext(ContextConsumer);


  useEffect(() => {
  },[]);

  // const InconomingData = {
  //                 Patientid:"1234",
  //                 SurgeonId:"546",
  //                 DepartmentId:"546",
  //               };

  

  const [ dataToForm , setdataToForm] = useState({});


  return (
    <>
    
    <Scheduler
      view="week"
      selectedDate={new Date('2021-05-02T10:20:30Z')}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5, 6],
        weekStartOn: 0,
        startHour: 9,
        endHour: 17,
        step: 30,
        navigation: true,


        cellRenderer: ({ height, start, ...props }) => {

          // const time = start.getTime();

          // const blocked = false;

          const time = start.getTime();
          // console.log("time : ", time)

          // console.log("time utc : ", new Date("2021-05-02T09:30:00.000").valueOf());
          
          var blocked = time >= new Date("2021-05-02T09:30:00.000").valueOf();
          blocked &= time <= new Date("2021-05-02T10:30:00.000").valueOf();
          



          // var blocked = time >= new Date("2021-05-02T09:30:00.000").valueOf();
          // blocked &= time <= new Date("2021-05-02T10:30:00.000").valueOf();

          const restProps = blocked ? {} : props;

          return (
            <div
              style={{
                height: "100%",
                background:"transperant",
                background: blocked ? "#eee" : "transparent",
                cursor: blocked ? "not-allowed" : "pointer"
              }}

              onClick={(e) => {

                console.log("====e==== : ",e );
                
              
                if (blocked) {
                  return alert("Opss");
                }

                setBookingFormOpen(true);

                setdataToForm({
                  startTime:start,
                  otherData:props
                })
                
              }}
              disableRipple={true}
            >

            </div>
          );
        }
      }}


      events={[
        {
          event_id: 1,
          title: "Event 1",
          start: new Date("2021/5/2 09:30"),
          end: new Date("2021/5/2 10:30"),
        },
        {
          event_id: 2,
          title: "Event 2",
          start: new Date("2021/5/4 10:00"),
          end: new Date("2021/5/4 11:00"),
        },

      ]}
    />
    

      {
        bookingFormOpen &&  
        <PopUp dataToForm={dataToForm} />
      }

    </>
  )
}

export default EventContainer