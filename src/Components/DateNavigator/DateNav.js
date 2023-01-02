import React from "react";
import WeekDateBtn from "./WeekDateBtn";

const DateNav = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div data-testid="date-navigator">
        <WeekDateBtn props={props} />
      </div>
    </div>
  );
};

export default DateNav;
