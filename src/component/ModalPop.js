import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Button, Divider, Header, Icon, Input, Modal } from 'semantic-ui-react'
import { styled } from 'styled-components'


const ModalPop = ({currentDate}) => {

    const [modalPop, setModalPop] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <PopupBox>
            <Modal
                onClose={()=>setModalPop(false)}
                onOpen={()=>setModalPop(true)}
                trigger={<Button>Add event</Button>} 
            >
                <Modal.Header>Add event</Modal.Header>
                <Modal.Content>
                    <Input placeholder="Title" />
                    <ModalCalendar>
                        <Input readonly icon={<Icon name="calendar" alternate outline />} />
                        <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </ModalCalendar>
                </Modal.Content>
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

const ModalCalendar = styled.div`
    position: relative;
    .react-datepicker-wrapper{
        position: absolute;
        top:0; left:0;
        opacity: 0;
    }
`
