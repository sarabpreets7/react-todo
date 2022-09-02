import React from 'react'
import styled from 'styled-components';
import { TiTick } from 'react-icons/ti';
import { RiDeleteBin2Fill as Delete} from 'react-icons/ri';
import "../css/main.css";

export default function TodoTicket(props){


    const removeTask=()=>{
        props.deleteTask(props.todo.id);
    }
    const updateTask=()=>{
        props.updateTask(props.todo.id);
    }
    const createMarkup= html =>{
        return {__html: html}
    }
    return(
        <TicketContainer style={props.todo.done?{opacity:'0.4'}:{opacity:'1'}} >
            
            <TicketInfo dangerouslySetInnerHTML={createMarkup(props.todo.task)} style={props.todo.done?{textDecorationLine: 'line-through'}:{}}>
                
    
            </TicketInfo>

            <ButtonsContainer>
                <div onClick={updateTask} className='btn-container'>
                    <TiTick className='btn' color='black'/>
                </div>
                <div onClick={removeTask} className='btn-container'>
                    <Delete  className='btn' color='black'/>
                </div>
                
            </ButtonsContainer>
        </TicketContainer>
    )
}

const TicketContainer = styled.div`
min-width: 300px;
max-width: 400px;
display: flex;
flex-direction: column;
border-radius: 8px;
background-color: #1A1B1B;
margin-bottom: 17px;
`
const TicketInfo = styled.div`
/* width: 100%; */
padding: 20px;
color: white;
word-wrap: break-word;
margin-bottom: 10px;
`
const ButtonsContainer = styled.div`
/* width: 100%; */
width: 120px;
position: relative;
margin-left: auto;
margin-right: auto;
display: flex;
align-items: center;
justify-content: space-around;
margin-bottom: 15px;
`