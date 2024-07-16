
import React from 'react'
import { AiOutlineBars } from 'react-icons/ai'
import CardHeader from '../../components/CardHeader';

function CourseRegistration({courseData, userData}) {
  const cohort = JSON.parse(localStorage.getItem('cohortName'));
  return (
    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">Course Registration</h4>

                          
                

                </div>
            </div>
        </div>
    <div className="row">
      <div className="col-xl-12">
       <div className="card ">
        <CardHeader title={"Course Registration"}/>
      <div className="">
        <div className="row pb-4 ">
          <div className="col-6">
              <p className='form-control fw-bold'>Student Number:<span className='fw-medium ps-3  font-medium'>{userData.registration_number}</span></p>
          </div>    
          <div className="col-6">
              <p className='form-control fw-bold'>Student Name:<span className='fw-medium ps-3 font-medium'>{userData.first_name} {userData.last_name}</span></p>
          </div>    
          <div className="col-6">
              <p className='form-control fw-bold '>Course Name:<span className='fw-medium ps-3 font-medium'>{courseData.name ? courseData.name : 'Loading...'}</span></p>
          </div>    
          <div className="col-6">
              <p className='form-control fw-bold '>Cohort:<span className='fw-medium ps-3 font-medium'>{cohort ? cohort : "Loading..."}</span></p>
          </div>    
          <div className="col-6">
              <p className=' form-control fw-bold'>Email:<a href='mailto:student@moringa.co.ke' className='fw-medium ps-3 font-medium'>{userData.email}</a></p>
          </div>    
          <div className="col-6">
              <p className='form-control fw-bold '>Start Date:<span className='fw-medium ps-3 font-medium'>{new Date(JSON.parse(localStorage.getItem('startDate'))).toDateString()}</span></p>
          </div>           
        </div> 
      </div>
      <div className="">
        <div className="">
          <AiOutlineBars className='text-[25px] text-text_color mr-2'/>
          <p>Registered Course List</p>
        </div>
        <div className="">
            <div className="">
              <p className='w-full'>{courseData ? courseData.name : 'Loading...'}</p>
              <p className='w-full'>Duration <span>{courseData.period ? courseData.period : 'Loading...'} Months</span></p>
              <button className='btn btn-primary px-3'>Active</button>
            </div>
            
        </div>
        
      </div>

    </div> </div> </div> </div> </div> </div>
  )
}

export default CourseRegistration