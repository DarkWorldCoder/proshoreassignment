import React,{useEffect,useState,useCallback,useMemo}from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import HomeScreens from './screens/HomeScreens';
import { useRecoilState } from "recoil";
import { overlayState, todosState, userState } from './atom/modalAtom';
import {RxCross2} from "react-icons/rx"
import Login from './components/Login/Login';
import Loading from './Loading/Loading';
import {instance as axios} from "./axios"

function App() {
  // using recoil to set overlay to true or false
  const [overlay,setOverlay] = useRecoilState(overlayState)
  const [user,setUser] = useRecoilState(userState)
  const [isLoading,setIsloading] = useState(true)
  const [description,setDescription] = useState("")
  const[label,setLabel] = useState("normal")
  const [showLogin,setShowLogin] = useState(true)
  const[todos,setTodos] = useRecoilState(todosState)

  const reset = ()=>{
    setOverlay(false)
    setLabel("normal")
    setDescription("")
  }
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    
    setLabel(e.target.value)
    
  }
  const handleInputChange =  (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    
    setDescription(e.target.value)
    
  }
  const token = localStorage.getItem("token")
  const fetchData = async()=>{
       const {data} = await axios.get(`/api/user/login?token=${token}`)
       
       if(!data.message){
        setUser(data.user)
        setIsloading(false)
       }
       else{
        setShowLogin(true)
        setIsloading(false)
       }
      }

  
  useEffect(()=>{
     if(token !==undefined && token !== null && user.email === ""){
      fetchData()
      setIsloading(true)

     }
     if(user.email !==""){
      setIsloading(false)
      setShowLogin(false)
     }
     if(user.email ===""){
      setShowLogin(true)
      setIsloading(false)
     }
    
  },[user.email,token,fetchData])


  

  const submitData = async()=>{
    const token = localStorage.getItem("token")
    if(description.length >=1){
      const config = {
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
      const {data} = await axios.post("/api/todos/add-todos",{
        description:description,
        label:label,
        userId:user.id
      },config)

      if(data.todo){
        setTodos(prev=>([...prev,data.todo]))
        reset()
        setOverlay(false)
      }
      // console.log(data)
    }
  }

  
  if(isLoading) return <Loading/>
  if(showLogin) return <Login />
  
  return (
    <div className="app">
  
  <Navbar key="navbar"/>
  <HomeScreens key="homescreens"/>
    {/* if overlay is true show overlay */}
    {overlay&&(
      <div 
      key="overlay"
      className="overlay">
        {/* overlay box that helps you add a text */}
      <div className='overlay_container'>
      <div className='overlay_header'>
      <h1>Add Todo</h1>
      <div
      onClick={reset}
      >
      <RxCross2
      
      />


      </div>
   
      </div>
      {/* end of box */}
      <hr></hr>

      {/* starting of input fields */}

      <div className='input_container'>
       <div className='input_box'>
        <label>Description</label>
        <textarea
        key="description"
        value={description}
        onChange={e=>handleInputChange(e)}
        placeholder="Try Adding Items"/>
       </div>
       <div className='input_box'>
        <label>Label</label>
        <select

        key="select"
        value={label}
        onChange={e=>handleSelectChange(e)}
        >
          <option key="3" value="normal">Normal</option>
          <option key="5" value="important">Important</option>
        </select>
       </div>
      </div>

      {/* final button */}

      <div className='btn_container'>
         <div 
         onClick={reset}
         className='btn'>
          Cancel
        </div>
        <div 
        onClick={submitData}
        className='btn submit'>
        Submit
        </div>
      </div>
  </div>
  </div>
    )}
    
    </div>
  )
}

export default App;
