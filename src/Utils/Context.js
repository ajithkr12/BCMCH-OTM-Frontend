import React,{useEffect, useState, useContext} from 'react'
import { GetServerDateTime } from '../API/GetMasters';



const DataContext = React.createContext()

function  ContextProvider(props) {

    const test="data";
    const [bookingFormOpen , setBookingFormOpen ] = useState();
    const [dbdateTimeToday, setDbdateTimeToday] = useState({
        date: "",
        Time:"",
        loaded:false
    });

    const [masters,setMasters] = useState();



    const FetchDateTimeToday =async ()=>{
        var _today = await GetServerDateTime();
        var _todaySplitted = _today.split("T");
        setDbdateTimeToday({
            date : _todaySplitted[0],
            time : _todaySplitted[1],
            loaded : true
        });
    }


    useEffect(()=>{
        FetchDateTimeToday();    
    },[]);

    


    return (
        <DataContext.Provider value={{
            test,
            bookingFormOpen , setBookingFormOpen,
            dbdateTimeToday
        }}>

            {props.children}
        </DataContext.Provider>
    )

}

const ContextConsumer =DataContext  ;
export {ContextConsumer,ContextProvider}

