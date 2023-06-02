import React from 'react'
import { addDays, endOfMonth, format, getWeeksInMonth, isSameMonth, startOfMonth, startOfWeek } from 'date-fns'
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import CalendarItem from './CalendarItem';

const CalendarRow = ({currentDate, editModal}) => {


    // 월의 시작일
    const monthStart = startOfMonth(currentDate);
    // 월의 마지막일
    const monthEnd = endOfMonth(monthStart);
    // 월의 첫번째 주 시작일
    const startDate = startOfWeek(monthStart);

    let dayArray = Array(7).fill(null);
    let weekArray = Array(getWeeksInMonth(currentDate)).fill(null)

    const currentMonth = new Date().getMonth() === currentDate.getMonth();
    let days = startDate;


    
    return (
        <CalendarDaysBox>
            {weekArray.map((week, i)=> (
                <ul className='calendarBox__div days-div' key={i}>
                    {dayArray.map((day, idx)=> (
                        days = addDays(days -1 , 1),
                        <CalendarDays 
                            key={idx}
                            className={
                                `days-div__content ${!isSameMonth(days, monthStart) ? 'ohterMonth' : ''} ${idx === 0 ? 'CalendarDays_sun' : idx === 6 ? 'CalendarDays_sat' : ''} ${Number(format(days, 'd')) === new Date().getDate() && Number(format(days, 'M')) === new Date().getMonth()+1 ? "calendarToday" : '' }`
                            }
                        >
                            <CalendarDay className='days-div__content__span'>
                                <span>{format(days,'dd')}</span>
                                <CalendarItem editModal={(e) => editModal(e)} currentDay={days} />
                            </CalendarDay>
                        </CalendarDays>
                    ))}
                </ul>
            ))}
        </CalendarDaysBox>
    )
}

export default CalendarRow

const CalendarDaysBox = styled.div`
    display: grid;
    grid-template-columns: 100%;
    gap:40px 0;
`

const CalendarDays = styled.li`
    width: 100%;
    border-top: 2px solid #0a0a0a;
    transition: all .3s ease-in-out;
    &.ohterMonth{
        opacity:0.2;
    }
    &.CalendarDays_sun{
        border-top-color:#e30f0f;
        span{
            color:#e30f0f
        }
    }
    &.CalendarDays_sat{
        border-top-color:#0c39c6;
        span{
            color:#0c39c6
        }
    }
    &.calendarToday{
        border-top-color:#fd8c0e !important;
        background-color:#f8f8f8 !important;
    }
    &.calendarToday .days-div__content__span > span{
        color:#fd8c0e !important;
    }
    &:not(.ohterMonth) .days-div__content__span:hover{
        box-shadow: 2px 0px 10px rgba(0,0,0,0.1);
        background-color: #f4f1ef;
    }  
`

const CalendarDay = styled.div`
    position: relative;
    min-height:150px;
    padding:10px 5px 16px;
    box-sizing: border-box;
    transition: all .3s ease-in-out;
    span {
        font-family: 'MBC1961GulimM';
        font-size:28px;
        text-align: left;
    }
    
`
