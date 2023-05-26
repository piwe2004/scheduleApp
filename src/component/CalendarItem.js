import { format } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux';

const CalendarItem = ({itemDate}) => {

    const schedulsDataList = useSelector(state => state.schedule.scheduleList);
    const itemDataCnt = format(itemDate, "yyyy-MM-dd");

    console.log(schedulsDataList)
    if(schedulsDataList.length > 0){
        console.log(schedulsDataList.date)
        return (
            <li>
            </li>
        )
    }
}

export default CalendarItem
