import { format } from 'date-fns'
import React from 'react'
import { Button, Sidebar } from 'semantic-ui-react'
import { styled } from 'styled-components'

const ItemView = ({showSide, closeSide, editData, changeEdit}) => {
    return (
        <Sidebar
            animation='overlay'
            icon='labeled'
            vertical
            width='very wide'
            onHide={()=>closeSide()}
            visible={showSide}
            direction='right'
        >
            <SideCnt>
                <p className='sidebar__p-date'>
                    {format(new Date(editData.date), `dd´MMM, EEEE`).toUpperCase()}
                </p>
                <div className='sidebar__div-cntWrap'>
                    <p className='sidebar__cntWrap__p-time'>
                        {format(new Date(editData.date), `HH:mm aa`)}
                    </p>
                    <p className='sidebar__cntWrap__p-title'>{editData.title}</p>
                    <p className='sidebar__cntWrap__p-content'>{editData.content}</p>
                </div>
                <div className='sidebar__div-btnWrap'>
                    <Button 
                        content="삭제"
                        color='red' 
                    />
                    <Button
                        content="수정"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                    />
                </div>
            </SideCnt>
        </Sidebar>
    )
}

export default ItemView

const SideCnt = styled.div`
    background-color:#fff;
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:20px 40px 100px 40px;
    position: relative;
    .sidebar__div-btnWrap{
        position: absolute;
        bottom:20px;
        left:40px;
    }
`