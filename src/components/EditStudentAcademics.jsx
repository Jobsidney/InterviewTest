import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function EditStudentAcademics({studentData,handleClose,rerender}) {

    const [isLoadingButton,setLoadingButton] = useState(false);
    const [formData, setFormData]= useState(
    )
    const onChange = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value})   
       }
       const navigate=useNavigate();
    

      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        setLoadingButton(true);

      }
     
      
       
  return (
    <div className='d-flex flex-column justify-content-center col-12'>
    <div className="card col-md-6 col-10 m-auto my-md-5 my-2 p-3">
        <div className="modal-header border-bottom-0 d-flex flex-row justify-content-end px-3">
            <button onClick={handleClose} type="button" className="btn-close"  ></button>
        </div>
        <div className="modal-body">
            <div className="text-center mb-4">
                <div className="avatar-md mx-auto mb-4">
                    <div className="avatar-title bg-light rounded-circle text-primary h1">
                        <i className="mdi mdi-school"></i>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <h4 className="text-primary">Update Student Info!</h4>
                        <p className="text-muted font-size-14 mb-4"></p>

                        <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xl-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title mb-4">Student Information</h3>
                                                    <div className="row">
                                                        
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label  className="form-label">Student Last Name</label>
                                                                <input type="text" className="form-control" id="" disabled placeholder="Student Name" name="name" value={studentData.last_name} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                        <div className="mb-3 col-12">
                                                        <label  className="form-label">Student First Name </label>
                                                        <input type="text" disabled className="form-control" id="kt_no" placeholder="Enter KTNO number" name="kt_no"  value={studentData.first_name} autoComplete='false' />
                                                    </div>
                                                           
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                    <div className="mb-3 col-12">
                                                                <label  className="form-label">registration_number</label>
                                                                <input type="text" className="form-control" id="" disabled placeholder="Gender" name="gender" value={studentData.registration_number} onChange={onChange} required />
                                                            </div>
                                                
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label  className="form-label">Student ID</label>
                                                                <input type="text" className="form-control" id="" disabled placeholder="Status" name="status" value={studentData.id} onChange={onChange}  required />
                                                            </div>
                                                        </div>
                                                       
                                                        </div>
                                                        
                                                    </div>
                                                  
                                  

                                                    
                                                    <div className='mx-auto col-md-6 my-5'>
                                                        {isLoadingButton?
                                                        <LoadingButton loading  className="btn btn-primary text-white  w-100"   >
                                                        <button type="submit" className="btn btn-primary  w-100"></button> 
                                                        </LoadingButton>
                                                        : 
                                                        <button type="submit" className="btn btn-primary  w-100">Update Now Student  <i className="mdi mdi-paper-plane"></i></button>
                                                        }
                                                    
                                                        
                                                    </div>
                                                
                                            </div>
                                            
                                        </div>
                            </div>
                       
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditStudentAcademics