const BASE_URL= "https://localhost:5001";

export const ConstantURL = {
  BASE_URL                          : "https://localhost:5001",
  GetAll                            : BASE_URL+"/api/Master/get-masters/",
  GetSurgeryList                    : BASE_URL+"/api/Master/get-surgery-list/",
  GetOtherDepartmentSurgeons        : BASE_URL+"/api/Master/get-employees/",
  GetEvents                         : BASE_URL+"/api/Booking/get-events/",
  GetAllocation                     : BASE_URL+"/api/Master/get-allocation",
  GetEventsAndAllocations           : BASE_URL+"/api/Booking/get-events-and-allocation",
  GetAllocatedOperationTheatres     : BASE_URL+"/api/Booking/get-allocatedTheatres",
  GetToday                          : BASE_URL+"/api/Master/get-today/",
  DeleteEvents                      : BASE_URL+"/api/Booking/delete-booking/",
}
// https://localhost:5001
// /api/Booking/get-events?operationTheatreId=1&fromDate=01%2F01%2F01&toDate=01%2F01%2F2023
// https://localhost:5001/api/Booking/delete-booking