import React,{useEffect, useRef, useState} from 'react'
import {BiSearch} from "react-icons/bi"
import {AiFillMessage} from 'react-icons/ai'
import {IoMdNotifications} from 'react-icons/io'
import "./Navbar.scss"
import useWindowDimensions from '../../utils/functions/getScreenWidth'
import { userState } from '../../atom/modalAtom'
import { useRecoilState } from 'recoil'

interface Props{

}
interface User{
  email:string
  name:string 
  id:string
  image_url:string
}


const Navbar:React.FC<Props> = ({}) => {
  
  const [user,setUser] = useRecoilState(userState)
   const [showDropDown,setShowDropDown] = useState(false)
   const{height,width} = useWindowDimensions()
    const[searchShowBar,setShowSearchBar] = useState(true)
   
//    useeffect to chek wheater screen is mobile or desktop and change the menu prefrences according
    useEffect(()=>{

    if(width! <=468){
        setShowSearchBar(false)
    }
    else{
        setShowSearchBar(true)
    }

   },[width])


//    function to show searchbar when clicked on search button

  const searchBarShower = ()=>{
    if(!searchShowBar && width!<=468){
        
    }
   
    
  }



  // logout

  const logOut = ()=>{
    localStorage.removeItem("token")
    setUser({
      email:"",
      name:"",
      id:"",
      image_url:"",
      
    })
  }
   return (
    <>
    <div
    className='navbar_main_container'>

        {/* left side of the navbar that mainly contains icons */}
    <div
    
    
    className='navbar_left'>
   <h1>To Do</h1>
   <p>Welcome to Modern Todo App</p>
    </div>

    {/* right side of the navbar that hold search and other icons */}
    <div className='navbar_right'>
        {/* navbar search bar container that will contain both search icon and input box and merger in same background color */}
      {searchShowBar&&(
 <div className='navbar_search'>
 {/* input container  */}
 <input type="text" placeholder='Search' />
<BiSearch />
 
</div>
      )}
     
     {!searchShowBar&&(
  <div 
      onClick={searchBarShower}
  className='navbar_icon_container'>
  <BiSearch />
  </div>
     )}
    
      <div className='navbar_icon_container message'>
      <AiFillMessage />
      </div>
      <div className='navbar_icon_container notifications'>
      <IoMdNotifications />
      </div>
      <img 
      alt=""
      onClick={()=>setShowDropDown(prev=>!prev)}
      src={user?.image_url}   />
    </div>
   
    </div>
    {showDropDown&&
    <div className='navbar_overlay'>
    <div>{user?.email.split("@")[0]}</div>
    <hr></hr>
    <div
    onClick={()=>logOut()}
    >Logout</div>
    </div>
    }
    
    </>
  )
}

export default Navbar