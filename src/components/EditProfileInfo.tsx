import axios from 'axios'
import { getConstituencies, getCounties } from 'kenya-administrative-divisions'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getCookie } from 'typescript-cookie'



type Props = {
    student:Values,
    handleClose:() =>void,
    rerender:() =>void,
    }
    interface Values {
        name:string,
        kt_no:string,
        county:string,
        sub_county:string,
        enrollment_year: number,
        age: number,
        gender: string
        kcpe_index: number,
        kcpe: number,
       nemis_no: number,
        high_school: string,
        electricity_solar: string,
        gurdian_name: string,
        gurdian_id: number,
        gurdian_contact: number,
        gurdian_relation: string,
        bank_name: string,
        bank_account_number:number
    
    
    }

function EditProfileInfo({student,handleClose,rerender}:Props) {

    const [formData, setFormData]:Values = useState(
        {
            ...student
    }
    )
    const [kenyaCounties,setCounties] =useState([]);
    const [subCounties,setSubCounties] =useState([])
    const navigate=useNavigate();
    const authT=getCookie('_auth');
    const config = {
        headers: { Authorization: `Bearer ${authT}` }
    };

    const getSubCountiesFunc=(value)=>{
    getCounties(value).then((data) => {
        //setSubCounties(data);
        
        getConstituencies(data[0].county_code).then((data) => {
           
            setSubCounties(data)
            }).catch((error) => {
        });
        
        
        }).catch((error) => {
        console.log(error);
    })}

    useEffect(()=>{
        getCounties().then((data) => {
            setCounties(data);
            
            }).catch((error) => {
            console.log(error);
        });
        getSubCountiesFunc(student.county)
    },[])

    const onChangeCounty = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 
        setFormData({...formData, county: event.target.value});
        

        
        // getConstituencies(1).then((data) => {
        //     setSubCounties(data);
            
        //     }).catch((error) => {
        //     console.log(error);
        // })
        getCounties(formData.county).then((data) => {
            //setSubCounties(data);
            console.log(data);
            
            
            }).catch((error) => {
            console.log(error);
        })
        console.log(formData);
       }


    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

       const handleSubmit = async (event: React. FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        
            axios(
                { 
                 method: 'patch',
                 url:`http://139.84.236.55:8000/api/scholar_registration/${student.id}`,
                 data:{
                    name: formData.name,
                    county: formData.county,
                    sub_county:formData.sub_county,
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
       
            <div className="modal-dialog card-body modal-dialog-centered">

                <div className="modal-content">
                
                    <div className="modal-header">
                        <h5 className="modal-title" id="myLargeModalLabel">Edit Profile</h5>
                        <button onClick={handleClose} type="button" className="btn-close"  ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-horizontal" onSubmit={handleSubmit}>
                        
                            <div className="mb-3">
                                <label  className="form-label">Email</label>
                                <input type="email" className="form-control " id="useremail" value={formData.student_email} name="email" placeholder="Email"  />
                                <div className="text-danger" id="emailError" data-ajax-feedback="email"></div>
                            </div>

                            <div className="mb-3">
                                <label  className="form-label">Name</label>
                                <input type="text" className="form-control " value={formData.name} id="username" name="name"  placeholder="Enter Name" onChange={onChange}/>
                                <div className="text-danger" id="nameError" data-ajax-feedback="name"></div>
                            </div>

                            <div className="mb-3">
                                <label >Date of Birth</label>
                                <div className="input-group" id="datepicker1">
                                    <input type="date" className="form-control " placeholder="dd-mm-yyyy"  value={formData.dob} name="dob" id="dob" onChange={onChange}/>
                                    {/* <span className="input-group-text"><i className="mdi mdi-calendar"></i></span> */}
                                </div>
                                <div className="text-danger" id="dobError" data-ajax-feedback="dob"></div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                      <div className="mb-3">
                                          <label  className="form-label">Country</label>
                                          <input type="text" className="form-control" id="formrow-inputZip" disabled value='Kenya' placeholder="Enter Country" name="country" />
                                      </div>
                                  </div>
                                  <div className="col-lg-4">
                                      <div className="mb-3">
                                          <label className="form-label">County</label>
                                          <select name="county" value={formData.county} className="form-control form-select" onChange={(event)=>{
                                                setFormData({...formData, ['county']: event.target.value});
                                                getSubCountiesFunc(event.target.value);
                                                console.log(formData);
                                          }} >
                                            <option selected  value=''></option>
                                            {kenyaCounties.map((e, key) => {
                                                return <option key={key} id={e.county_code} value={e.county_name}>{e.county_name}</option>;
                                            })}
                                        </select>
                                      </div>
                                  </div>
                                  <div className="col-lg-4">
                                      <div className="mb-3">
                                          <label  className="form-label">Sub-County</label>
                                          <select  name="sub_county" value={formData.sub_county} className="form-control form-select" onChange={(event)=>{
                                                setFormData({...formData, ['sub_county']: event.target.value});
                                                console.log(formData);
                                          }} >
                                             <option selected  value=''></option>
                                            {subCounties.map((e, key) => {
                                                return <option key={key}  value={e.constituency_name}>{e.constituency_name}</option>;
                                            })}
                                        </select>
                                    
                                      </div>
                                  </div>
                                  
                              </div>

                              <div className="mb-3">
                                <label  className="form-label">Bio Decription</label>
                                <textarea rows="3" className="form-control " value={formData.description} id="username" name="description"  placeholder="Type Bio here..." onChange={onChange}></textarea>
                                <div className="text-danger" id="nameError" data-ajax-feedback="name"></div>
                            </div>

                            <div className="mb-3">
                                <label >Profile Picture</label>
                                <div className="input-group">
                                    <input type="file" className="form-control " id="avatar" name="avatar"  />
                                    <label className="input-group-text" >Upload</label>
                                </div>
                                <div className="text-start mt-2">
                                    <img src={student.high_school_photo_base64 ? student.high_school_photo_base64 :"https://www.capitalfm.co.ke/thesauce/files/2019/02/bigstock-Enjoying-University-Life-90545936.jpg"} alt="" className="rounded-circle avatar-lg"/>
                                </div>
                                <div className="text-danger" role="alert" id="avatarError" data-ajax-feedback="avatar"></div>
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

export default EditProfileInfo;