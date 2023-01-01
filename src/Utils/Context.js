import React,{useEffect, useState, useContext} from 'react'
import { GetServerDateTime,GetAllMasters } from '../API/GetMasters';
import { GetEventsAndAllocations } from '../API/GetEventsService';


const DataContext = React.createContext()

function  ContextProvider(props) {

    const test="data";
    const [bookingFormOpen , setBookingFormOpen ] = useState();
    
    const [dbdateTimeToday, setDbdateTimeToday] = useState({
        date: "",
        Time:"",
        loaded:false
    });
    // used to store date time from DB

    const [masters,setMasters] = useState({
        operationTheatreList:[ {name:""} ],
        loaded:false
    });
    // used to store master tables

    const [allocatedOperationTheatres,setAllocatedOperationTheatres] = useState({
            list:[],
            loaded:false,
    });
    // used to store allocated operation theatres

    const [selectedOperationTheatre,setSelectedOperationTheatre] = useState(0);
    // used to store selected operation theatre data from the ot dropdown 


    
    // LOCAL FUNCTIONS USED IN CONTEXT ONLY START
    const FetchDateTimeToday =async ()=>{
        var _today = await GetServerDateTime();
        var _todaySplitted = _today.split("T");
        console.log("FetchDateTimeToday : ", _today);
        setDbdateTimeToday({
            date : _todaySplitted[0],
            time : _todaySplitted[1],
            loaded : true
        });
    }
    
    const FetchMasterData = async ()=>{
        var _data = await GetAllMasters();
        _data.loaded = true;
        setMasters(_data)
    }
    // FUNCTIONS USED FOR FETCHING IN CONTEXT ONLY END
    

    useEffect(()=>{
        FetchDateTimeToday();  
        FetchMasterData();  
    },[]);

    


    return (
        <DataContext.Provider value={{
            test,
            bookingFormOpen , setBookingFormOpen,
            dbdateTimeToday, 
            allocatedOperationTheatres,setAllocatedOperationTheatres,
            masters,
            selectedOperationTheatre,setSelectedOperationTheatre
            
        }}>

            {props.children}
        </DataContext.Provider>
    )

}

const ContextConsumer =DataContext  ;
export {ContextConsumer,ContextProvider}

