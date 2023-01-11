// const BASE_URL= "https://localhost:5001";
const BASE_URL= "http://localhost:5000";
// const BASE_URL= "http://ec2-3-82-99-136.compute-1.amazonaws.com:5001"

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
  AddEvent                          : BASE_URL+"/api/Booking/add-booking/",
  SelectEquipmentsAndEmployees      : BASE_URL+"/api/Booking/get-event-equipments-and-employees/",
}
// https://localhost:5001
// /api/Booking/get-events?operationTheatreId=1&fromDate=01%2F01%2F01&toDate=01%2F01%2F2023
// https://localhost:5001/api/Booking/delete-booking
