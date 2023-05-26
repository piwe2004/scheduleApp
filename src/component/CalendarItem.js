import { format } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux';
import schedule from './../reducers/schedule';

const CalendarItem = ({itemDate}) => {

    const schedulsDataList = useSelector(state => state.schedule.scheduleList);
    const itemDataCnt = format(itemDate, "yyyy-MM-dd");

    if(schedulsDataList.length > 0){
        return(
            schedulsDataList.map((schedule, i) => {
                // eslint-disable-next-line no-lone-blocks
                {
                    return(
                        schedule.date === itemDataCnt 
                            ? <li key={schedule.keyId}>{schedule.title}</li>
                            :''
                    )
                }
            })
        )
    }
}

export default CalendarItem
