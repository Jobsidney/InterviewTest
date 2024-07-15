import React from 'react'
import { AiOutlineBars } from 'react-icons/ai'

function CourseRegistration({courseData, userData}) {
  const cohort = JSON.parse(localStorage.getItem('cohortName'));
  return (
    <div className='w-full h-full px-4 py-2 '>
      <div className="w-full h-auto flex mt-3 flex-col md:flex-row bg-light-secondary_2 dark:bg-dark-secondary_2 rounded-md">
        <div className="w-full pb-4 md:grid md:grid-cols-2 rounded-md bg-light-secondary_2 dark:bg-dark-secondary_2 flex-1">
          <div className="w-full ">
              <p className='w-11/12 flex shadow-lg bg-light-bg_white dark:bg-dark-bg_white justify-between mx-auto mt-4 rounded-md py-2 px-2 text-text_color font-semibold bg-text_color capitalize'>Student Number:<span className='uppercase  font-medium'>{userData.registration_number}</span></p>
          </div>    
          <div className="w-full ">
              <p className='w-11/12 flex shadow-lg justify-between bg-light-bg_white dark:bg-dark-bg_white mx-auto mt-4 rounded-md py-2 px-2 text-text_color font-semibold bg-text_color capitalize'>Student Name:<span className='capitalize font-medium'>{userData.first_name} {userData.last_name}</span></p>
          </div>    
          <div className="w-full ">
              <p className='w-11/12 flex shadow-lg justify-between bg-light-bg_white dark:bg-dark-bg_white mx-auto mt-4 rounded-md py-2 px-2 text-text_color font-semibold bg-text_color capitalize '>Course Name:<span className='capitalize font-medium'>{courseData.name ? courseData.name : 'Loading...'}</span></p>
          </div>    
          <div className="w-full ">
              <p className='w-11/12 flex shadow-lg justify-between bg-light-bg_white dark:bg-dark-bg_white mx-auto mt-4 rounded-md py-2 px-2 text-text_color font-semibold bg-text_color capitalize '>Cohort:<span className='uppercase font-medium'>{cohort ? cohort : "Loading..."}</span></p>
          </div>    
          <div className="w-full ">
              <p className='w-11/12 flex shadow-lg justify-between bg-light-bg_white dark:bg-dark-bg_white mx-auto mt-4 rounded-md py-2 px-2 text-text_color font-semibold bg-text_color'>Email:<a href='mailto:student@moringa.co.ke' className='font-medium'>{userData.email}</a></p>
          </div>    
          <div className="w-full ">
              <p className='w-11/12 flex shadow-lg justify-between bg-light-bg_white dark:bg-dark-bg_white mx-auto mt-4 rounded-md py-2 px-2 text-text_color font-semibold bg-text_color capitalize '>Start Date:<span className='capitalize font-medium'>{new Date(JSON.parse(localStorage.getItem('startDate'))).toDateString()}</span></p>
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

      {/* <div className="w-full h-auto mt-6 mb-4 flex flex-col shadow-xl">
        <div className="flex items-center w-full h-auto py-2 px-4 rounded-t-md font-semibold bg-light-secondary dark:bg-dark-secondary">
          <AiOutlineBars className='text-[25px] mr-2'/>
          <p className='w-full'>Re-Affirm Course Here</p>
        </div>
        <div className="w-full h-full bg-light-secondary_2 dark:bg-dark-secondary_2 shadow-lg border border-light-primary dark:border-dark-primary px-4 py-2 rounded-b-md">
          <div className="flex justify-between px-2 py-2 items-center shadow-lg md:px-4 mb-2 rounded-md bg-light-bg_white dark:bg-dark-bg_white">
            <p >Supplimentary</p>
            <button className='bg-light-bg_white dark:bg-dark-bg_white shadow-lg border border-light-primary dark:border-dark-primary rounded-md py-2 px-4 font-semibold min-w-[130px]'>Suppliment</button>
          </div>
          <div className="flex justify-between px-2 py-2 items-center shadow-lg md:px-4 mb-2 rounded-md bg-light-bg_white dark:bg-dark-bg_white">
            <p >Retake</p>
            <button className='bg-light-bg_white dark:bg-dark-bg_white shadow-lg border border-light-primary dark:border-dark-primary rounded-md py-2 px-4 font-semibold min-w-[130px]'>Retake</button>
          </div>
        </div>
        
      </div> */}
    </div>
  )
}

export default CourseRegistration