import axios from "axios";
import { ConstantURL } from "../Constants/ConstantURL";

export const GetAllMasters = async () => {
  try {
    const response = await axios.get(ConstantURL.GetAll, {
      "Content-Type": "application/json",
      Accept: "*/*",
    });

    if (response.data.success === false) {
      throw new Error(response.data.response);
    }

    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // console.log("error vannu : ", _error);
  } finally {
    // console.log(
    //   "The Promise is settled, meaning it has been resolved or rejected."
    // );
  }
};

export const GetSurgeryList = async (
  _searchKeyword = "",
  _pageNumber = 1,
  _rowsPerPage = 20
) => {
  try {
    const response = await axios.get(
      ConstantURL.GetSurgeryList,
      {
        params: {
          _pageNumber: _pageNumber,
          _rowsPerPage: _rowsPerPage,
          _searchKeyword: _searchKeyword,
        },
      },

      {
        "Content-Type": "application/json",
        Accept: "*/*",
      }
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
    return [];
  } finally {
    // console.log(
    //   "The Promise is settled, meaning it has been resolved or rejected."
    // );
  }
};

export const GetServerDateTime = async () => {
  try {
    const response = await axios.get(ConstantURL.GetToday, {
      "Content-Type": "application/json",
      Accept: "*/*",
    });

    if (response.data.success === false) {
      throw new Error("backenderror,",response.data.response);
    }
    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("Fetch Error : ", _error);
    return "";
  } finally {
    // console.log(
    //   "The Promise is settled, meaning it has been resolved or rejected."
    // );
  }
};

export const GetOtherDepartmentSurgeons = async (
  _departments = [],
  _pageNumber = 1,
  _rowsOfPage = 100
) => {
  // departments
  // pageNumber
  // rowsOfPage
  // searchKeyword

  console.log("_departments : ", _departments);
  var _departmentstringArray = "";


  // convert array to string format START
  _departments.forEach((element) => {
    _departmentstringArray += String(element) + ",";
  });
  _departmentstringArray = _departmentstringArray.substring(
    0,
    _departmentstringArray.length - 1
  );
  // convert array to string format END


  _departmentstringArray = "[" + _departmentstringArray + "]";
  console.log("departments array : ", _departmentstringArray);

  try {
    const response = await axios.get(
      ConstantURL.GetOtherDepartmentSurgeons,
      {
        params: {
          pageNumber: 1,
          rowsOfPage: 20,
          departments: _departmentstringArray,
          // searchKeyword:"%%"
        },
      },

      {
        "Content-Type": "application/json",
        Accept: "*/*",
      }
    );
    // console.log("data : ", response);

    if (response.data.success === false) {
      console.log("here");
      throw new Error(response.data.response);
    }
    return response.data.data;
  } catch (error) {
    const _error =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("error vannu : ", _error);
    return [];
  } finally {
    // console.log("The Promise is settled, meaning it has been resolved or rejected.");
  }
};
