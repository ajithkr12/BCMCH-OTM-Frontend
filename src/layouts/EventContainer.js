import React,{useState}from 'react'

import { Scheduler } from "@aldabil/react-scheduler";
import PopUpForm from '../pages/PopUpForm';
import PopUpFormTest from '../pages/PopUpForm.test';
// import EventView from './EventView';

const date = new Date(2017, 1, 29);

const EventContainer = (props) => {
    let {uhid, EpId} = props;

  return (
    <Scheduler
    view="week"
    selectedDate = {new Date('2021-05-02T10:20:30Z')}
    week={{
            weekDays: [0, 1, 2, 3, 4, 5,6], 
            weekStartOn: 0, 
            startHour: 9, 
            endHour: 17,
            step: 30,
            navigation: true,
            
            cellRenderer: ({ height, start, onClick, ...props }) => {
            //   console.log("props : ",props);

              const time = start.getTime();
            //   console.log("time : ", time)

            //   console.log("time utc : ", new Date("2021-05-02T09:30:00.000").valueOf());
              
              var disabled = time >= new Date("2021-05-02T09:30:00.000").valueOf();
              disabled &= time <= new Date("2021-05-02T10:30:00.000").valueOf();
              
              const restProps = disabled ? {} : props;

              return (
                <div
                  style={{
                    height: "100%",
                    background: disabled ? "#eee" : "transparent",
                    cursor: disabled ? "not-allowed" : "pointer"
                  }}
                  onClick={(e) => {
                    // console.log("====e====", e);
                    
                    if (disabled) {
                      return alert("Opss");
                    } 

                    onClick();
                  }}
                  disableRipple={disabled}
                  {...restProps}
                > 
                
                </div>
              );
            }
          }}


    // eventRenderer = { (event) =>EventView(event)}

    customEditor={
      (scheduler) => <PopUpForm uhid={uhid} EpId={EpId} scheduler={scheduler} />
    }
    
    //     customEditor={
    //   (scheduler) => <PopUpFormTest uhid={uhid} EpId={EpId} scheduler={scheduler} />
    // }

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
  )
}

export default EventContainer