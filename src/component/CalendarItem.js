import { format } from 'date-fns'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import schedule from './../reducers/schedule';
import { styled } from 'styled-components';
import ItemView from './ItemView';

const CalendarItem = ({currentDay, editModal}) => {

    const schedulsDataList = useSelector(state => state.schedule.scheduleList);
    const dateDay = format(currentDay, "yyyy-MM-dd");

    if(schedulsDataList.length > 0){
        return(
            <>
                <ItemList>
                    {schedulsDataList.map((schedule, i) => {
                        const itemDate = format(new Date(schedule.date), "yyyy-MM-dd");
                        // eslint-disable-next-line no-lone-blocks
                        {
                            if(i < 3 ){
                                return(
                                    itemDate === dateDay  &&
                                        <li 
                                            className='calendarItem__li-items' 
                                            key={schedule.keyId}
                                            onClick={() => editModal(schedule)}
                                        >
                                            <p className='calendarItem__items__p-date'>{format(new Date(schedule.date), "HH:mm")}</p>
                                            <p className='calendarItem__items__p-title'>{schedule.title}</p>
                                        </li>
                                )
                            }
                        }
                    })}
                </ItemList>
            </>
        )
    }
}

export default CalendarItem

const ItemList = styled.ul`
    margin-top:20px;
    .calendarItem__li-items{
        margin-bottom:30px;
        cursor: pointer;
        &:hover .calendarItem__items__p-title{
            color:#fd8c0e;
        }
        &:hover .calendarItem__items__p-date{
            color:#666
        }
        :last-child{
            margin-bottom:0;
        }

        p{
            font-family:'NotokrM';
            transition: all .1s ease-in-out;
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