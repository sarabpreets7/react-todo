import React, { useEffect } from 'react'
import styled from 'styled-components';
import "../css/main.css";

export default function SearchBar(props){

    const updateField =(e)=>{
       
        props.setTask(e.target.value);
    }
    const addNewTask=()=>{

        if(props.task != ""){
           
            
                props.addTask();
                props.setTask("");
            
            
        }
        
    }
    const checkEvent=(e)=>{
    
        if(props.task.charAt(0) == '#'){
            console.log('hh');
            props.filterHashTag();
        }
        else{
            if(e.code == 'Enter'){
                addNewTask();
            }
        }

    }
    const resetList=()=>{
        props.resetList()
    }
  
    useEffect(()=>{
        
    },[props.task])
    return(
        <SearchContainer>
            <SearchField value={props.task} onKeyUp={checkEvent} onChange={updateField} placeholder='Add Task'/>
            <SearchBtn className='btn__todo' onClick={addNewTask}>Add New</SearchBtn>
            <ResetBtn className='btn__todo' onClick={resetList}>Reset</ResetBtn>
        </SearchContainer>
    )
}


const SearchContainer = styled.div`

width: 100%;
display: flex;
align-items: center;
justify-content: center;
border-radius: 7px;
height: 38px;
`
const ResetBtn = styled.div`
height: 100%;
width: 120px;
background: #F7E2DF;
border-radius: 7px;
display: flex;
justify-content: center;
align-items: center;

`
const SearchField = styled.input`
height: 100%;

max-width: 500px;
flex: 1;
background-color: #181A1A;
border: none;
border-top-left-radius: 7px;
border-bottom-left-radius: 7px;
transition: background-color 200ms ease-in-out;
padding: 0px 10px;
color: white;
&:focus{
    outline: none;
}
&:hover{
    background-color: black;
}
`
const SearchBtn = styled.div`
height: 100%;
width: 120px;
background: #F7E2DF;
border-top-right-radius: 7px;
border-bottom-right-radius: 7px;
display: flex;
justify-content: center;
align-items: center;
margin-right: 5px;
`
