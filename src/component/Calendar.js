import React from 'react'
import { styled } from 'styled-components';
import CalendarRow from './CalendarRow';

const Calendar = ({currenDate}) => {
    const weekly = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    return (
        <CalendarTable>
            <colgroup>
                <col style={{width:'14.444%'}}></col>
                <col style={{width:'14.444%'}}></col>
                <col style={{width:'14.444%'}}></col>
                <col style={{width:'14.444%'}}></col>
                <col style={{width:'14.444%'}}></col>
                <col style={{width:'14.444%'}}></col>
                <col style={{width:'14.444%'}}></col>
            </colgroup>
            <thead>
                <tr>
                    {weekly.map((week, i)=>(
                        <CalendarTable__th key={i} week={week}>{week}</CalendarTable__th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <CalendarRow currenDate={currenDate} />
            </tbody>
        </CalendarTable>
    )
}

export default Calendar

const CalendarTable = styled.table`
    width:100%;
`

const CalendarTable__th = styled.th`
    font-family: 'NotokrM';
    text-align:center;
    color: ${props => props.week === "Sun" ? "red" : props.week === "Sat" ? "blue" : "black"}
`
