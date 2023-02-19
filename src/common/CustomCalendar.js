import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';

import React, { useState } from 'react'

const CustomCalendar = ({value,onChange}) => {
    return (
        <Calendar
            calendarClassName={'custom-calendar'}
            calendarTodayClassName="custom-calendar-today" 
            colorPrimary="crimson"
            value={value}
            onChange={onChange}
            shouldHighlightWeekends
        />) 
}

export default CustomCalendar