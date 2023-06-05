import React, { useCallback, useState } from 'react'
import { styled } from 'styled-components';
import CalendarRow from './CalendarRow';
import { addMonths, format, subMonths } from 'date-fns';
import { BiChevronRight, BiChevronLeft, BiDotsHorizontal } from "react-icons/bi";
import ModalPop from './ModalPop';
import { Button } from 'semantic-ui-react';
import ItemView from './ItemView';

const Calendar = ({handleModal}) => {
    const weekly = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [schedule, setSchedule] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState(false)
    const [editData, seteditData] = useState({})

    const [showSide, setShowSide] = useState(false)
    const closeSide = () => {
        setShowSide(false);
    }

    const closeModal = () => {
        setModalOpen(false)
        setViewMode(false)
        seteditData({})
    }
    const editModal = (e) => {
        setModalOpen(true)
        setViewMode(true)
        seteditData(e)
    }
    return (
        <DateWrap>
            <DateHeader>
                <div className="dateHeader__container">
                    <p className="dateHeader__container__month">{format(currentDate, "MMM")}</p>
                    <p className="dateHeader__container__year">{format(currentDate, "Y")}</p>
                    <div className="dateHeader__container__buttons-div">
                        <BiChevronLeft onClick={()=>setCurrentDate(subMonths(currentDate, 1))} />
                        <BiDotsHorizontal onClick={()=>setCurrentDate(new Date())} />
                        <BiChevronRight onClick={()=>setCurrentDate(addMonths(currentDate, 1))} />
                    </div>
                </div>
                <div>
                    <Button primary onClick={()=>setModalOpen(true)}>일정등록</Button>
                    <ModalPop 
                        modalOpen={modalOpen} 
                        closeModal={closeModal}
                        viewMode={viewMode}
                        editData={editData} 
                    />
                </div>
            </DateHeader>
            <CalendarBox>
                <div className='calendarBox__div'>
                    {weekly.map((week, i)=>(
                        <CalendarWeekly key={i} week={week}>{week}</CalendarWeekly>
                    ))}
                </div>
                <CalendarRow editModal={(e) => editModal(e)} currentDate={currentDate} />
            </CalendarBox>
            {/* <ItemView showSide={showSide} editData={editData} closeSide={closeSide} changeEdit={changeEdit} /> */}
        </DateWrap>
    )
}

export default Calendar

const DateHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:40px; 
    .dateHeader__container {
        display: flex;
        align-items:center;
        justify-content:space-between;
        gap:5px;
        & > p {
            margin-bottom:0;
            font-family:'ONE-Mobile-Title';
            font-size:35px;
            font-weight: bold;
        }
        & .dateHeader__container__month{
            width:80px;
        }
        & .dateHeader__container__buttons-div{
            padding-top:5px;
            margin-left:40px;
            font-size:25px; 
            font-weight:light;
            box-shadow: 2px 2px 2px rgba(0,0,0,.1);
            border-radius: 5px;
            svg {
                overflow: inherit;
                cursor:pointer;
                margin:0 2px;
            }
        }
    }
`;

const DateWrap = styled.div`
`;



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
        align-items:stretch;
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
