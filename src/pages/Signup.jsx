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
import { LoadingButton } from '@mui/lab';
import { Toaster } from 'react-hot-toast';

function Signup() {
   const [loading, setLoading] = useState(false);
  // const [isLoading, setLoading] = useState(false);
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
      Toaster.success('Signed Up Successfully', {
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
<>

<div className="account-pages my-5 pt-sm-5">
      <Toaster />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-6">
                        <div className="card overflow-hidden">
                            <div className="bg-primary-subtle">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="text-primary p-4">
                                            <h5 className="text-primary">Welcome !</h5>
                                            <p>Register to  Moringa School</p>
                                        </div>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <img src="assets/images/profile-img.png" alt="" className="img-fluid"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0"> 
                                <div className="auth-logo">
                                    <a href="index.html" className="auth-logo-light">
                                        <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ0mzMNrvCYOAOts7eKAIQNC10xCqzYUtGQ&s" alt="" className="rounded-circle" height="34"/>
                                            </span>
                                        </div>
                                    </a>

                                    <a href="index.html" className="auth-logo-dark">
                                        <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ0mzMNrvCYOAOts7eKAIQNC10xCqzYUtGQ&s" alt="" className="rounded-circle" height="34"/>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="p-2">
                                <form className='form-horizontal text-start' onSubmit={handleSubmit}>        
      <div className="mb-4 w-full flex"> 
            <div className='mb-3'>
            <label className="form-label">First Name</label>   
                <input className=" form-control" type="text" name="first_name" placeholder="Student First Name" />
            </div>
        </div>
        <div className="mb-4 w-full flex"> 
            <div className='mb-3'>
            <label className="form-label">Last Name</label>   
                <input className=" form-control " type="last_name" name="last_name" placeholder="Student Last Name" />
            </div>
        </div>
        <div className="mb-4 w-full flex"> 
            <div className='mb-3'>
            <label className="form-label">National ID/Birth Number</label>    
                <input className=" form-control " type="student_id" name="student_id" placeholder="National ID/Birth Certificate Number" />
            </div>
        </div>
        <div className="mb-4 w-full flex"> 
            <div className='mb-3'>
            <label className="form-label">Email *</label>   
                <input className=" form-control " type="text" name="email" placeholder="Enter your Email Address" />
            </div>
        </div>        
        <div className="mb-4 w-full flex"> 
            <div className='mb-3'>
            <label className="form-label">Phone Number</label>  
                <input className=" form-control " type="number" name="phone" placeholder="Enter your phone Number" />
            </div>
        </div>        
        <div className="mb-4 w-full flex"> 
            <div className='mb-3'>
            <label className="form-label">  Course Name</label>   
                <input className=" form-control " type="course_name" name="course_name" placeholder="Student Course Name" />
            </div>
        </div>
        <div className="mb-4 w-full flex"> 
            <div className='mb-3'>
            <label className="form-label">Password</label>   
                <input className=" form-control "type="password" name="password" placeholder="Assign Temporary Password" />
            </div>
        </div>
        {
          loading? (
            <div className="mt-3 d-grid">
              <button type="submit" className="btn btn-primary waves-effect waves-light"> 
                <CgSpinnerTwo className='spin'/>
              </button>
            </div>
          ): (
            <div className="mt-3 d-grid">
              <button type="submit" className="btn btn-primary waves-effect waves-light">Register</button>
            </div>
          )
        }
      </form>
                                </div>
            
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            
                            <div>
                                <p>Don't have an account ? <a href="/" className="fw-medium text-primary"> SignIn now </a> </p>
                                {/* <p>© <script>document.write(new Date().getFullYear())</script> Skote. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>



</>
  )
}

export default Signup;