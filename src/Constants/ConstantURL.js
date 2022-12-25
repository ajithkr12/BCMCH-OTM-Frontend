const BASE_URL= "https://localhost:5001";

export const ConstantURL = {
  BASE_URL: "https://localhost:5001",
  GetAll : BASE_URL+"/api/Master/get-masters/",
  GetSurgeryList : BASE_URL+"/api/Master/get-surgery-list/",
  GetOtherDepartmentSurgeons : BASE_URL+"/api/Master/get-employees/",
}

// api/Master/get-employees
// ?departments=%5B1%2C2%5D&pageNumber=1&rowsOfPage=100'
// searchKeyword=a