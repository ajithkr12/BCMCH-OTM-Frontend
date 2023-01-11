import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Menu,
  TextField,
  DialogContent,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { ContextConsumer } from "../Utils/Context";
import { GetOtherDepartmentSurgeons, GetSurgeryList } from "../API/GetMasters";
import Loader from "../Components/Loader";
import moment from "moment";
import { SaveEvent } from "../API/UpdateEventServices";
import { GetEquipmentsAndEmployeesMapping } from "../API/GetEventsService";


const BookingRegistrationForm = (props) => {
  const {
    setBookingFormOpen,
    user,
    patient,
    selectedOperationTheatre,
    masters,
  } = useContext(ContextConsumer);
  console.log("props: ", props);

  // Default Form Values START
  const OtName =
    masters.operationTheatreList[selectedOperationTheatre - 1].name;

  const { isEventEditor } = props;
  var { start, end } = props.dataToForm;

  // isEventEditor is used to know weather its an editor form
  // or booking form .
  // if it is an editor form we need to load data from that particular booking with its id
  // else we load a new form for bookig
  // we first select date from the datetime from event scheduler

  const getDateAndTime = (date) => {
    const startDate = new Date(date);
    var day= ("0" + (startDate.getDate())).slice(-2);
    var month= ("0" + (startDate.getMonth()+1)).slice(-2)
    // let day = startDate.getDate();
    // let month = startDate.getMonth() + 1;
    let year = startDate.getFullYear();
    return {
      date: month + "/" + day + "/" + year,
      startTimeSelected: startDate.getTime(),
    };
  };

  const dateSelected = getDateAndTime(start);

  // console.log("<<<<<<<dateSelected : ", dateSelected);
  // the above dateSelected contains the selected date in dd/mm/yyyy format
  // const startTimeSelected = dateSelected.startTimeSelected;
  const startTimeSelected =start
    
  
  // console.log("startTimeSelected : ",  UnixTimeToTime(startTimeSelected))
  // startTimeSelected=UnixTimeToTime(startTimeSelected)
  // the above line selects the time only from the given datetime

  let endTimeSelected;
  let surgerySelectedFromProps = { name: "" };
  let AnaesthetistFromProps = {
    employeeId:0,
    firstName:"",
    lastName:"",
    middleName:""
  }
  let AnesthesiaFromProps ={
    id: 0,
    name: ""
  };

  if (isEventEditor) {
    console.log("event editor : ", props.dataToForm);
    endTimeSelected = new Date(end);
    // loads endtime from the event

    surgerySelectedFromProps = {
      id: props.dataToForm.surgeryId,
      name: props.dataToForm.surgeryName,
      printName: props.dataToForm.surgeryPrintName,
    };
    // loads surgery from props 
    AnaesthetistFromProps={
      employeeId: props.dataToForm.anaesthetistId,
      firstName: props.dataToForm.anaesthetistFirstName,
      lastName: props.dataToForm.anaesthetistLastName,
      middleName: props.dataToForm.anaesthetistMiddleName,
    }
    // loads Anaesthetist From Props
    AnesthesiaFromProps ={
      id:  props.dataToForm.anaesthesiaTypeId,
      name:props.dataToForm.anaesthesiaType 
    }
    // loads Anesthesia From Props
    
  } else {
    // To form add 30 minutes with the starttime .
    endTimeSelected = new Date(dateSelected.startTimeSelected + 30 * 60 * 1000)
  }

  const OnCancel = () => {
    setBookingFormOpen(false);
  };

  // style START
  const useStyles = {
    root: {
      padding: "12px 6px",
    },
    textfield: {
      width: "100%",
      fontSize: "14px",
    },
    errortext: {
      color: "red",
      margin: "3px 0px",
      fontSize: "12px",
    },
  };
  // style END

  const [dateSelector, setDateSelector] = useState(dateSelected.date);
  const [TimeStart, setTimeStart] = useState(startTimeSelected);
  const [TimeEnd, setTimeEnd] = useState(endTimeSelected);
  const [value, setValue] = useState();

  const [selectedSurgery, setSelectedSurgery] = useState(
    surgerySelectedFromProps
  );

  const [inputValueAdditionalSurgeon, setInputValueAdditionalSurgeon] =
    useState();

  const [inputValueSurgery, setInputValueSurgery] = useState();

  const [page, setPage] = useState("1");

  const [defaultEquipments, setDefaultEquipments] = useState([]);
  const [defaultotherDepartments, setDefaultotherDepartments] = useState([]);

  //to hold selected surgeons from multiple select box
  const [otherDepartmentSurgeonsOptions, setOtherDepartmentSurgeonsOptions] =
    useState([]);
  const [defaultOtherDepartmentSurgeons, setDefaultOtherDepartmentSurgeons] =
    useState([]);

  // to load surgeon list of departments given
  const [loading, setLoading] = useState(false);
  const [surgeryListPage, setSurgeryListPage] = useState(1);
  const [SurgeryList, setSurgeryList] = useState([]);
  const [defaultAnaesthetist, setdefaultAnaesthetist] = useState(AnaesthetistFromProps);
  const [defaultAnesthesia, setdefaultAnesthesia] = useState(AnesthesiaFromProps);
  // const [defaultSpecialMeterial, setdefaultSpecialMeterial] = useState(AnesthesiaFromProps);
  
  const onSave = async () => {
    

    // --- START TIME END TIME PROCESSING START ---
    const TwelveHourDateAndTimeToSqlDateTime = (
      date,
      time,
      milliSecondsToadd
    ) => {
      var date_splitted = date.split("/");
      var newDate =
        date_splitted[2] + "-" + date_splitted[0] + "-" + date_splitted[1];
      var SQLTimeFormatted =
        moment(time, ["h:mm A"]).format("HH:mm") + ":00" + milliSecondsToadd;
      return newDate + "T" + SQLTimeFormatted;
    };

    console.log("Form Data : ", currentFormState);

    var startDateTime = TwelveHourDateAndTimeToSqlDateTime(
      currentFormState.bDate,
      currentFormState.startTime,
      ".500"
    );
    // always add .500 to start time
    var endDateTime = TwelveHourDateAndTimeToSqlDateTime(
      currentFormState.bDate,
      currentFormState.endTime,
      ".000"
    );
    // always add .000 to end time

    // We add .500 to the start time because we start the event at .5000 seconds after the given time ,
    // concider this senario :

    //  if we booked an event with
    // start time -  2023-01-07T07:30:00.000
    // end time   -  2023-01-07T08:00:00.000

    // and after that we have to book an event with
    // start time -  2023-01-07T08:00:00.000
    // end time   -  2023-01-07T08:30:00.000
    // the backend will first check if this sload is  isAlreadyBooked
    // and when we check the previous event is already booked at 2023-01-07T08:00:00.000
    // so we won't be able to book this schedule .
    // to solve this problem we add .500 with start and .000 to end times

    // EXPLAINING THE PROCESS
    // concider we booked an event with
    // StartDate: "2023-01-07T07:30:00.500"
    // EndDate : "2023-01-07T08:00:00.000"
    // when we want to book the next event with
    // StartDate: "2023-01-07T08:00:00.500"
    // EndDate : "2023-01-07T08:30:00.000"
    // when the db checks for the event it will not be booked between the given start and end date.
    //  because we add .500 with start date

    // --- START TIME END TIME PROCESSING END ---

    



    // --- EQUIPMENTS PROCESSING START ---
    var equipmets_id_array = [];
    if (currentFormState.EquipmentsSelect.length > 0) {
      // if currentFormState.EquipmentsSelect is modified menas added or deleted
      // then we load it from the form itself
      equipmets_id_array = currentFormState.EquipmentsSelect.map(
        (_data) => _data.id
      );
    } else {
      // if currentFormState.EquipmentsSelect is not modified
      // then we load it from the defaultEquipments
      equipmets_id_array = defaultEquipments.map((_data) => _data.id);
    }
    var strEquipmentAr = equipmets_id_array.toString();
    // after we convert it into string format from [1,2,3] to "1,2,3"
    // --- EQUIPMENTS PROCESSING END ---


    // -----


    // --- EMPLOYEE PROCESSING START ---
    var employee_id_array = [];
    if (currentFormState.otherDepartmentSurgeons.length > 0) {
      // console.log("if:")
      // if currentFormState.otherDepartmentSurgeons is modified menas added or deleted
      // then we load it from the form itself
      employee_id_array = currentFormState.otherDepartmentSurgeons.map(
        (_data) => _data.employeeId
      );
    } else {
      // console.log("else:", defaultOtherDepartmentSurgeons)
      // else currentFormState.otherDepartmentSurgeons is not modified
      // then we load it from the defaultOtherDepartmentSurgeons
      employee_id_array = defaultOtherDepartmentSurgeons.map(
        (_data) => _data.employeeId
      );
    }
    var strEmployeeIdAr = employee_id_array.toString();
    // after we convert it into string format from [1,2,3] to "1,2,3"
    // --- EMPLOYEE PROCESSING END ---



    var convertedData = {
      AnaesthetistId: currentFormState.Anaesthetist=== null ?null :currentFormState.Anaesthetist.employeeId,
      AnaesthesiaTypeId: currentFormState.Anesthesia=== null ? null:currentFormState.Anesthesia.id ,
      DepartmentId: user.departmentId,
      OperationTheatreId: selectedOperationTheatre,
      DoctorId: user.id,
      StatusId: 1,
      SurgeryId: selectedSurgery === undefined ? 0 : selectedSurgery.id,
      RegistrationNo: patient.id,
      StartDate: startDateTime,
      EndDate: endDateTime,
      Duration: 0,
      InstructionToNurse: currentFormState.InstructionToNurse,
      InstructionToAnaesthetist: currentFormState.InstructionToAnaesthetist,
      InstructionToOperationTeatrePersons: currentFormState.OTPersonInstruction,
      RequestForSpecialMeterial: currentFormState.RequestForSpecialMeterial,
      Type: "BOOKED",
      EmployeeIdArray: strEmployeeIdAr,
      EquipmentsIdArray: strEquipmentAr,
    };

    console.log("DATA : ", convertedData);

    if (isEventEditor) {
      console.log("DATA EDIT: ", convertedData);
    } else {
      await SaveEvent(convertedData);
    }
  };

  const loadMoreResults = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  // const loadMoreSurgeryList = async () => {
  //   // await setSurgeryListLoading(true);
  //   const nextPage = surgeryListPage + 1;
  //   await setSurgeryListPage(nextPage);
  //   console.log("page number  : ", nextPage);
  //   const _surgeryList = await GetSurgeryList(inputValueSurgery, nextPage, 20);

  //   // if( surgeryListLoading ===true){
  //   console.log("done");
  //   setSurgeryList(...SurgeryList, _surgeryList);
  //   setSurgeryListLoading(false);
  //   // }
  //   // setSurgeryListLoading(false);
  // };

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;
    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    console.log("scroll end: ", listboxNode.scrollHeight - position);
    if (listboxNode.scrollHeight - position <= 1) {
      loadMoreResults();
    }
  };

  // const handleScrollSurgeryList = async (event) => {
  //   const listboxNode = event.currentTarget;
  //   const position = listboxNode.scrollTop + listboxNode.clientHeight;
  //   console.log(listboxNode.scrollHeight - position);
  //   if (listboxNode.scrollHeight - position <= 1) {
  //     await loadMoreSurgeryList();
  //   }
  // };

  const FetchOtherDepartmentSurgeons = async (selectedDepartments) => {
    // console.log(
    //   "FetchOtherDepartmentSurgeons departments: ",
    //   selectedDepartments
    // );
    const _data = await GetOtherDepartmentSurgeons(
      selectedDepartments,
      1,
      10000
    );
    setOtherDepartmentSurgeonsOptions(_data);
    // console.log("FetchOtherDepartmentSurgeons : ", _data);
  };

  const FetchEquipmentsAndEmployeesMapping = async () => {
    var _data = await GetEquipmentsAndEmployeesMapping(
      props.dataToForm.event_id
    );
    console.log("GetEquipmentsAndEmployeesMapping : ", _data);
    setDefaultotherDepartments(_data.departments);
    setDefaultOtherDepartmentSurgeons(_data.surgeons);
    setDefaultEquipments(_data.equipments);
    var departmentsIdArray = await _data.departments.map((_data) => _data.id);
    await FetchOtherDepartmentSurgeons(departmentsIdArray);
  };

  useEffect(() => {
    if (isEventEditor) {
      console.log("FETCH STARTED")
      FetchEquipmentsAndEmployeesMapping();
    }
  }, []);

  const [defaultFormValues, setdefaultFormValues] = useState({
    UserId: user.id,
    UserName: user.name,
    PatientName: patient.name,
    Ward: patient.ward,
    OtName: OtName,
    bDate:dateSelected.date ,
    startTime:startTimeSelected,
    endTime:endTimeSelected,
    otherDepartmentSurgeons: defaultOtherDepartmentSurgeons,
    EquipmentsSelect: defaultEquipments,
    Anaesthetist:defaultAnaesthetist,
    Anesthesia:defaultAnesthesia,
  });
  // Default Form Values END

  //form initialization START
  const {
    register,
    control,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: defaultFormValues,
    mode: "all",
  });
  //form initialization END

  const currentFormState = watch();
  //all the form datas are saved in currentFormState

  return loading ? (
    <Loader />
  ) : (
    <>
      <DialogContent dividers>
        <form>
          <Grid container>
            {/* UHID Field START */}
            <Grid item={true} md={3} style={useStyles.root}>
              <TextField
                label="Patient's UHID"
                variant="outlined"
                defaultValue={"111"}
                style={useStyles.textfield}
                {...register("RegistrationNo", {
                  required: true,
                  minLength: 2,
                })}
              />
              {errors.RegistrationNo &&
                errors.RegistrationNo.type === "required" && (
                  <p style={useStyles.errortext}>UHID is required.</p>
                )}
              {errors.RegistrationNo &&
                errors.RegistrationNo.type === "minLength" && (
                  <p style={useStyles.errortext}>
                    Your UHID must be at 6 characters.
                  </p>
                )}
            </Grid>
            {/* UHID Field END */}

            {/* Patient Name Field START */}
            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Patient's Name"
                variant="outlined"
                value={patient.name}
                disabled
                style={useStyles.textfield}
                {...register("PatientName", { required: true, minLength: 2 })}
              />
            </Grid>
            {/* Patient Name Field END */}

            {/* OT ID Field START */}
            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="OT Name"
                variant="outlined"
                value={OtName}
                style={useStyles.textfield}
                {...register("operationTheatreId", { required: true })}
              />
              {errors.operationTheatreId &&
                errors.operationTheatreId.type === "required" && (
                  <p style={useStyles.errortext}>OT Name is required.</p>
                )}
            </Grid>
            {/* OT ID Field END */}

            {/* Patient Ward Field START */}
            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Patient's Ward"
                variant="outlined"
                value={defaultFormValues.Ward}
                disabled
                style={useStyles.textfield}
                {...register("Ward", { required: true, minLength: 2 })}
              />
            </Grid>
            {/* Patient Ward Field END */}

            {/* Select Date Picker START */}
            <Grid item md={3} style={useStyles.root}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Date "
                  inputFormat="MM/DD/YYYY"
                  style={useStyles.textfield}
                  value={dateSelector}
                  onChange={(newDate) => {
                    setDateSelector(newDate);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} {...register("bDate")} />
                  )}
                />
                {errors.bDate && errors.bDate.type === "required" && (
                  <p style={useStyles.errortext}>Date is required.</p>
                )}
              </LocalizationProvider>
            </Grid>
            {/* Select Date Picker END*/}

            {/* Start Time Picker START */}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="startTime"
                control={control}
                type="text"
                // defaultValue={[]}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                      // disable unwanted minutes START
                      // We wants minutes in 30 minute interval
                      shouldDisableTime={(timeValue, clockType) => {
                        return (
                          clockType === "minutes" &&
                          ((timeValue > 0 && timeValue < 30) ||
                            (timeValue > 30 && timeValue <= 59))
                        );
                      }}
                      // disable unwanted minutes END
                      label="Start time"
                      style={useStyles.textfield}
                      value={TimeStart}
                      onChange={(e) => {
                        // console.log(e);
                        setTimeStart(e?._d);
                        onChange(e?._d);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} {...register("startTime")} />
                      )}
                    />
                    {errors.startTime &&
                      errors.startTime.type === "required" && (
                        <p style={useStyles.errortext}>
                          Start time is required.
                        </p>
                      )}
                  </LocalizationProvider>
                )}
              />
            </Grid>
            {/* Start Time Picker END */}

            {/* End Time Picker START */}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="endTime"
                control={control}
                type="text"
                // defaultValue={[]}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <TimePicker
                        // disable unwanted minutes START
                        // We wants minutes in 30 minute interval
                        shouldDisableTime={(timeValue, clockType) => {
                          return (
                            clockType === "minutes" &&
                            ((timeValue > 0 && timeValue < 30) ||
                              (timeValue > 30 && timeValue <= 59))
                          );
                        }}
                        // disable unwanted minutes END
                        label="End time"
                        style={useStyles.textfield}
                        value={TimeEnd}
                        onChange={(e) => {
                          // console.log(e);
                          setTimeEnd(e?._d);
                          onChange(e?._d);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} {...register("endTime")} />
                        )}
                      />
                      {errors.endTime && errors.endTime.type === "required" && (
                        <p style={useStyles.errortext}>End time is required.</p>
                      )}
                    </LocalizationProvider>
                  </FormControl>
                )}
              />
            </Grid>
            {/* End Time Picker END */}

            {/* ----- */}
            {/* Surgery Type Selector START */}
            <Grid item md={3} style={useStyles.root}>
              <Autocomplete
                id="surgeryList"
                value={selectedSurgery}
                // value - holds the current selected surgery
                options={SurgeryList}
                // options - holds the surgery list
                getOptionLabel={(option) => option.name}
                // select label as name from the SurgeryList object
                style={useStyles.textfield}
                // Executed when the surgery value is selected from a list START
                onChange={(event, newValue) => {
                  setSelectedSurgery(newValue);
                }}
                // Executed when the surgery value is selected from a list END
                // Executed when we type START
                onInputChange={async (event, newInputValue) => {
                  // When a new value is typed we load the surgery list inaccordance
                  // with the input value, we load upto 50 values.
                  var _data_fetched = await GetSurgeryList(
                    newInputValue,
                    1,
                    20
                  );
                  console.log("_data_fetched inputchange : ", _data_fetched);
                  setSurgeryList(_data_fetched);
                  setInputValueSurgery(newInputValue);
                  // inputValueSurgery is used to do search in the scroll pagination
                }}
                // Executed when we type END

                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    {...register("SurgeryId", { required: true })}
                    label="Surgery Type"
                  />
                )}
                ListboxProps={{
                  onScroll: async (event) => {
                    const listboxNode = event.currentTarget;
                    const position =
                      listboxNode.scrollTop + listboxNode.clientHeight;
                    // console.log(listboxNode.scrollHeight - position);

                    if (listboxNode.scrollHeight - position <= 1) {
                      // console.log("event :", event )
                      const nextPage = surgeryListPage + 1;
                      setSurgeryListPage(nextPage);
                      console.log("<<<< NEXT PAGE>>>>");
                      console.log("page number  : ", nextPage);
                      const _surgeryList = await GetSurgeryList(
                        inputValueSurgery,
                        nextPage,
                        20
                      );
                      setSurgeryList(SurgeryList.concat(_surgeryList));
                    }
                  },
                  style: { maxHeight: 200, overflow: "auto" },
                }}
              />

              {errors.SurgeryId && errors.SurgeryId.type === "required" && (
                <p style={useStyles.errortext}>Surgery Type is required.</p>
              )}
            </Grid>
            {/* Surgery Type Selector END */}
            {/* ----- */}

            {/* Doctor ID Field START */}
            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Doctor ID"
                variant="outlined"
                style={useStyles.textfield}
                defaultValue={defaultFormValues.UserId}
                {...register("DoctorId", { required: true })}
              />
              {errors.DoctorId && errors.DoctorId.type === "required" && (
                <p style={useStyles.errortext}>Doctor Id is required.</p>
              )}
            </Grid>
            {/* Doctor ID Field END */}

            {/* Additional Surgeon selector START */}
            <Grid item md={3} style={useStyles.root}>
              <Autocomplete
                multiple
                id="AdditionalSurgeon"
                value={value}
                options={["SurgeonName1", "SurgeonName3", "SurgeonName4"]}
                style={useStyles.textfield}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValueAdditionalSurgeon}
                onInputChange={(event, newInputValue) => {
                  setInputValueAdditionalSurgeon(newInputValue);
                }}
                renderInput={(value) => (
                  <TextField
                    {...value}
                    InputProps={{
                      ...value.InputProps,
                      type: "search",
                    }}
                    {...register("SurgeonId", { required: true })}
                    label="Surgeon List"
                  />
                )}
                ListboxProps={{
                  onScroll: handleScroll,
                  style: { maxHeight: "200px" },
                }}
              />
              {errors.SurgeonId && errors.SurgeonId.type === "required" && (
                <p style={useStyles.errortext}>surgeon is required.</p>
              )}
            </Grid>
            {/* Additional Surgeon selector END */}

            {/* Anesthesia Type Selector START */}
            <Grid item md={3} style={useStyles.root}>
            <Controller
                name="Anesthesia"
                control={control}
                type="text"
                // rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <Autocomplete
                      // multiple
                      id="Anesthesia"
                      options={masters.anaesthesiaList}
                      value={defaultAnesthesia}
                      defaultValue={defaultAnesthesia}
                      getOptionLabel={(option) => option.name}
                      style={useStyles.textfield}
                      onChange={async (event, newValue) => {
                        onChange(newValue)
                        setdefaultAnesthesia(newValue);
                      }}
                      
                      renderInput={(value) => (
                        <TextField
                          {...value}
                          InputProps={{
                            ...value.InputProps,
                            type: "search",
                          }}
                          label="Anesthesia"
                        />
                      )}
                      ListboxProps={{
                        style: { maxHeight: "200px" },
                      }}
                    />
                  </FormControl>
                )}
              />
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Anesthesia Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Anesthesia Type"
                  defaultValue=""
                  style={useStyles.textfield}
                  {...register("anaesthesiaTypeId", { required: true })}
                >
                  {masters.anaesthesiaList.map((data) => {
                    return (
                      <MenuItem key={data.id} value={data.id}>
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.anaesthesiaTypeId &&
                  errors.anaesthesiaTypeId.type === "required" && (
                    <p style={useStyles.errortext}>
                      Anesthesia Type is required.
                    </p>
                  )}
              </FormControl> */}
            </Grid>
            {/* Anesthesia Type Selector END */}

            {/* Anasthetist Selector START */}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="Anaesthetist"
                control={control}
                type="text"
                // rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <Autocomplete
                    
                      // multiple
                      id="Anaesthetist"
                      options={masters.anaesthetistList}
                      value={defaultAnaesthetist}
                      defaultValue={defaultAnaesthetist}
                      getOptionLabel={(option) => {
                        option.middleName = option.middleName == null ? "" : option.middleName;
                        return option.firstName + " " + 
                        option.middleName + " " +
                        option.lastName;
                      }}
                      style={useStyles.textfield}
                      onChange={async (event, newValue) => {
                        onChange(newValue)
                        setdefaultAnaesthetist(newValue);
                      }}
                      
                      renderInput={(value) => (
                        <TextField
                          {...value}
                          InputProps={{
                            ...value.InputProps,
                            type: "search",
                          }}
                          label="Anaesthetist"
                        />
                      )}
                      ListboxProps={{
                        style: { maxHeight: "200px" },
                      }}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            {/* Anasthetist Selector END */}

            {/* Other Department Selector START*/}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="otherDepartments"
                control={control}
                type="text"
                defaultValue={[]}
                // rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <Autocomplete
                      multiple
                      id="otherDepartments"
                      options={masters.departmentsList}
                      value={defaultotherDepartments}
                      getOptionLabel={(option) => option.name}
                      style={useStyles.textfield}
                      onChange={async (event, newValue) => {
                        // console.log( "newValue :",newValue )
                        // the newvalue has all fields of the department data
                        // it includes id, name, etc
                        // we only want to store its id , so we filter out the id only
                        var departmentsIdArray = await newValue.map(
                          (_data) => _data.id
                        );
                        // so we store id only in departmentsIdArray and
                        // fetch the surgeons in accordance with that data
                        setDefaultotherDepartments(newValue);
                        await FetchOtherDepartmentSurgeons(departmentsIdArray);
                      }}
                      renderInput={(value) => (
                        <TextField
                          {...value}
                          InputProps={{
                            ...value.InputProps,
                            type: "search",
                          }}
                          {...register(
                            "otherDepartments"
                            // { required: true }
                          )}
                          label="Departments To Include"
                        />
                      )}
                      ListboxProps={{
                        onScroll: handleScroll,
                        style: { maxHeight: "200px" },
                      }}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            {/* Other Department Selector END*/}

            {/* Other department employee selector START */}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="otherDepartmentSurgeons"
                control={control}
                type="text"
                // rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <Autocomplete
                      multiple
                      id="otherDepartmentSurgeons"
                      options={otherDepartmentSurgeonsOptions}
                      value={defaultOtherDepartmentSurgeons}
                      // getOptionSelected={(option, value) => value.id === option.id}

                      getOptionLabel={(option) => {
                        option.middleName =
                          option.middleName == null ? "" : option.middleName;
                        return (
                          option.firstName +
                          " " +
                          option.middleName +
                          " " +
                          option.lastName
                        );
                      }}
                      onChange={(event, employees) => {
                        // the employees has all fields of the surgeon data
                        // it includes id, name, etc
                        // we only want to store its id , so we filter out the id only
                        console.log(employees);
                        // var surgeonIdArray = employees.map(
                        //   (_data) => _data.employeeId
                        // );
                        onChange(employees);
                        // setOtherDepartmentSurgeonsOptionsSelected(surgeonIdArray);
                        setDefaultOtherDepartmentSurgeons(employees);
                        // console.log(surgeonIdArray)
                      }}
                      style={useStyles.textfield}
                      renderInput={(value) => (
                        <TextField
                          {...value}
                          InputProps={{
                            ...value.InputProps,
                            type: "search",
                          }}
                          {...register(
                            "otherDepartmentSurgeons"
                            // { required: true }
                          )}
                          label="Surgeons To Include"
                        />
                      )}
                      ListboxProps={{
                        style: { maxHeight: "200px" },
                      }}
                    />
                  </FormControl>
                )}
              />
              {errors.otherDepartmentSurgeons &&
                errors.otherDepartmentSurgeons.type === "required" && (
                  <p style={useStyles.errortext}>
                    Other Department Surgen Names is required.
                  </p>
                )}
            </Grid>
            {/* Other department employee selector END */}

            {/* Equipments list START */}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="EquipmentsSelect"
                control={control}
                // type="text"
                // defaultValue={[]}
                // rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <Autocomplete
                      {...register("EquipmentsSelect", {
                        required: true,
                      })}
                      multiple
                      id="EquipmentsSelect"
                      value={defaultEquipments}
                      defaultValue={defaultEquipments}
                      options={masters.equipmentList}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, equipments) => {
                        onChange(equipments);
                        setDefaultEquipments(equipments);
                      }}
                      renderInput={(value) => (
                        <TextField
                          id={value.id}
                          {...value}
                          InputProps={{
                            ...value.InputProps,
                            type: "search",
                          }}
                          // {...register("EquipmentsSelect", { required: true })}
                          label="Equipments"
                        />
                      )}
                    />
                  </FormControl>
                )}
              />
              {/* {errors.EquipmentsSelect &&
                errors.EquipmentsSelect.type === "required" && (
                  <p style={useStyles.errortext}>
                    Special Equipment is required.
                  </p>
                )} */}
            </Grid>
            {/* Equipments list END */}

            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Instructions for Nurses"
                variant="outlined"
                defaultValue={
                  isEventEditor ? props.dataToForm.instructionToNurse : ""
                }
                multiline
                maxRows={4}
                style={useStyles.textfield}
                {...register("InstructionToNurse", { required: true })}
              />
              {/* {errors.InstructionToNurse && errors.InstructionToNurse.type === "required" && <p style={useStyles.errortext}>Instructions is required.</p>} */}
            </Grid>

            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Instructions for anaesthetist"
                variant="outlined"
                defaultValue={
                  isEventEditor
                    ? props.dataToForm.instructionToAnaesthetist
                    : ""
                }
                multiline
                maxRows={4}
                style={useStyles.textfield}
                {...register("InstructionToAnaesthetist", {
                  required: true,
                  maxLength: 1000,
                })}
              />
            </Grid>

            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Instructions for OT Person"
                variant="outlined"
                defaultValue={
                  isEventEditor
                    ? props.dataToForm.instructionToOperationTeatrePersons
                    : ""
                }
                multiline
                maxRows={4}
                style={useStyles.textfield}
                {...register("OTPersonInstruction", {
                  required: true,
                  maxLength: 1000,
                })}
              />
            </Grid>

            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Special Material Requests"
                variant="outlined"
                defaultValue={
                  isEventEditor ? props.dataToForm.requestForSpecialMeterial : ""
                }
                multiline
                maxRows={4}
                style={useStyles.textfield}
                {...register("RequestForSpecialMeterial")}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <Grid style={{ display: "flex", align: "right" }}>
        <Grid style={{ flexGrow: 1 }} item></Grid>
        <Grid style={{ align: "right" }} item>
          <Button
            onClick={() => OnCancel()}
            variant="outlined"
            style={{ margin: 12 }}
          >
            Cancel
          </Button>

          <Button
            onClick={() => onSave()}
            type="submit"
            variant="outlined"
            style={{ margin: 12 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BookingRegistrationForm;
