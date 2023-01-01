import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import EventContainer from "../layouts/EventContainer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import BookingList from "../layouts/BookingList";
import { ContextConsumer } from "../Utils/Context";

const TabMenu = () => {
  const { allocatedOperationTheatres, masters,selectedOperationTheatre, setSelectedOperationTheatre } = useContext(ContextConsumer);

  let { uhid, name } = useParams();
  const [value, setValue] = useState("SCHEDULER");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   console.log("selectedOperationTheatre : ", selectedOperationTheatre);
  //   setSelectedOperationTheatre(selectedOperationTheatre)
  // }, [selectedOperationTheatre]);


  useEffect(() => {
    if(allocatedOperationTheatres.loaded){
      setSelectedOperationTheatre(allocatedOperationTheatres.list[0]);
    }
  }, [allocatedOperationTheatres]);

  return (
    <>
      <Grid container style={{ marginBottom: "2%" }}>
        <Grid md={10}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="SCHEDULER" label="scheduler" />
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
                style={{ height: 45, width: 200 }}
              >
                {masters.loaded &&
                  allocatedOperationTheatres.list.map((operationTheatre, key) => {
                    return (
                      <MenuItem key={key} value={operationTheatre}>
                        {
                          masters.operationTheatreList[operationTheatre - 1]
                            .name
                        }
                      </MenuItem>
                    );
                  })}
              </Select>
            )}
          </FormControl>
          {/*Operation Theatre Id Drop down on top right END*/}

        </Grid>
      </Grid>
      {value === "SCHEDULER" && <EventContainer uhid={uhid} EpId={name} />}
      {value === "SCHEDULELIST" && <BookingList />}
    </>
  );
};

export default TabMenu;
