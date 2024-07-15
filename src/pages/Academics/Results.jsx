import React from 'react'
import { AiOutlineBars } from 'react-icons/ai'

function Results() {
  const cohort = JSON.parse(localStorage.getItem('cohortName'));
  return (
    <div className='w-full h-full px-4'>
      <div className="w-full h-auto mt-4 flex rounded-md mb-4 flex-col">
        <div className="flex items-center w-full h-auto py-2 px-4 rounded-t-md font-semibold bg-light-secondary dark:bg-dark-secondary">
          <AiOutlineBars className='text-[25px] text-light-text_color dark:text-dark-text_color mr-2'/>
          <p>Mobile Cohort {cohort} By weekly IP Results </p>
        </div>
        <div className="w-full shadow-lg h-full bg-light-secondary_2 dark:bg-dark-secondary_2 px-4 py-2 rounded-b-md overflow-y-auto">
            <div className="flex justify-between shadow-lg flex-col md:flex-row px-2 py-2 items-center md:px-4 mb-2 rounded-md bg-light-bg_white dark:bg-dark-bg_white">
              <div className="w-full flex md:flex-col md:w-auto">
                <p className='w-full font-semibold'>Project Title</p>
                <p>Hangman</p>
              </div>
              <div className="w-full flex md:flex-col md:w-auto">
                <p className='w-full font-semibold'>Week</p>
                <p>1</p>
              </div>
              <div className="w-full flex md:flex-col md:w-auto">
                <p className='w-full font-semibold'>Month/Year</p>
                <p>12/12/2023</p>
              </div>
              <div className="w-full flex md:flex-col md:w-auto">
                <p className='w-full font-semibold'>Grade</p>
                <p>75%</p>
              </div>              
            </div>
            <div className="flex justify-between flex-col shadow-lg md:flex-row px-2 py-2 items-center md:px-4 mb-2 rounded-md bg-light-bg_white dark:bg-dark-bg_white">
              <div className="w-full flex md:flex-col md:w-auto">
                <p className='w-full font-semibold'>Project Title</p>
                <p>Hangman</p>
              </div>
              <div className="w-full flex md:flex-col md:w-auto">
                <p className='w-full font-semibold'>Week</p>
                <p>1</p>
              </div>
              <div className="w-full flex md:flex-col md:w-auto">
                <p className='w-full font-semibold'>Month/Year</p>
                <p>12/12/2023</p>
              </div>
              <div className="w-full flex md:flex-col md:w-auto">
                <p className='w-full font-semibold'>Grade</p>
                <p>75%</p>
              </div>              
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Results