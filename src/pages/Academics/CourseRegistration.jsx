import React from 'react'
import { AiOutlineBars } from 'react-icons/ai'

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
      <div className="w-full h-auto flex mt-3 flex-col md:flex-row bg-light-secondary_2 dark:bg-dark-secondary_2 rounded-md">
        <div className="row pb-4 md:grid md:grid-cols-2 rounded-md bg-light-secondary_2 dark:bg-dark-secondary_2 flex-1">
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
      <div className="w-full h-auto mt-6 flex flex-col shadow-xl">
        <div className="flex items-center w-full h-auto py-2 px-4 rounded-t-md font-semibold bg-light-secondary dark:bg-dark-secondary">
          <AiOutlineBars className='text-[25px] text-text_color mr-2'/>
          <p>Registered Course List</p>
        </div>
        <div className="w-full h-full bg-light-secondary_2 dark:bg-dark-secondary_2 px-4 py-2 rounded-b-md">
            <div className="flex justify-between flex-col shadow-lg md:flex-row px-2 py-2 items-center md:px-4 mb-2 rounded-md bg-light-bg_white dark:bg-dark-bg_white">
              <p className='w-full'>{courseData ? courseData.name : 'Loading...'}</p>
              <p className='w-full'>Duration <span>{courseData.period ? courseData.period : 'Loading...'} Months</span></p>
              <button className='w-1/2 mt-2 md:mt-0 md:w-auto bg-light-bg_white dark:bg-dark-bg_white shadow-lg border border-light-primary dark:border-dark-primary rounded-md py-2 px-4 font-semibold min-w-[130px]'>Active</button>
            </div>
            
        </div>
        
      </div>

    </div> </div> </div> </div> </div> </div>
  )
}

export default CourseRegistration