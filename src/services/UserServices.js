import axios from "axios";

const API_URL = "http://localhost:3333";


export const GetSelectList=async ( )=>{

  try {
    const response =  await axios.get(API_URL+"/others");
    console.log('get all data 2 : ' , response )
    return response.data;
    
  } 
  catch (error) {
    const _error =
    (error.response &&
      error.response.data &&
        error.response.data.message) ||
          error.message ||
            error.toString();
    console.log('error vannu ^^^^^',_error);  
    return _error;
  }
  finally {
    console.log("The Promise is settled, meaning it has been resolved or rejected.");
  }
  
}

export const GetSurgeryList=async (  )=>{
  

  try {
    const response =  await axios.get(API_URL+"/surgeryType");

    return response.data;
    
  } 
  catch (error) {
    const _error =
    (error.response &&
      error.response.data &&
        error.response.data.message) ||
          error.message ||
            error.toString();
    console.log('error vannu',_error);  
  }
  finally {
    console.log("The Promise is settled, meaning it has been resolved or rejected.");
  }
  
}

