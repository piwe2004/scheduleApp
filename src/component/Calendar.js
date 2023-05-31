import React from 'react'
import { styled } from 'styled-components';
import CalendarRow from './CalendarRow';

const Calendar = ({currentDate, handleModal}) => {
    const weekly = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

    return (
        <CalendarBox>
            <div className='calendarBox__div'>
                {weekly.map((week, i)=>(
                    <CalendarWeekly key={i} week={week}>{week}</CalendarWeekly>
                ))}
            </div>
            <CalendarRow handleModal={handleModal} currentDate={currentDate} />
        </CalendarBox>
    )
}

export default Calendar

const CalendarBox = styled.div`
    width:100%;
    position: relative;
    & > .calendarBox__div {
        position: sticky;
        top:0;
        left:0;
        z-index: 3;
        margin-bottom:20px;
    } 
    & .calendarBox__div {
        display: flex;
        align-items:center;
        justify-content:space-between;
        background-color:#fff;
        gap:20px;
        letter-spacing: -1px;
    } 
`

const CalendarWeekly = styled.p`
    width: 100%;
    font-family: 'SUITE-Regular';
    text-align:left;
    padding:5px 5px 30px;
    box-sizing: border-box;
    color: ${props => props.week === "Sun" ? "red" : props.week === "Sat" ? "blue" : "black"};
`
