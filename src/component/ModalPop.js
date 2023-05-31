import { format } from 'date-fns'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Icon, Input, Modal, TextArea } from 'semantic-ui-react'
import { styled } from 'styled-components'
import { add_schedule } from '../reducers/schedule'
import "./datepicker.scss"


const ModalPop = ({modalState}) => {

    const dispatch = useDispatch();
    const [modalPop, setModalPop] = useState(modalState)
    //제목
    const [scheduleTitle, setScheduleTitle] = useState('')
    // 날짜
    const [currentDate, setCrrentDate] = useState('')
    //시간
    const [currentTime, setCurrentTime] = useState('');
    //내용
    const [scheduleCnt, setscheduleCnt] = useState('');
    const changeDate = (e) =>{
        setCrrentDate(format(e, "yyyy-MM-dd"));
    }
    const changeTime = (e) =>{
        setCurrentTime(format(e, "HH:mm"));
    }

    const handleAddSchedule = () =>{
        dispatch(add_schedule({
            title:scheduleTitle,
            date:new Date(`${currentDate} ${currentTime}`),
            content:scheduleCnt,
        }))
        setModalClose()
    }

    const setModalClose = () =>{
        setScheduleTitle('');
        setCrrentDate('');
        setscheduleCnt('');
        setCurrentTime('');
        setModalPop(false)
    }

    
    return (
        <PopupBox>
            <Modal
                onClose={()=>setModalClose()}
                onOpen={()=>setModalPop(true)}
                open={modalPop}
                trigger={<Button style={{fontSize:'14px', padding:'11px 20px'}}>일정 등록</Button>}
                style={{width:"95%", maxWidth:"500px"}}
            >
                <Modal.Header style={{fontFamily:'SUITE-Regular', fontSize:'17px', padding:'15px 20px'}}>일정 등록</Modal.Header>
                <ModalContainer>
                    <Form style={{padding:20, boxSizing:'border-box'}}>
                        <Modal.Content style={{display:'flex', gap:'20px', flexFlow:'row wrap', }}>
                            <Input transparent placeholder="제목" defaultValue={scheduleTitle} onChange={(e)=>setScheduleTitle(e.target.value)} />
                            <CalendarCnt>
                                <ModalCalendar>
                                    <Input placeholder={format(new Date(), "yyyy-MM-dd")} readOnly transparent value={currentDate}  icon={<Icon name="calendar" alternate="true" outline="true" />} />
                                    <ReactDatePicker 
                                        selected={currentDate? new Date(currentDate) : new Date()}
                                        onChange={(date) => changeDate(date)}
                                        useWeekdaysShort={true}
                                        disabledKeyboardNavigation
                                        renderCustomHeader={({monthDate, decreaseMonth, increaseMonth})=>(
                                            <div className='react-datepicker__div-custom'>
                                                <button
                                                    aria-label="Previous Month"
                                                    className={
                                                    "react-datepicker__navigation react-datepicker__navigation--previous"
                                                    }
                                                    onClick={decreaseMonth}
                                                >
                                                    <Icon name="angle left" />
                                                </button>
                                                <span className="react-datepicker__current-month">
                                                    {monthDate.toLocaleString("en-US", {
                                                        month: "numeric",
                                                        year:"numeric"
                                                    }).replace("/", ", ")}
                                                </span>
                                                <button
                                                    aria-label="Next Month"
                                                    className={
                                                    "react-datepicker__navigation react-datepicker__navigation--next"
                                                    }
                                                    onClick={increaseMonth}
                                                >
                                                    <Icon name="angle right" />
                                                </button>
                                            </div>
                                        )}
                                    />
                                </ModalCalendar>
                                <ModalCalendar>
                                    <Input placeholder={format(new Date(), "k:mm")} readOnly transparent defaultValue={currentTime}  icon={<Icon name="clock outline" alternate="true" outline="true" />}  />
                                    <ReactDatePicker 
                                        selected={new Date()} 
                                        onChange={(date) => changeTime(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                    />
                                </ModalCalendar>
                            </CalendarCnt>
                            <TextArea placeholder='내용' style={{ minHeight: 100, width:'100%' }} defaultValue={scheduleCnt} onChange={(e)=>setscheduleCnt(e.target.value)} />
                        </Modal.Content>
                    </Form>
                </ModalContainer>
                <Modal.Actions>
                    <Button color='black' onClick={() => setModalClose()}>취소</Button>
                    <Button
                        content="등록"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => handleAddSchedule()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </PopupBox>        
    )
}

export default ModalPop

const PopupBox = styled.div`
    .ui.button{
        border:none;
        display:inline-block;
        background-color:#111;
        color:#fff;
        font-size:15px;
        font-family:'NotokrR';
        text-align: center;
        padding:12px 25px;
        box-shadow: 2px 2px 2px rgba(0,0,0,.5);
        cursor: pointer;
        transition: all .3s ease-in-out;
        &:hover{
            background-color:#3d3c3c;
        }
    }
`

const ModalContainer = styled.div`
    .ui.input{
        border-bottom:1px solid rgba(34,36,38,.15);
        min-height:38px;
        width:100%;
        > input {
            font-family:'NotokrR';
            font-size:15px;
        }
    }
    .ui.form textarea{
        font-family:'NotokrR';
        font-size:15px;
        resize: none;
    }
`

const CalendarCnt = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    width: 100%;
    > div{
        width: 47%;
    }
`

const ModalCalendar = styled.div`
    position: relative;
    display: inline-block;
    width:100%;
    .react-datepicker__aria-live{display:none;}
    .react-datepicker-wrapper{
        width: 100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
        opacity: 0;
        .react-datepicker__input-container, & input {
            width:100%;
            height:100%;
            font-family:'NotokrR';
        }
    }
`
