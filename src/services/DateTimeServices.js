

export const JsDatetimeToSQLDatetTme = (_datetime) => {
    var startDay =("0" + (_datetime.getDate())).slice(-2)
    var startMonth =("0" + (_datetime.getMonth()+1)).slice(-2)
    var startYear = _datetime.getFullYear();
    var startDate =startYear + "-"+ startMonth + "-"  + startDay;
    return startDate;
}



export const DateOnly = (_datetime) =>{
    var Day =("0" + (_datetime.getDate())).slice(-2)
    var Month =("0" + (_datetime.getMonth())).slice(-2)
    var Year = _datetime.getFullYear();
    var Date =Year + "-"+ Month + "-"  + Day;
    return Date
}