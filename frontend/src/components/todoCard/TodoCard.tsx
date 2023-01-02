import React,{useState} from 'react'
import { BsTag } from 'react-icons/bs'
import "./TodoCard.scss"
import {instance as axios} from '../../axios'
interface Props{
  description:string 
  label:string 
  completed:boolean
  id:string
  timestamp:string
}

const TodoCard:React.FC<Props> = ({id,timestamp,description,label,completed}) => {
  const[checked,setChecked] = useState(completed)
  const token = localStorage.getItem("token")
  
  const changeChecked = async()=>{
    const config = {
      headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  }
    const {data} = await axios.patch("/api/todos",{
      completed:!checked,
      id:id
    },
    config
    )
    

    setChecked(data.completed)
    
    

    
   
  }
  return (
    <div className='todo_container'>
        <div className='todo_left'>
        <label className="custom-checkbox" tab-index="0" aria-label="Checkbox Label">
    <input type="checkbox" checked={checked}
    onClick={changeChecked}
    />
    <span className="checkmark"></span>
    
  </label>
        </div>
        <div className='todo_right'>
       <p>{timestamp}</p>
       <h3>{description}</h3>
       <div className='tag_container '>
<div className='tag_icon'>
<BsTag 
style={{width:"30px",height:"30px"}}
fill={label==="normal"?"yellow":"red"} />
    {label}
    </div>
    </div>

      
      </div>
    
    </div>
  )
}

export default TodoCard