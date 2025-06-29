import React, { useState } from 'react'
import RightSideBar from '../components/RightSideBar'
import ChatComponent from '../components/ChatComponent'
import Sidebar from '../components/sidebar'

const HomePage = () => {

  const [SeletedUser,setSeletedUser]=useState(false);

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
    <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${SeletedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]': 'md:grid-cols-2'}`}>
      <Sidebar/>
      <ChatComponent/>
      <RightSideBar/>
    </div>
    </div>
  )
}

export default HomePage
