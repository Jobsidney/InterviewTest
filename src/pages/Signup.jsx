import React from 'react'
import logo from '../Images/logo.png'
import { useState, useEffect } from 'react';
import { TiLockClosed } from 'react-icons/ti'
import { MdEmail } from 'react-icons/md'
import { BiSolidUser } from 'react-icons/bi'
import { BsBookHalf } from 'react-icons/bs'
import { FaBirthdayCake } from 'react-icons/fa'
import { BiSolidPhone } from 'react-icons/bi'
import { CgSpinnerTwo } from 'react-icons/cg'
import { toast } from 'react-toastify';

function Signup() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    formDataObject['registration_date'] = new Date().toISOString();
    setTimeout(()=>{
      setLoading(false);
      toast.success('Signed Up Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        style: {
          backgroundColor: '#22272c',
          color: 'white',
        },   
      })
    }, 3000)
}

  return (
<div className="flex h-screen w-full items-center overflow-hidden justify-center bg-primary bg-cover bg-no-repeat" >
  <div className="rounded-xl w-11/12 md:w-3/6 scroll max-h-full overflow-y-auto bg-secondary bg-opacity-50 px-2 md:px-10 py-4 md:py-10 shadow-lg backdrop-blur-md ">
    <div className="text-secondary_2">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="mb-2 text-2xl text-secondary_2 uppercase font-semibold">Student Registration</h1>
        <img className='w-[120px] h-[120px] object-cover' src={logo} alt="logo" />
        <span className="text-secondary_2 font-semibold capitalize">Student Details</span>
      </div>
      <form className='w-full' onSubmit={handleSubmit}>        
      <div className="mb-4 w-full flex"> 
            <div className='w-full flex rounded-3xl border-none bg-primary bg-opacity-50 px-2 py-3  placeholder-secondary_2 text-secondary_2 placeholder:opacity-30 placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]'>
                <BiSolidUser className='text-[22px]'/>    
                <input className=" flex-1 bg-transparent h-full pl-2  placeholder-secondary_2 placeholder:opacity-30 placeholder:text-sm outline-none" type="text" name="first_name" placeholder="Student First Name" />
            </div>
        </div>
        <div className="mb-4 w-full flex"> 
            <div className='w-full flex rounded-3xl border-none bg-primary bg-opacity-50 px-2 py-3  placeholder-secondary_2 text-secondary_2 placeholder:opacity-30 placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]'>
                <BiSolidUser className='text-[22px]'/>    
                <input className=" flex-1 bg-transparent h-full pl-2  placeholder-secondary_2 placeholder:opacity-30 placeholder:text-sm outline-none " type="last_name" name="last_name" placeholder="Student Last Name" />
            </div>
        </div>
        <div className="mb-4 w-full flex"> 
            <div className='w-full flex rounded-3xl border-none bg-primary bg-opacity-50 px-2 py-3  placeholder-secondary_2 text-secondary_2 placeholder:opacity-30 placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]'>
                <FaBirthdayCake className='text-[22px]'/>    
                <input className=" flex-1 bg-transparent h-full pl-2  placeholder-secondary_2 placeholder:opacity-30 placeholder:text-sm outline-none " type="student_id" name="student_id" placeholder="National ID/Birth Certificate Number" />
            </div>
        </div>
        <div className="mb-4 w-full flex"> 
            <div className='w-full flex rounded-3xl border-none bg-primary bg-opacity-50 px-2 py-3  placeholder-secondary_2 text-secondary_2 placeholder:opacity-30 placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]'>
                <MdEmail className='text-[22px]'/>    
                <input className=" flex-1 bg-transparent h-full pl-2  placeholder-secondary_2 placeholder:opacity-30 placeholder:text-sm outline-none " type="text" name="email" placeholder="Enter your Email Address" />
            </div>
        </div>        
        <div className="mb-4 w-full flex"> 
            <div className='w-full flex rounded-3xl border-none bg-primary bg-opacity-50 px-2 py-3  placeholder-secondary_2 text-secondary_2 placeholder:opacity-30 placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]'>
                <BiSolidPhone className='text-[22px]'/>    
                <input className=" flex-1 bg-transparent h-full pl-2  placeholder-secondary_2 placeholder:opacity-30 placeholder:text-sm outline-none " type="number" name="phone" placeholder="Enter your phone Number" />
            </div>
        </div>        
        <div className="mb-4 w-full flex"> 
            <div className='w-full flex rounded-3xl border-none bg-primary bg-opacity-50 px-2 py-3  placeholder-secondary_2 text-secondary_2 placeholder:opacity-30 placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]'>
                <BsBookHalf className='text-[22px]'/>    
                <input className=" flex-1 bg-transparent h-full pl-2  placeholder-secondary_2 placeholder:opacity-30 placeholder:text-sm outline-none " type="course_name" name="course_name" placeholder="Student Course Name" />
            </div>
        </div>
        <div className="mb-4 w-full flex"> 
            <div className='w-full flex rounded-3xl border-none bg-primary bg-opacity-50 px-2 py-3  placeholder-secondary_2 text-secondary_2 placeholder:opacity-30 placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]'>
                <TiLockClosed className='text-[22px]'/>    
                <input className=" flex-1 bg-transparent h-full pl-2  placeholder-secondary_2 placeholder:opacity-30 placeholder:text-sm outline-none "type="password" name="password" placeholder="Assign Temporary Password" />
            </div>
        </div>
        {
          loading? (
            <div className="mt-8 flex justify-center text-lg">
              <button type="submit" className="rounded-3xl bg-primary text-[27px] bg-opacity-50 px-16 py-3 capitalize font-bold shadow-xl backdrop-blur-md text-secondary_2 transition-colors duration-300  hover:bg-secondary"> 
                <CgSpinnerTwo className='spin'/>
              </button>
            </div>
          ): (
            <div className="mt-8 flex justify-center text-lg">
              <button type="submit" className="rounded-3xl bg-primary bg-opacity-50 px-10 py-3 capitalize font-bold shadow-xl backdrop-blur-md text-secondary_2 transition-colors duration-300 hover:text-white hover:bg-secondary">Register</button>
            </div>
          )
        }
      </form>
    </div>
  </div>
</div>
  )
}

export default Signup;