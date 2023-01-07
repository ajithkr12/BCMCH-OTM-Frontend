import axios from "axios";
import { ConstantURL } from "../Constants/ConstantURL";

export const DeleteEvents = async (_IdArray) => {
  var IdStr = _IdArray.toString();
  console.log(IdStr)
  try {
    const response = await axios.delete(
      ConstantURL.DeleteEvents,
      {
        params: {
           IdArray: IdStr,
        },
      },
      { "Content-Type": "application/json", Accept: "*/*" }
    );
    if (response.data.success === false) {
      throw new Error("Backend Error : ",response.data.response);
    }
    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("Fetch Error : ", _error);
    return [];
  } finally {
  }
};


export const SaveEvent = async (_event) =>{
  console.log("data here : ", _event)
  try {
    const response = await axios.post(
      ConstantURL.AddEvent,
      {
        AnaesthesiaTypeId: _event.AnaesthesiaTypeId,
        AnaesthetistId:_event.AnaesthetistId,
        DepartmentId:_event.DepartmentId,
        DoctorId: parseInt(_event.DoctorId),
        Duration:_event.Duration,
        EmployeeIdArray:_event.EmployeeIdArray,
        EndDate:_event.EndDate,
        EquipmentsIdArray:_event.EquipmentsIdArray,
        InstructionToAnaesthetist:_event.InstructionToAnaesthetist,
        InstructionToNurse:_event.InstructionToNurse,
        InstructionToOperationTeatrePersons:_event.InstructionToOperationTeatrePersons,
        OperationTheatreId:_event.OperationTheatreId,
        RegistrationNo:_event.RegistrationNo,
        RequestForSpecialMeterial:_event.RequestForSpecialMeterial,
        StartDate:_event.StartDate,
        StatusId:_event.StatusId,
        SurgeryId:_event.SurgeryId,
        Type:_event.Type
      },
      {  headers: {"Content-Type": "application/json", Accept: "*/*" }}
    );
    if (response.data.success === false) {
      throw new Error("Backend Error : ",response.data.response);
    }
    console.log("saved")
    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("post Error : ", _error);
    return [];
  } finally {
  }
}

