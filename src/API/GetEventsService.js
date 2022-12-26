import axios from "axios";
import { ConstantURL } from "../Constants/ConstantURL";


export const GetEvents = async (_operationTheatreId, _fromDate, _toDate ) =>{
    try {
        const response =  await axios.get(
            ConstantURL.GetEvents, 
            {
                params:{
                    operationTheatreId: _operationTheatreId,
                    fromDate: _fromDate,
                    toDate: _toDate
                }
            },
            {'Content-Type': 'application/json', 'Accept':"*/*"}
            );
        if(response.data.success===false){
            throw new Error(response.data.response);
        }
        return response.data.data;
    } 
    catch (error) {
        const _error =
            (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString();
        console.log('error vannu : ',_error);  
    }
    finally {
        console.log("The Promise is settled, meaning it has been resolved or rejected.");
    }   
}

export const GetAllocation = async (_departmentId, _fromDate, _toDate ) =>{
    console.log("here")
    // 'https://localhost:5001/api/Master/get-Allocation
    // ?departmentId=1&startDate=1%2F1%2F2020&endDate=1%2F1%2F2023' 
    try {
        const response =  await axios.get(
            ConstantURL.GetAllocation, 
            {
                params:{
                    departmentId: _departmentId,
                    startDate: _fromDate,
                    endDate: _toDate
                }
            },
            {'Content-Type': 'application/json', 'Accept':"*/*"}
            );
        if(response.data.success===false){
            throw new Error(response.data.response);
        }
        return response.data.data;
    } 
    catch (error) {
        const _error =
            (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString();
        console.log('error vannu : ',_error);  
    }
    finally {
        console.log("The Promise is settled, meaning it has been resolved or rejected.");
    }   
}


// operationTheatreId=1&fromDate=01%2F01%2F01&toDate=01%2F01%2F2023