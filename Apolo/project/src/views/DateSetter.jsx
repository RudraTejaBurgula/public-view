import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Calender, { YearView } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
function DateSetter(props) {
    const [startDate, setStartDate] = React.useState(new Date());
    //const date = new Date()
    var res = [4,5]//defaultDays.filter( function(n) { return !this.has(n) }, new Set(props.days) );
    //const mm = new Date().getDate()
    const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+14);
    //console.log(mm)
    const d = 'date.getDay()===1'
    return (
        <Calender onChange={setStartDate} value={startDate}
        minDate={new Date()}
        maxDate={maxDate}
        defaultView={"month"}
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        tileDisabled={({activeStartDate, date, view }) => {
            
        } }
        />
        //tileDisabled={([2,3].map((val)=>({activeStartDate, date, view }) => date.getDay() === val))}/>
        // <DatePicker
        //     required
        //     selected={startDate}
        //     onChange={(date) => setStartDate(date)}
        //     filterDate={isWeekday}
        //     placeholderText="Select a weekday"
        //     minDate={new Date() - 1}
        // />
    );
}

export default DateSetter