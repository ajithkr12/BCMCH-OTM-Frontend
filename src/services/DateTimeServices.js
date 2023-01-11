

export const JsDatetimeToSQLDate = (_datetime) => {
    var startDay =("0" + (_datetime.getDate())).slice(-2)
    var startMonth =("0" + (_datetime.getMonth()+1)).slice(-2)
    var startYear = _datetime.getFullYear();
    var startDate =startYear + "-"+ startMonth + "-"  + startDay;
    return startDate;
}

export const GetTimeFromJsDateTime = (_datetime) =>{
    return _datetime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
}
