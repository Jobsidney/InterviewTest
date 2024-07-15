import axios from 'axios'
import { getConstituencies, getCounties } from 'kenya-administrative-divisions'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'



function EditBankInfo({student,handleClose,rerender}) {

    const [isLoadingButton,setLoadingButton] = useState(false);
    const [formData, setFormData] = useState(
        {
            ...student
    }
    )
    const navigate=useNavigate();
    const authT=getCookie('_auth');
    const config = {
        headers: { Authorization: `Bearer ${authT}` }
    };


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
                    bank_name: formData.bank_name,
                    bank_account_number: formData.bank_account_number,
                    
                 },
                 headers: { Authorization: `Bearer ${authT}` }
             }
             
             ).then(response =>{
                console.log('RESPONSEEEEE');
                
                console.log(response);
                rerender()
                
    
             }).catch(error =>{
                console.log(error);
                
             })
        

        console.log(formData);
         
      }
       
    
  return (
    <div className="h-100 d-flex flex-column justify-content-center">
        <div className='card col-md-4 col-10 m-auto my-md-auto my-2 '>
       
            <div className="modal-dialog card-body modal-dialog-centered mx-4 my-4 ">

                <div className="modal-content">
                
                    <div className="modal-header mb-3">
                        <h5 className="modal-title" id="myLargeModalLabel">Update Bank Details</h5>
                        <button onClick={handleClose} type="button" className="btn-close"  ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="mb-3">
                        <label >Bank Name</label>
                        <select value={formData.bank_name} defaultValue=""
                                        name="bank_name"
                                        className="form-control form-select"
                                        id="bank_name"
                                        
                                        onChange={(event) => setFormData({...formData,['bank_name']:event.target.value})}
                                        >
                                            <option value="" ></option>
                                        <option value="Kcb" >KCB</option>
                                        <option value="Coop">Cooperative</option>
                                        <option value="Equity">Equity</option>
                                        </select>
                                        </div>

                            <div className="mb-3">
                                <label >Bank_account_number</label>
                                <div className="input-group" >
                                    <input type="number" className="form-control " placeholder=""  value={formData.bank_account_number} name="bank_account_number" id="bank_account_number" onChange={onChange}/>
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

export default EditBankInfo;