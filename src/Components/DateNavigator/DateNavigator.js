import React, { useEffect, useState } from "react";
import { LocaleArrow } from "./LocaleArrows";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DateNavigator = (props) => {
  const { selectedDate, onChange } = props;

  const AddSevenDays = (_datetoadd, _daysToAdd) => {
    var _date = new Date(_datetoadd);
    _date.setDate(_date.getDate() + _daysToAdd);
    return _date;
  };

  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(AddSevenDays(startDate, 6));
  
  const [dates, setDates] = useState({
    selectedDate:selectedDate,
    selectedDate:AddSevenDays(startDate, 6)
  });


  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!open);

  const handlePrev = () => {
    var _newEnddDate = AddSevenDays(startDate, -1);
    var _newStartDate = AddSevenDays(_newEnddDate, -6);
    setStartDate(_newStartDate);
    setEndDate(_newEnddDate);
  };
  const handleNext = () => {
    var _newStartDate = AddSevenDays(endDate, 1);
    var _newEnddDate = AddSevenDays(_newStartDate, 6);
    setStartDate(_newStartDate);
    setEndDate(_newEnddDate);
  };
  const handleChange = (e) => {
    console.log("here :",e)
    setStartDate(AddSevenDays(e.$d, -6));
    setEndDate(e.$d);
  };

  useEffect(() => {
    onChange({ startDate, endDate });
  }, [endDate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div data-testid="date-navigator">
        <LocaleArrow type="prev" onClick={handlePrev} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            open={open}
            onClose={toggleDialog}
            value={startDate}
            onChange={handleChange}
            renderInput={(params) => (
              <Button
                ref={params.inputRef}
                style={{ padding: 4 }}
                onClick={toggleDialog}
              >
                {("0" + startDate.getDate()).slice(-2) + " "} -{" "}
                {" " + ("0" + endDate.getDate()).slice(-2)}
                {" " +
                  monthNames[endDate.getMonth()] +
                  " " +
                  endDate.getFullYear()}
              </Button>
            )}
          />
        </LocalizationProvider>
        <LocaleArrow type="next" onClick={handleNext} />
      </div>
    </div>
  );
};

export default DateNavigator;
