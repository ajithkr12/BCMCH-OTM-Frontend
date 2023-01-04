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
import {
  GetAllMasters,
  GetOtherDepartmentSurgeons,
  GetSurgeryList,
} from "../API/GetMasters";
import Loader from "../Components/Loader";

const BookingRegistrationForm = (props) => {
  console.log("props: ", props);

  ////////////// - DEFAULT FORM VALUES - /////////////////////////

  const PatientName = "Hari Devan"; // todo - set values from scheduler
  const WardName = "B21";
  const OtName = "OT1";
  const defaultFormValuesForRegistrationForm = {
    PatientName: PatientName,
    Ward: WardName,
    OtName: OtName,
  };
  ///////////////////////////////////////
  const { start } = props.dataToForm?.props;
  const { isEventEditor } = props;
  // isEventEditor is used to know weather its an editor form
  // or booking form .
  // if it is an editor form we need to load data from that particular booking with its id
  // else we load a new form for bookig
  // we first select date from the datetime from event scheduler
  const getDateAndTime = (date) => {
    const startDate = new Date(date);
    let day = startDate.getDate();
    let month = startDate.getMonth() + 1;
    let year = startDate.getFullYear();
    return {
      date: month + "/" + day + "/" + year,
      startTimeSelected: startDate.getTime(),
    };
  };

  const dateSelected = getDateAndTime(start);

  console.log("<<<<<<<dateSelected : ", dateSelected);
  // the above dateSelected contains the selected date in dd/mm/yyyy format
  const startTimeSelected = dateSelected.startTimeSelected;
  // the above line selects the time only from the given datetime

  let endTimeSelected;

  if (isEventEditor === true) {
    console.log("event editor : ", props.dataToForm);
    endTimeSelected = new Date(props.dataToForm.end);
    // loads endtime from the
  } else {
    // To form add 30 minutes with the starttime .
    endTimeSelected = startTimeSelected + 30 * 60 * 1000;
  }

  const { setBookingFormOpen } = useContext(ContextConsumer);

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
  const [SurgeryTypeValue, setsurgeryTypeValue] = useState();
  const [inputValue, setInputValue] = useState();

  const [inputValueSurgery, setInputValueSurgery] = useState();

  const [page, setPage] = useState("1");

  const [departmentSelected, setDepartmentsSelected] = useState([]);
  // for multiple department select
  const [otherDepartmentSurgeons, setOtherDepartmentSurgeons] = useState([]);
  // for multiple department select
  const [loading, setLoading] = useState(true);
  const [surgeryListPage, setSurgeryListPage] = useState(1);
  const [surgeryListLoading, setSurgeryListLoading] = useState(false);
  const [Masters, setMasters] = useState();
  const [SurgeryList, setSurgeryList] = useState([]);

  const GetMasters = async () => {
    var _allMasters = await GetAllMasters();
    console.log("<<<<<<<<<<<<<masters : ", _allMasters);
    setMasters(_allMasters);
    setLoading(false);
  };

  //form
  const {
    register,
    control,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: defaultFormValuesForRegistrationForm,
    mode: "all",
  });

  const currentFormState = watch();

  const onSave = (data) => {
    console.log(",,,,,,,,,,,,current", currentFormState);
    // data.EmployeeIdArray = [...data.OdEmployeeIdArray, ...data.EmployeeIdArray]
    // navigate("/");
  };

  const SelectChange = (e) => {
    console.log("typing >>>>>>>>> ", e);
    return e.target?.value;
  };

  const loadMoreResults = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    console.log("page number", nextPage);
  };

  const loadMoreSurgeryList = async () => {
    // await setSurgeryListLoading(true);

    const nextPage = surgeryListPage + 1;
    await setSurgeryListPage(nextPage);
    console.log("page number  : ", nextPage);
    const _surgeryList = await GetSurgeryList(inputValueSurgery, nextPage, 20);

    // if( surgeryListLoading ===true){
    console.log("done");
    setSurgeryList(...SurgeryList, _surgeryList);
    setSurgeryListLoading(false);
    // }
    // setSurgeryListLoading(false);
  };

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;
    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    console.log(listboxNode.scrollHeight - position);
    if (listboxNode.scrollHeight - position <= 1) {
      loadMoreResults();
    }
  };

  const handleScrollSurgeryList = async (event) => {
    const listboxNode = event.currentTarget;
    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    console.log(listboxNode.scrollHeight - position);
    if (listboxNode.scrollHeight - position <= 1) {
      await loadMoreSurgeryList();
    }
  };

  const FetchOtherDepartmentSurgeons = async (selectedDepartments) => {
    const _data = await GetOtherDepartmentSurgeons(
      selectedDepartments,
      1,
      10000
    );
    setOtherDepartmentSurgeons(_data);
    console.log("FetchOtherDepartmentSurgeons : ", _data);
  };

  const filterOptions = createFilterOptions({
    stringify: (option) => option.name + option.id,
  });

  useEffect(() => {
    GetMasters();
  }, []);

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
                value={PatientName}
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
                {...register("OperationTheatreId", { required: true })}
              />
              {errors.OperationTheatreId &&
                errors.OperationTheatreId.type === "required" && (
                  <p style={useStyles.errortext}>OT Name is required.</p>
                )}
            </Grid>
            {/* OT ID Field END */}

            {/* Patient Ward Field START */}
            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Patient's Ward"
                variant="outlined"
                value={WardName}
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Start time"
                  style={useStyles.textfield}
                  value={TimeStart}
                  onChange={(newDate) => {
                    setTimeStart(newDate);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} {...register("sTime")} />
                  )}
                />
                {errors.sTime && errors.sTime.type === "required" && (
                  <p style={useStyles.errortext}>Start time is required.</p>
                )}
              </LocalizationProvider>
            </Grid>
            {/* Start Time Picker END */}

            {/* End Time Picker START */}
            <Grid item md={3} style={useStyles.root}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="End time"
                  style={useStyles.textfield}
                  value={TimeEnd}
                  onChange={(newDate) => {
                    setTimeEnd(newDate);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} {...register("eTime")} />
                  )}
                />
                {errors.eTime && errors.eTime.type === "required" && (
                  <p style={useStyles.errortext}>End time is required.</p>
                )}
              </LocalizationProvider>
            </Grid>
            {/* End Time Picker END */}

            {/* Surgery Type Selector START */}
            <Grid item md={3} style={useStyles.root}>
              <Autocomplete
                loading={surgeryListLoading}
                id="surgeryList"
                // value={SurgeryTypeValue||{name:""}}
                value={SurgeryTypeValue}
                options={SurgeryList}
                getOptionLabel={(option) => option.name}
                // defaultValue={{name:""}}

                style={useStyles.textfield}
                onChange={(event, newValue) => {
                  setsurgeryTypeValue(newValue);
                  console.log(
                    "JSON.stringify : ",
                    JSON.stringify(newValue, null, " ")
                  );
                }}
                inputValue={inputValueSurgery || ""}
                onInputChange={async (event, newInputValue) => {
                  var _data_fetched = await GetSurgeryList(
                    newInputValue,
                    1,
                    50
                  );
                  console.log("_data_fetched : ", _data_fetched);
                  setSurgeryList(_data_fetched);
                  setInputValueSurgery(newInputValue);
                  // const optionEl = document.querySelector(
                  //     `[data-name="Abdominoplasty Liposuction Level VI"]`
                  //   );
                  // optionEl?.scrollIntoView();
                }}
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
                // onOpen={() => {
                //     setTimeout(() => {
                //       const optionEl = document.querySelector(
                //         `[data-name="Adenoidectomy"]`
                //       );
                //       optionEl?.scrollIntoView();
                //     }, 1);
                // }}

                ListboxProps={{
                  onScroll: async (event) => {
                    const listboxNode = event.currentTarget;
                    const position =
                      listboxNode.scrollTop + listboxNode.clientHeight;
                    console.log(listboxNode.scrollHeight - position);

                    if (listboxNode.scrollHeight - position <= 1) {
                      const nextPage = surgeryListPage + 1;
                      await setSurgeryListPage(nextPage);
                      console.log("page number  : ", nextPage);
                      const _surgeryList = await GetSurgeryList(
                        inputValueSurgery,
                        nextPage,
                        20
                      );
                      const _data = SurgeryList.concat(_surgeryList);
                      console.log("_data : ", _data);
                      setSurgeryList(_data);

                      // const optionEl = document.querySelector(
                      //     `[name="Abdominoperineal Resection"]`
                      //   );
                      // optionEl?.scrollIntoView();
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

            {/* Doctor ID Field START */}
            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Doctor ID"
                variant="outlined"
                style={useStyles.textfield}
                {...register("DoctorId", { required: true })}
              />
              {errors.DoctorId && errors.DoctorId.type === "required" && (
                <p style={useStyles.errortext}>Doctor Id is required.</p>
              )}
            </Grid>
            {/* Doctor ID Field END */}

            {/* Employee name selector START */}
            <Grid item md={3} style={useStyles.root}>
              <Autocomplete
                disablePortal
                id="AdditionalSurgeon"
                value={value}
                options={["SurgeonName1"]}
                style={useStyles.textfield}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
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
                }}
              />
              {errors.SurgeonId && errors.SurgeonId.type === "required" && (
                <p style={useStyles.errortext}>surgeon is required.</p>
              )}
            </Grid>
            {/* Employee name selector END */}

            {/* Anesthesia Type Selector START */}
            <Grid item md={3} style={useStyles.root}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Anesthesia Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Anesthesia Type"
                  defaultValue=""
                  style={useStyles.textfield}
                  {...register("AnaesthesiaTypeId", { required: true })}
                >
                  {Masters.anaesthesiaList.map((data) => {
                    return (
                      <MenuItem key={data.id} value={data.id}>
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.AnaesthesiaTypeId &&
                  errors.AnaesthesiaTypeId.type === "required" && (
                    <p style={useStyles.errortext}>
                      Anesthesia Type is required.
                    </p>
                  )}
              </FormControl>
            </Grid>
            {/* Anesthesia Type Selector END */}

            {/* Anasthetist Selector START */}
            <Grid item md={3} style={useStyles.root}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Preffered Anasthetist
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Preffered Anasthetist"
                  defaultValue=""
                  style={useStyles.textfield}
                  {...register("AnaesthetistId", { required: true })}
                >
                  {Masters.anaesthetistList.map((data) => {
                    return (
                      <MenuItem key={data.employeeId} value={data.employeeId}>
                        {data.firstName +
                          " " +
                          data.middleName +
                          " " +
                          data.lastName}
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.AnaesthetistId &&
                  errors.AnaesthetistId.type === "required" && (
                    <p style={useStyles.errortext}>
                      Preffered Anasthetist is required.
                    </p>
                  )}
              </FormControl>
            </Grid>
            {/* Anasthetist Selector END */}

            {/* Other Department Selector START*/}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="DepartmentId"
                control={control}
                type="text"
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="other-department">
                      Other Departments
                    </InputLabel>
                    <Select
                      {...register}
                      labelId="DepartmentId"
                      id="DepartmentId"
                      label="Other Department Names"
                      multiple
                      defaultValue={[]}
                      style={useStyles.textfield}
                      MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                      onChange={async (e) => {
                        onChange(e.target?.value);
                        setDepartmentsSelected(e.target?.value);
                        console.log(
                          "setDepartmentsSelected : ",
                          departmentSelected
                        );
                        await FetchOtherDepartmentSurgeons(e.target?.value);
                      }}
                      // MenuProps={MenuProps}
                    >
                      {Masters.departmentsList.map((data) => {
                        return (
                          <MenuItem
                            key={data.departmentId}
                            value={data.departmentId}
                          >
                            {data.departmentName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            {/* Other Department Selector END*/}

            {/* Other department employee selector START */}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="OtherDepartmentEmployeeIdArray"
                control={control}
                type="text"
                defaultValue={"[]"}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Other Department Surgen Names
                    </InputLabel>
                    <Select
                      {...register}
                      labelId="OdEmployeeIdArray"
                      id="OdEmployeeIdArray"
                      label="Other Department Surgen Names"
                      multiple
                      defaultValue={[]}
                      style={useStyles.textfield}
                      onChange={(e) => {
                        onChange(e.target?.value);
                      }}
                      MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                    >
                      {otherDepartmentSurgeons.map((data) => {
                        return (
                          <MenuItem
                            key={data.employeeId}
                            value={data.employeeId}
                          >
                            {data.firstName +
                              " " +
                              data.middleName +
                              " " +
                              data.lastName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              />
              {errors.OdEmployeeIdArray &&
                errors.OdEmployeeIdArray.type === "required" && (
                  <p style={useStyles.errortext}>
                    Other Department Surgen Names is required.
                  </p>
                )}
            </Grid>
            {/* Other department employee selector END */}

            {/* Equipments list START */}
            <Grid item md={3} style={useStyles.root}>
              <Controller
                name="EquipmentsIdArray"
                control={control}
                type="text"
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Special Equipment
                    </InputLabel>
                    <Select
                      {...register}
                      labelId="EquipmentsIdArray"
                      id="EquipmentsIdArray"
                      label="Special Equipment"
                      multiple
                      defaultValue={[]}
                      style={useStyles.textfield}
                      onChange={(e) => {
                        let newData = SelectChange(e);
                        onChange(newData);
                      }}
                      // MenuProps={MenuProps}
                    >
                      {Masters.equipmentList.map((data) => {
                        return (
                          <MenuItem key={data.id} value={data.id}>
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              />
              {/* {errors.EquipmentsIdArray && errors.EquipmentsIdArray.type === "required" && <p style={useStyles.errortext}>Special Equipment is required.</p>} */}
            </Grid>
            {/* Equipments list END */}

            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Instructions for Nurses"
                variant="outlined"
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
                multiline
                maxRows={4}
                style={useStyles.textfield}
                {...register("InstructionToOperationTeatrePersons", {
                  required: true,
                  maxLength: 1000,
                })}
              />
            </Grid>

            <Grid item md={3} style={useStyles.root}>
              <TextField
                label="Special Material Requests"
                variant="outlined"
                defaultValue=""
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
