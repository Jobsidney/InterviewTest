import axios from 'axios'
import { getConstituencies, getCounties } from 'kenya-administrative-divisions'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'





function EditGurdian({student,handleClose,rerender}) {

    const [isLoadingButton,setLoadingButton] = useState(false);
    const [formData, setFormData] = useState(
        {
            ...student
    }
    )
    const [kenyaCounties,setCounties] =useState([]);
    const [subCounties,setSubCounties] =useState([])
    const navigate=useNavigate();
    const authT=getCookie('_auth');
    const onChange = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value})   
      console.log(formData);
      
       }


       axios.interceptors.request.use(
        (config) => { // Replace with your token retrieval logic
          if (authT) {
            config.headers.Authorization = `Bearer ${authT}`;
            return config;
          } else {
            navigate('/login'); // Redirect to login page
            toast.error('Your session has expired. Please log in again.');
            return Promise.reject(new Error('No authorization token'));
          }
        },
        (error) => Promise.reject(error)
      );

       const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        
            axios(
                { 
                 method: 'patch',
                 url:`http://139.84.236.55:8000/api/scholar_registration/${student.id}`,
                 data:{
                    gurdian_name: formData.gurdian_name,
                    gurdian_relation: formData.gurdian_relation,
                    gurdian_contact:formData.gurdian_contact,
                    gurdian_id:formData.gurdian_id,
                 },
                 headers: { Authorization: `Bearer ${authT}` }
             }
             
             ).then(response =>{
                console.log('RESPONSEEEEE');
                
                console.log(response);
                rerender()
                
    
             }).catch(error =>{
               
                
             })
         
      }
       
    
  return (
    <div className="h-100 d-flex flex-column justify-content-center">
        <div className='card col-md-4 col-10 m-auto my-md-auto my-2 '>
       
            <div className="modal-dialog card-body modal-dialog-centered mx-0">

                <div className="modal-content">
                
                    <div className="modal-header mb-3">
                        <h5 className="modal-title" id="myLargeModalLabel">Update Gurdian Information</h5>
                        <button onClick={handleClose} type="button" className="btn-close"  ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label  className="form-label">Gurdian Name</label>
                                <input type="text" className="form-control " value={formData.gurdian_name} id="username" name="gurdian_name"  placeholder="Enter gurdian_name" onChange={onChange}/>
                                <div className="text-danger" id="nameError" ></div>
                            </div>

                            <div className="mb-3">
                                <label >Phone</label>
                                <div className="input-group" id="datepicker1">
                                    <input type="text" className="form-control " placeholder="dd-mm-yyyy"  value={formData.gurdian_contact} name="gurdian_contact" id="gurdian_contact" onChange={onChange}/>
                                    {/* <span className="input-group-text"><i className="mdi mdi-calendar"></i></span> */}
                                </div>
                               
                            </div>
                            <div className="mb-3">
                                <label >Gurdian_ID</label>
                                <div className="input-group" id="datepicker1">
                                    <input type="number" className="form-control " placeholder="gurdian_id"  value={formData.gurdian_id} name="gurdian_id" id="gurdian_id" onChange={onChange}/>
                                    {/* <span className="input-group-text"><i className="mdi mdi-calendar"></i></span> */}
                                </div>
                               
                            </div>
                            <div className="mb-3">
                                <label >Gurdian_relation</label>
                                <div className="input-group" id="datepicker1">
                                    <input type="text" className="form-control " placeholder="gurdian_relation"  value={formData.gurdian_relation} name="gurdian_relation" id="gurdian_relation" onChange={onChange}/>
                                    {/* <span className="input-group-text"><i className="mdi mdi-calendar"></i></span> */}
                                </div>
                               
                            </div>
                           



                            <div className="mt-3 d-grid">
                                <button className="btn btn-primary waves-effect waves-light UpdateProfile" data-id="2" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditGurdian;