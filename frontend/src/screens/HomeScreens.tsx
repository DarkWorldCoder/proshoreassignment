import React from 'react'
import Sidebar from '../components/LeftSideBar/Sidebar'
import "./HomeScreens.scss"
import Right from '../components/RightSide/Right'
interface Props{}

const HomeScreens:React.FC<Props> = ({}) => {
  return (
    <div className='home_container'>
      <Sidebar />
      <Right />
    </div>
  )
}

export default HomeScreens