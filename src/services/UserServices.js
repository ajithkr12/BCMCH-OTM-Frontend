import axios from "axios";
import React from "react";
const API_URL = "http://localhost:3333";

  

export const PostBookingData=async (payload)=>{

  try {
    console.log("data sentomo")
    await axios.post(API_URL+'/events',payload); 
    // alert("Post created!");
    return null;
    
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

export const GetSelectList=async ( )=>{

  try {
    const response =  await axios.get(API_URL+"/others");
    console.log('get all data 2')
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

