import { format } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux';
import schedule from './../reducers/schedule';
import { styled } from 'styled-components';

const CalendarItem = ({currentDay, handleModal}) => {

    const schedulsDataList = useSelector(state => state.schedule.scheduleList);
    const dateDay = format(currentDay, "yyyy-MM-dd");

    if(schedulsDataList.length > 0){
        return(
            <ItemList>
                {schedulsDataList.map((schedule, i) => {
                    const itemDate = format(new Date(schedule.date), "yyyy-MM-dd");
                    // eslint-disable-next-line no-lone-blocks
                    {
                        if(i < 2 ){
                            return(
                                itemDate === dateDay  &&
                                    <li 
                                        className='calendarItem__li-items' 
                                        key={schedule.keyId}
                                        onClick={()=>handleModal}
                                    >
                                        <p className='calendarItem__items__p-date'>{format(new Date(schedule.date), "HH:mm")}</p>
                                        <p className='calendarItem__items__p-title'>{schedule.title}</p>
                                    </li>
                            )
                        }
                    }
                })}
            </ItemList>
        )
    }
}

export default CalendarItem

const ItemList = styled.ul`
    margin-top:20px;
    .calendarItem__li-items{
        margin-bottom:30px;
        cursor: pointer;

        :last-child{
            margin-bottom:0;
        }

        p{
            font-family:'NotokrM';
        }

        .calendarItem__items__p-date{
            margin-bottom:2px;
            color:#999;
            font-size:13px;
            letter-spacing:1px;
        }
        
        .calendarItem__items__p-title{
            font-family:'SUITE-Regular';
            font-size:20px;
        }
    }
    
`