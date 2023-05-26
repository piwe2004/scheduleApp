import { format } from 'date-fns'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Form, Header, Icon, Input, Modal, TextArea } from 'semantic-ui-react'
import { styled } from 'styled-components'
import { add_schedule } from '../reducers/schedule'


const ModalPop = ({schedule}) => {

    const dispatch = useDispatch();

    const [modalPop, setModalPop] = useState(false)
    //제목
    const [scheduleTitle, setScheduleTitle] = useState('')
    // 날짜
    const [changeDate, setChangeDate] = useState('')
    //내용
    const [scheduleCnt, setscheduleCnt] = useState('')
    const changDate = (e) =>{
        return e && setChangeDate(format(e, "yyyy-MM-dd"))
    }

    const handleAddSchedule = () =>{
        dispatch(add_schedule({
            title:scheduleTitle,
            date:changeDate,
            content:scheduleCnt
        }))
        setScheduleTitle('');
        setChangeDate('');
        setscheduleCnt('');
        setModalPop(false)
    }

    const setModalClose = () =>{
        setScheduleTitle('');
        setChangeDate('');
        setscheduleCnt('');
        setModalPop(false)
    }

    
    return (
        <PopupBox>
            <Modal
                onClose={()=>setModalClose()}
                onOpen={()=>setModalPop(true)}
                open={modalPop}
                trigger={<Button>일정 등록</Button>}
                style={{width:"95%", maxWidth:"500px"}}
            >
                <Modal.Header style={{fontFamily:'SUITE-Regular', fontSize:'17px', padding:'15px 20px'}}>일정 등록</Modal.Header>
                <ModalContainer>
                    <Form style={{padding:20, boxSizing:'border-box'}}>
                        <Modal.Content style={{display:'flex', gap:'20px', flexFlow:'row wrap', }}>
                            <Input transparent placeholder="제목" defaultValue={scheduleTitle} onChange={(e)=>setScheduleTitle(e.target.value)} />
                            <ModalCalendar>
                                <Input placeholder={format(new Date(), "yyyy-MM-dd")} readOnly transparent defaultValue={changeDate}  icon={<Icon name="calendar" alternate="true" outline="true" />}  />
                                <ReactDatePicker selected={new Date()} onChange={(date) => changDate(date)} />
                            </ModalCalendar>
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
        }
    }
`
