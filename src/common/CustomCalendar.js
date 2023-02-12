import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';

import React, { useState } from 'react'

const CustomCalendar = ({className}) => {
    const [selectedDay, setSelectedDay] = useState(null);
    return (
        <Calendar
            calendarClassName={'custom-calendar'}
            calendarTodayClassName="custom-calendar-today" 
            colorPrimary="crimson"
            value={selectedDay}
            onChange={setSelectedDay}
            shouldHighlightWeekends
        />) 
}

export default CustomCalendar