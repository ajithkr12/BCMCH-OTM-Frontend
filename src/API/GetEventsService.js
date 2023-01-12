import axios from "axios";
import { ConstantURL } from "../Constants/ConstantURL";

export const GetEvents = async (_operationTheatreId, _fromDate, _toDate) => {
  try {
    const response = await axios.get(
      ConstantURL.GetEvents,
      {
        params: {
          operationTheatreId: _operationTheatreId,
          fromDate: _fromDate,
          toDate: _toDate,
        },
      },
      { "Content-Type": "application/json", Accept: "*/*" }
    );
    if (response.data.success === false) {
      throw new Error(response.data.response);
    }
    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("error vannu : ", _error);
  } finally {
  }
};

export const GetEquipmentsAndEmployeesMapping = async (_bookingId) => {
  // used to fetch multiple select mappings using bookingId
  try {
    const response = await axios.get(
      ConstantURL.SelectEquipmentsAndEmployees,
      {
        params: {
          bookingId:_bookingId
        },
      },
      { "Content-Type": "application/json", Accept: "*/*" }
    );
    if (response.data.success === false) {
      throw new Error("backend : ",response.data.response);
    }
    // console.log("GetEquipmentsAndEmployeesMapping : ",response.data.data)
    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("error GetEquipmentsAndEmployeesMapping : ", _error);
  } finally {
  }
};

export const GetAllocation = async (_departmentId, _fromDate, _toDate) => {
  try {
    const response = await axios.get(
      ConstantURL.GetAllocation,
      {
        params: {
          departmentId: _departmentId,
          startDate: _fromDate,
          endDate: _toDate,
        },
      },
      { "Content-Type": "application/json", Accept: "*/*" }
    );
    if (response.data.success === false) {
      throw new Error("backend :",response.data.response);
    }
    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("error : ", _error);
  } finally {
    // console.log(
    //   "The Promise is settled, meaning it has been resolved or rejected."
    // );
  }
};

export const GetEventsAndAllocations = async ( _departmentId, _operationTheatreId, _fromDate, _toDate,setLoading) => {
  
  _fromDate +="T00:00:00.000";
  _toDate   +="T23:59:00.000";
  // console.log("GetEventsAndAllocations _operationTheatreId : ",_operationTheatreId);
  // console.log("GetEventsAndAllocations _fromDate : ",_fromDate);
  // console.log("GetEventsAndAllocations  _toDate : ", _toDate);
  setLoading(true);
  try {
    const response = await axios.get(
      ConstantURL.GetEventsAndAllocations,
      {
        params: {
          departmentId: _departmentId,
          operationTheatreId: _operationTheatreId,
          fromDate: _fromDate,
          toDate: _toDate,
        },
      },
      { "Content-Type": "application/json", Accept: "*/*" }
    );
    if (response.data.success === false) {
      throw new Error(response.data.response);
    }
    // console.log(" GetEventsAndAllocations response : " ,response.data.data)
    return {
      bookings: response.data.data.bookings,
      allocations: response.data.data.allocations,
    };
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("error in GetEventsAndAllocations() : ", _error);
  } finally {
    // console.log(
    //   "The Promise is settled, meaning it has been resolved or rejected."
    // );
    setLoading(false);
  }
};



export const GetAllocatedTheatres = async ( _departmentId, _fromDate, _toDate) => {
  
  _fromDate +="T00:00:00.000";
  _toDate   +="T00:00:00.000";

  
  // console.log("GetAllocatedTheatres start : ",_fromDate)
  // console.log("GetAllocatedTheatres end : ",_toDate )
  try {
    const response = await axios.get(
      ConstantURL.GetAllocatedOperationTheatres,
      {
        params: {
          departmentId: _departmentId,
          fromDate: _fromDate,
          toDate: _toDate,
        },
      },
      { "Content-Type": "application/json", Accept: "*/*" }
    );
    if (response.data.success === false) {
      throw new Error(response.data.response);
    }
    // console.log("GetAllocatedTheatres response.data : ",response.data.data )
    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("error in GetAllocatedTheatres() : ", _error);
  } finally {
    
  }
};
