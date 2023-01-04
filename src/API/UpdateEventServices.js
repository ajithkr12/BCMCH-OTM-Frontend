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
