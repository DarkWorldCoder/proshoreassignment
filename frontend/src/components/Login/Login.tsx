import React, { useState } from 'react'
import {useRecoilState} from "recoil"
import {instance as axios} from "../../axios"
import "./Login.scss"
import { userState } from '../../atom/modalAtom';
type Props = {}

const Login = (props: Props) => {
 const[loginType,setLoginType] = useState("login")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [user,setUser] = useRecoilState(userState)
  const[error,setError] = useState("")
  const validateEmail = (email:string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }


  const handleLogin = async()=>{
    
    try{

      if(validateEmail(email) && password.length>1){
        setError("")
        const {data} = await axios.post("/api/user/login",{
          email:email,
          password:password
        },
        config
        )
        
        setUser(data.user)
        localStorage.setItem("token",data.jwt)
      }
      else{
        setError("Email must be valid and password must be greater the 8 character")
      }
    }
    catch(error){
      setError("Invalid Credentials")
    }

  }

  const handleRegister = async()=>{
    try{
       if(password!== confirmPassword){
        setError("Password and Confirm password must be same")
        return
       }
      if(validateEmail(email) && password.length>7){
        setError("")
        const {data} = await axios.post("/api/user/register",{
          email:email,
          password:password
        },
        config
        )
        
        setUser(data.user)
        localStorage.setItem("token",data.jwt)
      }
      else{
        setError("Email must be valid and password must be greater the 8 character")
      }
    }
    catch(error){
      setError("Error Registering")
    }
  }
  const handleSubmit = ()=>{
    if(loginType==="login"){
      handleLogin()
     
    }else{
     handleRegister()
    }
     
  }
  return (
    <div
    className='login_container'
    >
    <div className='login_box'>
      <div className="login_header">
    <h1>To Do</h1>
   <p>Welcome to Modern Todo App</p>
   <hr></hr>
 </div>
 {error.length >=1 &&
 
 <div className="error">{error}</div>
 }
{loginType==="login"?(
  <>
   <div className='input_box'>
    <label>Email</label>
    <input 
    value={email}
    placeholder='Email Address'
    onChange={e=>setEmail(e.target.value)}
    type="email" />
   </div>
   <div className='input_box'>
    <label>Password</label>
    <input type="password"
     placeholder='Password'
      value={password}
      onChange={e=>setPassword(e.target.value)}
    />
   </div>
   <div className='submit_btn'>
    <div 
    onClick={handleSubmit}
    className='btn'>Submit</div>
   </div>
   <div className='register'>
     Don't Have an Account?<div
          onClick={()=>{
            setError("")
            setLoginType(prev=>prev==="login"?"register":"login")
          
          }}>Register</div>
   </div>
   </>
):(
  <>
   <div className='input_box'>
    <label>Email</label>
    <input 
    placeholder='Email Address'
    value={email}
    onChange={e=>setEmail(e.target.value)}
    type="email" />
   </div>
   <div className='input_box'>
    <label>Password</label>
    <input type="password"
    placeholder='Password'
      value={password}
      onChange={e=>setPassword(e.target.value)}
    />
   </div>
   <div className='input_box'>
    <label>Confirm Password</label>
    <input 
    placeholder='Confirm Password'
    type="password"
      value={confirmPassword}
      onChange={e=>setConfirmPassword(e.target.value)}
    />
   </div>
   <div className='submit_btn'>
    <div 
    onClick={handleSubmit}
    className='btn'>Submit</div>
   </div>
   <div className='register'>
     Already Have an Account?<div
      onClick={()=>{
        setError("")
        setLoginType(prev=>prev==="login"?"register":"login")
      
      }}
     >Login</div>
   </div>
   </>
)}

    </div>
   
   
  </div>

  )
}

export default Login