import React, { useState } from 'react'
import profilePic from '../../Images/logo2.png'
import {HiBars3 } from 'react-icons/hi2'
function Header({handleSidebar}) {
  

  return (
    <div className='w-full h-full flex justify-between items-center'>
        <div onClick={() => handleSidebar()} className="md:hidden w-[40px] h-[40px] transition duration-500 rounded-[50%] hover:bg-white grid place-content-center cursor-pointer">
          <HiBars3 className='text-[30px] text-secondary_2 font-bold'/>
        </div>
        <div className="w-max h-[40px] md:w-full md:justify-end gap-3 flex items-center">
            <p className='hidden md:block capitalize font-semibold'>Moringa Student Portal</p>
            <img className='w-[40px]  h-[40px] object-cover  drop-shadow-md bg-white dark:bg-dark-secondary_2 rounded-[50%]' src={profilePic} alt="" />
        </div>
    </div>
  )
}

export default Header