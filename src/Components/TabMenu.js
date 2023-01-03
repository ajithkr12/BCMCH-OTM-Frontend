import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import EventContainer from "../layouts/EventContainer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppBar, createMuiTheme, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import BookingList from "../layouts/BookingList";
import { ContextConsumer } from "../Utils/Context";
import { Colors } from "../Constants/Colors";

const TabMenu = () => {
  const {
    allocatedOperationTheatres,
    masters,
    selectedOperationTheatre,
    setSelectedOperationTheatre,
  } = useContext(ContextConsumer);

  let { uhid, name } = useParams();
  const [value, setValue] = useState("SCHEDULELIST");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   console.log("selectedOperationTheatre : ", selectedOperationTheatre);
  //   setSelectedOperationTheatre(selectedOperationTheatre)
  // }, [selectedOperationTheatre]);

  // useEffect(() => {
  //   if(allocatedOperationTheatres.loaded){
  //     console.log("changed here ");
  //     setSelectedOperationTheatre(allocatedOperationTheatres.list[0]);
  //   }
  // }, [allocatedOperationTheatres]);

  return (
    <div>
      <AppBar
        style={{ marginTop: "40px", background: "#ffffff" }}
        elevation={false}
      >
        <Grid
          container
          md={12}
          style={{
            marginBottom: "2%",
            paddingTop: "50px",
            paddingLeft: "250px",
            paddingRight: "20px",
          }}
        >
          <Grid md={10}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="secondary tabs example"
            >
              <Tab value="SCHEDULER" label="Scheduler" />
              <Tab value="SCHEDULELIST" label="Booking List" />
            </Tabs>
          </Grid>
          <Grid md={2}>
            {/*Operation Theatre Id Drop down on top right START*/}
            <FormControl fullWidth>
              {selectedOperationTheatre !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOperationTheatre ?? ""}
                  defaultValue={selectedOperationTheatre}
                  onChange={(event) => {
                    setSelectedOperationTheatre(event.target.value);
                  }}
                  style={{ height: 45, width: "100%" }}
                >
                  {masters.loaded &&
                    allocatedOperationTheatres.list.map(
                      (operationTheatre, key) => {
                        return (
                          <MenuItem key={key} value={operationTheatre}>
                            {
                              masters.operationTheatreList[operationTheatre - 1]
                                .name
                            }
                          </MenuItem>
                        );
                      }
                    )}
                </Select>
              )}
            </FormControl>
            {/*Operation Theatre Id Drop down on top right END*/}
          </Grid>
        </Grid>
      </AppBar>

      {value === "SCHEDULER" && (
        <div style={{ marginTop: "180px" }}>
          <EventContainer uhid={uhid} EpId={name} />
        </div>
      )}
      {value === "SCHEDULELIST" && (
        <div style={{ marginTop: "180px" }}>
          <BookingList />
        </div>
      )}
    </div>
  );
};

export default TabMenu;
