import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'
import qs from 'qs';
import { ConstantURL } from '../Constants/ConstantURL';


const DataContext = React.createContext()

function  ContextProvider(props) {

    const test="data";

    const [bookingFormOpen , setBookingFormOpen ] = useState();




    


    return (
        <DataContext.Provider value={{
            test,
            bookingFormOpen , setBookingFormOpen 
        }}>

            {props.children}
        </DataContext.Provider>
    )

}

const ContextConsumer =DataContext  ;
export {ContextConsumer,ContextProvider}

