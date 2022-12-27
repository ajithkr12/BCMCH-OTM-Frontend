export const EventTypeCheck = (eventType) => {
  var _eventStyle = {};
  _eventStyle.height = "100%";
  _eventStyle.width = "100%";
  _eventStyle.display = "flex";
  _eventStyle.flexDirection = "column";
  _eventStyle.justifyContent = "space-between";

  if (eventType === "BOOKED") {
    _eventStyle.background = "green";
    return { _eventStyle };
  } else if (eventType === "BLOCKED") {
    _eventStyle.background = "red";
    return { _eventStyle };
  }
  _eventStyle.background = "blue";
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
      _style.background ="#cccc";
      _style.cursor ="not-allowed";
      return {_style, _isallocatedStatus};
    }
    

    _style.background ="transperant";
    _style.cursor ="pointer";
    

    return {_style, _isallocatedStatus};

  }