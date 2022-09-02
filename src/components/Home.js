import React,{ useEffect, useState } from 'react'
import styled from 'styled-components';
import SearchBar from './SearchBar';
import TodoTicket from './TodoTicket';
import { v4 as uuid } from 'uuid';
import "../css/main.css";

export default function Home(){
    const [todoList,setList] = useState([]);
    const [task,setTask] = useState("");
  
    useEffect(()=>{

       fetchTodoList();
 
    },[])
    const fetchTodoList=()=>{
        let todosList = localStorage.getItem("todoList");
        if(todosList != null){
            todosList = JSON.parse(todosList);
    
           setList(todosList)
            
        }
    }

    const addTask=()=>{
        if(task.charAt(0)!='#'){
            const unique_id = uuid();
 
            let todosList = localStorage.getItem("todoList");
            if(todosList != null){
                todosList = JSON.parse(todosList);
            }
            else{
                todosList = []
            }

            let newTask = {
                "task":task,
                "date":new Date(),
                "done":false,
                "id":unique_id
            }
            let list = [...todosList,newTask];
         
            saveItems(list);
            sortList(list);
            
            setTask("");
        }
        
        
    }
    const filterHashTag=()=>{
        
        let todosList = localStorage.getItem("todoList");
        if(todosList != null){
            todosList = JSON.parse(todosList);
            
            let srch = task.substring(1).toLowerCase()
            let filteredData = todosList.filter(
                item =>
                item.task.toLowerCase().includes(srch)

            ).map(item =>{
                let newTitle = item.task.replace(
                    new RegExp(srch,'gi'),
                    match => `<mark style="background: #2769AA ; color: yellow">${match}</mark>`
                )
                return{
                    ...item,
                    task: newTitle
                }
            })
            setList(filteredData)
        }
       
    }
    const deleteTask=(id)=>{
        const index = todoList.findIndex(
            (itemTask) => itemTask.id === id
          );

          let newList = [...todoList];
          if(index>=0){
            newList.splice(index, 1);
          }

        saveItems(newList);
        sortList(newList)
        
          
  
    }
    const updateTask=(id)=>{
       let newList = todoList.map((data)=>
        data.id == id?{...data,done:!data.done}:data)

        saveItems(newList);
        sortList(newList);
       
        
    }

   const sortList=(list)=>{
    
    list.sort(function(x,y){ 
        if(x.done == false){
            if(x.done == false && y.done == false){
                return new Date(x.date) - new Date(y.date)
            }

            return -1
        }

        else {
            return 1
        } });
    
    setList(list);
    console.log(list);
   }

   const resetList =()=>{
    saveItems([]);
    setList([]);
   }
    const saveItems =async(list)=>{

        if(list.length >0){
            localStorage.setItem("todoList",JSON.stringify(list));
        }
        else{
            localStorage.removeItem("todoList");
        }
        
        
    }
    return(
        <Container>
            <HeadingContainer>
                <Heading>Add To-Do</Heading>
                <SearchBar filterHashTag={filterHashTag} task={task} setTask={setTask} resetList={resetList} addTask={addTask}  />
            </HeadingContainer>

            <TodoListContainer>
                {todoList.length > 0?
                <div className='list__container'><Heading style={{fontSize:'30px',marginBottom:'15px'}}>Task List</Heading> 
                <TodoList className='todoList'>
                 
                 
                {todoList.map(function(todo){
                    return(
                        < TodoTicket key={todo.id} updateTask={updateTask} deleteTask={deleteTask} todo={todo} />
                    )
                })}
               
            </TodoList>
            </div>
            :
            <Heading style={{fontSize:'30px'}}>Task List Empty</Heading>   
            }
                
            </TodoListContainer>
        </Container>
    )

}

const Container = styled.div`
width: 100%;
min-height: 100vh;
max-height: 100vh;
background-image: linear-gradient(to right, #535455 , #0B3040);
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`

const HeadingContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 25vh;
width: 100%;
margin-top: 20px;
margin-bottom: 5px;
`
const Heading = styled.div`
font-size: 48px;
animation: animated-text 2s steps(11,end) 0.5s 1 normal both, animated-cursor 750ms steps(11,end) infinite;
letter-spacing: 3.5px;
margin-bottom: 35px;
color: #FDDFDB;
font-weight: 600;

`

const TodoListContainer = styled.div`
width: 90%;
padding: 5px;
min-height: 45vh;
display: flex;
justify-content: center;

`
const TodoList = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items: center;
overflow: auto;
max-height: 60vh;
`