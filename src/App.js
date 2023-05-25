import React, { useState } from "react";
import Calendar from "./component/Calendar";
import { styled } from "styled-components";
import { addMonths, format, subMonths } from 'date-fns';
import { BiChevronRight, BiChevronLeft, BiDotsHorizontal } from "react-icons/bi";
import ModalPop from './component/ModalPop';

function App() {
    const [currentDate, setCurrentDate] = useState(new Date())

    return (
        <>
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
                        <ModalPop currentDate={currentDate} />
                    </div>
                </DateHeader>
                <Calendar currentDate={currentDate} />
            </DateWrap>
        </>
    );
}

export default App;

const DateWrap = styled.div`
`;

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

