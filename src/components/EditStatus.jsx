import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function EditStatus({studentData,handleClose,rerender,apiPath,apiPromotePath,studentRegData}) {

    const [isLoadingButton,setLoadingButton] = useState(false);
    const [formData, setFormData] = useState({status:studentData.status, })
  

    const onChange = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value})   
       }
       const navigate=useNavigate();

console.log("Reg data");
console.log(studentRegData);




      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        setLoadingButton(true);
      
         
      }
       
  return (
    <div className='d-flex flex-column justify-content-center h-100 align-items-center col-12'>
    <div className="card col-md-3 col-3 m-auto my-md-5 my-auto p-3">
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
                        <h4 className="text-primary">Update Student Status!</h4>
                        <p className="text-muted font-size-14 mb-4"></p>

                        <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xl-12">
                                        <div className="card">
                                            <div className="card-body">
                                            <div className="col-md-12">
                                            <div className="mb-3">
                                                <label  className="form-label">Status</label>
                                                <select type="text" className="form-control" id="" placeholder="Status" name="status" value={formData.status} onChange={onChange}>
                                                <option value="promote">Promote</option>
                                                                    <option value="hold">Hold</option>
                                                                    <option value="discontinue">Discontinue</option>
                                                                    <option value="ongoing">ongoing</option>
                                                                     {studentData.level==="year_one" || studentData.level==="year_two" ||studentData.level==="year_three" || studentData.level==="year_four" ? <option value="alumni">Graduate</option>:"" }
                                                </select>
                                            </div>
                                            {
                                                formData.status=="discontinue"
                                                ?
                                                <div className="mb-3">
                                                <label  className="form-label">Reason</label>
                                                <select type="text" className="form-control" id="" placeholder="reason" name="reason" value={formData.reason} onChange={onChange}>
                                                <option value="Irresponsible behavour">Irresponsible behavour</option>
                                                                    <option value="Poor Perfomance">Poor Perfomance</option>
                                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>
                                            :
                                            ""
                                            }
                                        </div>
                                 
                                                    <div className='mx-auto col-md-6 my-5'>
                                                        {isLoadingButton?
                                                        <LoadingButton loading  className="btn btn-primary text-white  w-100"   >
                                                        <button type="submit" className="btn btn-primary  w-100"></button> 
                                                        </LoadingButton>
                                                        : 
                                                        <button type="submit" className="btn btn-primary  w-100">Update Student Status  <i className="mdi mdi-paper-plane"></i></button>
                                                        }
                                                    
                                                        
                                                    </div>
                                                
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

export default EditStatus