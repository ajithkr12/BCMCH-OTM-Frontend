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
    // console.log(
    //   "The Promise is settled, meaning it has been resolved or rejected."
    // );
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
    // console.log(
    //   "The Promise is settled, meaning it has been resolved or rejected."
    // );
  }
};

export const GetEventsAndAllocations = async ( _operationTheatreId, _fromDate, _toDate,setLoading) => {
  
  _fromDate +="T00:00:00.000Z";
  _toDate   +="T00:00:00.000Z";

  console.log("_fromDate : ",_fromDate);
  console.log(" _toDate : ", _toDate);
  setLoading(true);
  try {
    const response = await axios.get(
      ConstantURL.GetEventsAndAllocations,
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
    console.log(response.data.data)
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
