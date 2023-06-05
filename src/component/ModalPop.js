import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useDispatch} from 'react-redux'
import { Button, Checkbox, Confirm, Form, Icon, Input, Modal, TextArea } from 'semantic-ui-react'
import { styled } from 'styled-components'
import { add_schedule, delete_schedule, edit_schedule } from '../reducers/schedule'
import "./datepicker.scss"


const ModalPop = ({modalOpen, closeModal, viewMode, editData}) => {

    const dispatch = useDispatch();
    //수정내용
    
    //제목
    const [scheduleTitle, setScheduleTitle] = useState('')
    // 날짜
    const [currentDate, setCrrentDate] = useState('')
    //시간
    const [currentTime, setCurrentTime] = useState('');
    //내용
    const [scheduleCnt, setscheduleCnt] = useState('');
    //완료체크
    const [isChecked, setIsChecked] = useState(false)
    //에러체크
    const [dataError, setDataError] = useState({})
    //수정여부 확인
    const [editMode, setEditMode] = useState(false)
    // 삭제 확인
    const [deleteCheck, setDeleteCheck] = useState(false)


    const changeMode = () => {
        setEditMode(true);
    }

    const changeDate = (e) =>{
        setCrrentDate(format(e, "yyyy-MM-dd"));
    }
    const changeTime = (e) =>{
        setCurrentTime(format(e, "HH:mm"));
    }

    const editCencle = () => {
        setEditMode(false);
        setScheduleTitle(editData.title)
        setCrrentDate(format(new Date(editData.date), "yyyy-MM-dd"))
        setCurrentTime(format(new Date(editData.date), "HH:mm"))
        setscheduleCnt(editData.content)
        setIsChecked(editData.isComplate)
    }

    useEffect(() => {
        if(viewMode){
                setScheduleTitle(editData.title)
                setCrrentDate(format(new Date(editData.date), "yyyy-MM-dd"))
                setCurrentTime(format(new Date(editData.date), "HH:mm"))
                setscheduleCnt(editData.content)
                setIsChecked(editData.isComplate)
        }
    }, [modalOpen])



    const dataChecked = () => {
        if(!scheduleTitle || !currentDate){
            if(!scheduleTitle && !currentDate){
                setDataError({title:false, date:false});
            }else if(!scheduleTitle){
                setDataError({title:false});
            }else if(!currentDate){
                setDataError({date:false});
            }
            return false
        }
        return true
    }

    useEffect(() => {
        if(Object.keys(dataError).length > 0){
            if(scheduleTitle.length > 0){
                setDataError({title:true});
                console.log(dataError)
            }
            if(currentDate.length > 0){
                setDataError({date:true});
                console.log(dataError)
            }
        }
    }, [scheduleTitle, currentDate])

    const deleteData = () => {
        dispatch(delete_schedule(editData.keyId))
        setDeleteCheck(false)
        setModalClose()
    }

    const handleAddSchedule = () =>{

        if(dataChecked()){
            if(!editMode){
                dispatch(add_schedule({
                    title:scheduleTitle,
                    date:new Date(`${currentDate} ${currentTime}`),
                    content:scheduleCnt,
                    isComplate:false
                }))
            }else {
                dispatch(edit_schedule({
                    keyId:editData.keyId,
                    title:scheduleTitle,
                    date:new Date(`${currentDate} ${currentTime}`),
                    content:scheduleCnt,
                    isComplate:isChecked
                }))
            }
            setModalClose()
        }
    }

    const setModalClose = () =>{
        if(viewMode & !editMode & editData.isComplate !== isChecked){
            editData.isComplate = isChecked
            dispatch(edit_schedule(editData))
        }
        setScheduleTitle('');
        setCrrentDate('');
        setscheduleCnt('');
        setCurrentTime('');
        setDataError({})
        setEditMode(false);
        closeModal();
    }

    
    return (
        <PopupBox>
            <Modal
                open={modalOpen}
                style={{width:"95%", maxWidth:"500px"}}
            >
                <Modal.Header style={{fontFamily:'SUITE-Regular', fontSize:'17px', padding:'15px 20px'}}>일정 등록</Modal.Header>
                <ModalContainer>
                    <Modal.Content>
                        <Form style={{padding:20, boxSizing:'border-box', display:'flex', gap:'20px', flexFlow:'row wrap'}}>
                            <Form.Field
                                id='form-input-control-title'
                                control={Input}
                                placeholder="제목"
                                value={scheduleTitle}
                                transparent
                                onChange={(e)=>setScheduleTitle(e.target.value)}
                                readOnly={viewMode & !editMode ? true : false}
                                error={dataError.title === false && {
                                    content: '제목을 입력해 주세요.',
                                    pointing: 'below',
                                }}
                                />
                            <CalendarCnt>
                                <ModalCalendar>
                                    <Form.Field
                                        id='form-input-control-date'
                                        readOnly
                                        control={Input}
                                        placeholder={format(new Date(), "yyyy-MM-dd")}
                                        value={currentDate}
                                        icon={<Icon name="calendar" alternate="true" outline="true" />}
                                        transparent
                                        error={dataError.date === false && {
                                            content: '날짜를 입력해 주세요.',
                                            pointing: 'below',
                                        }}
                                    />
                                    {/* <Input placeholder={format(new Date(), "yyyy-MM-dd")} readOnly transparent value={currentDate}  icon={<Icon name="calendar" alternate="true" outline="true" />} /> */}
                                    <ReactDatePicker 
                                        readOnly={viewMode & !editMode ? true : false}
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
                                        readOnly={viewMode & !editMode ? true : false}
                                        selected={new Date()} 
                                        onChange={(date) => changeTime(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                    />
                                </ModalCalendar>
                            </CalendarCnt>
                            <TextArea readOnly={viewMode & !editMode ? true : false} placeholder='내용' style={{ minHeight: 100, width:'100%' }} defaultValue={scheduleCnt} onChange={(e)=>setscheduleCnt(e.target.value)} />
                            <Button 
                                size='mini'
                                color={isChecked ? 'blue' : ''}
                                onClick={()=>setIsChecked(!isChecked)}
                            >
                                일정완료
                            </Button>
                        </Form>
                    </Modal.Content>
                </ModalContainer>
                <Modal.Actions>
                    <Button color='black' onClick={() => setModalClose()}>닫기</Button>
                    {
                        editMode 
                            ? <Button
                                content='취소'
                                color='red' 
                                onClick={() => editCencle()}
                                icon='close'
                            /> 
                            : ''
                    }
                    {
                        editMode || !viewMode
                            ? <Button
                                content={editMode ? "수정" : "등록"}
                                icon='checkmark'
                                onClick={() => handleAddSchedule()}
                                positive
                            />
                        :''
                    }
                    {
                        viewMode & !editMode 
                            ?  
                                <>
                                    <Button
                                        content='삭제'
                                        color='red' 
                                        onClick={() => setDeleteCheck(true)}
                                        icon='trash alternate outline'
                                    />
                                    <Confirm
                                        content="일정을 삭제 하시겠습니까?"
                                        open={deleteCheck}
                                        cancelButton='아니요'
                                        confirmButton='네'
                                        onCancel={()=>setDeleteCheck(false)}
                                        onConfirm={()=>deleteData()}
                                    />
                                    <Button
                                        content='수정하기'
                                        color='facebook' 
                                        onClick={() => changeMode()}
                                        icon='edit'
                                    /> 
                                </>
                            : ''
                    }
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
    .ui.form {
        .field{
            width:100%;
            margin:0;
            position: relative;
        }
        .error.field{
            .ui.below.prompt{
                position: absolute;
                top:-30px;
            }
        }
    } 
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
