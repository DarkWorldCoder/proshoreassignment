import React,{useEffect,useCallback,useState,useMemo} from 'react'
import "./Right.scss"
import {RxHamburgerMenu} from "react-icons/rx"
import TodoCard from '../todoCard/TodoCard'

import { useRecoilState } from 'recoil';
import { todosState, userState } from '../../atom/modalAtom';
import {instance as axios} from '../../axios'
const Right:React.FC= () => {
  const [user,setUser] = useRecoilState(userState)
  const [todos,setTodos] = useRecoilState(todosState)
  const token = localStorage.getItem("token")

  const getRealDate = (timestamp:string)=>{
    const date = new Date(timestamp)
    var localDateTime = date.toLocaleDateString() + " " + date.toLocaleTimeString();

    return localDateTime

  }
  useEffect(()=>{
    
    const fetchTodos = async()=>{
      const config = {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
     const {data} = await axios.get(`/api/todos/${user.id}`,config)
     if(!data.message){
     setTodos(data)
   
      
     }
    }
    fetchTodos()
    
  },[])



  
  return (
    // whole container
    <div className='right_container'>
      {/* right side of the header where heading text will be displayed */}
    <div className="right_header">
      <h2>All Task</h2>
      {/* right side of the header that contain dropdown box and more */}
      <div className='right_header_box'>
     <select>
      <option>Newest</option>
      <option>Oldest</option>
     </select>
     <div className='header_icon'>
     <RxHamburgerMenu />
     </div>
      </div>
    </div>


    {/* todo cards */}
    <div className='todo_card'>
      
     
      {/* {todos.map(todo=>console.log(todo))} */}
      {todos.length>0 ?todos.map((info,idx)=>(
        <TodoCard 
        key={idx}
        id={info?.id}
        label={info?.label}
        completed={info?.completed}
        description={info?.description}
        timestamp={getRealDate(info.createdAt)}
        />
      )):(
        <div className='no_task'>
          <h1>No new task</h1>
        </div>
        
      )
        
        
      }
    
    

    </div>
   
    </div>
  )
}

export default Right