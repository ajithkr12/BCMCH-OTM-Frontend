
export const EventDataFormatter = async (eventsFetchedFromDb) => {
  // used to format events from backend to the format of the eventscheduler 
  // in backend we get data as startdate but for the scheduler we need to give it as start
  // and also endDate from backend is treated as end in the scheduler
  // also an extra parameter title is required . 
  // So we loop through data from backend and give new fileds and edit existing fields.
  try {
    var reformattedArray = await eventsFetchedFromDb.map(
      ({ event_id, startDate, endDate, ...props }) => ({
        ["title"]: "event " + event_id,
        ["start"]: new Date(startDate),
        ["end"]: new Date(endDate),
        ...props,
      })
    );
    // console.log("reformattedArray : ", reformattedArray);
    return reformattedArray;
  } catch (error) {
    console.log("errror thrown (ScedulerServices.js EventDataFormatter) : ", error )
  }
};




export const EventTypeCheck = (eventType) => {
  var _eventStyle = {};
  _eventStyle.height = "100%";
  _eventStyle.width = "105%";
  _eventStyle.display = "flex";
  _eventStyle.flexDirection = "column";
  _eventStyle.justifyContent = "space-around";
  _eventStyle.alignItems="center";
  _eventStyle.borderRadius = "8px";
  _eventStyle.color = "black";

  if (eventType === "BOOKED") {
    _eventStyle.background = "#B6E2A1";
    return { _eventStyle };
  } else if (eventType === "BLOCKED") {
    _eventStyle.background = "#FF6464";
    _eventStyle.cursor ="not-allowed";
    return { _eventStyle };
  }
  // _eventStyle.background = "blue";
  return { _eventStyle };
};


export const IsAllocated = (_allocations, _startTimeToCheck, _endTimeToCheck) => {
    var _allocationStatus = false;

    _allocations.map((_allocation)=>{
      var _allocationStartDate  = new Date (_allocation.startDate);
      var _allocationEndDate    = new Date (_allocation.endDate);
      var _startDateTimeToCheck = new Date (_startTimeToCheck);
      var _endDateTimeToCheck   = new Date (_endTimeToCheck);
      
      
      if( (_startDateTimeToCheck >= _allocationStartDate)  )
      {
        if(_startDateTimeToCheck <= _allocationEndDate){
          if(_endDateTimeToCheck <= _allocationEndDate){
            _allocationStatus = true;
            // console.log("allocated : ", _startTimeToCheck, ":",_endTimeToCheck," , " ,_allocations)
          }
        }
      }
      
      
    })
    return _allocationStatus;
  };

  export const CellStatusCheck = (allocation, start,end)=>{
    var _isallocatedStatus = IsAllocated(allocation, start, end)
    var _style ={};
    _style.height= "100%";
    
    if(!_isallocatedStatus){
      _style.background ="#D8D9CF";
      _style.cursor ="not-allowed";
      return {_style, _isallocatedStatus};
    }
    
    _style.background ="#FFFFFF";
    _style.cursor ="pointer";
    

    return {_style, _isallocatedStatus};

  }