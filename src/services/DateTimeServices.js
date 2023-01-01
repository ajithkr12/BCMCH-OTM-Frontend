

export const JsDatetimeToSQLDatetTme = (_datetime) => {
    var startDay =("0" + (_datetime.getDate())).slice(-2)
    var startMonth =("0" + (_datetime.getMonth()+1)).slice(-2)
    var startYear = _datetime.getFullYear();
    var startDate =startYear + "-"+ startMonth + "-"  + startDay;
    return startDate;
}



export const DateOnly = (_datetime) =>{
    var startDay =("0" + (_datetime.getDate())).slice(-2)
    // if(startDay.length===1){
    //     startDay= "0"+String(startDay);
    // }
    var startMonth =("0" + (_datetime.getMonth())).slice(-2)
    // var startMonth = _datetime.getMonth() + 1;
    // if(startMonth.length===1){
    //     startMonth= "0"+String(startMonth);
    // }
    var startYear = _datetime.getFullYear();
    var startDate =startYear + "-"+ startMonth + "-"  + startDay;
    return startDate
}