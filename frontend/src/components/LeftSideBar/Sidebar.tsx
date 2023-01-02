import React from 'react'
import "./Sidebar.scss"
import {GrAdd} from "react-icons/gr"
import {BiInfoCircle,BiDotsHorizontalRounded} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import {FaCheckDouble} from "react-icons/fa"
import {BsTag} from "react-icons/bs"
import { useRecoilState } from "recoil";
import { overlayState } from '../../atom/modalAtom'

interface Props{

}

const Sidebar:React.FC<Props>= () => {
  const [overlay,setOverlay] = useRecoilState(overlayState)

  return (
    <>
    <div
    className='sidebar_container'
    >
        <div 
        onClick={()=>setOverlay(true)}
        className="sidebar_new_task">
          <GrAdd />
          New Task
        </div>
        <div className='sidebar_menu'>
            <div className='sidebar_icon'>
            <BiInfoCircle />
            <span>important</span>
            </div>
            <div className='sidebar_icon'>
            <FaCheckDouble />
            <span>completed</span>
            </div>
            <div className='sidebar_icon'>
            <AiFillDelete />
            <span>Deleted</span>
            </div>
            <div className='sidebar_icon'>
            <BiDotsHorizontalRounded />
            <span>Due soon</span>
            </div>
        </div>

        <div className='sidebar_labels'>
            Labels 
            <BiDotsHorizontalRounded />

        </div>
        <div className='sidebar_menu'>
        <div className='sidebar_icon '>

        <BsTag 
        fill={"#E440E1"} />
            <span>team</span>
            </div>
            <div className='sidebar_icon '>

<BsTag 
fill={"#2cacfc"} />
   <span>medium</span>
    </div>
    <div className='sidebar_icon '>

<BsTag 

fill={"#11d8a0"} />
    <span>high</span>
    </div>
        </div>
    
    
    </div>
    
    </>
  )
}

export default Sidebar