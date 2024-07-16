import React from 'react'
import { AiOutlineBars } from 'react-icons/ai'

function Results() {
  const cohort = JSON.parse(localStorage.getItem('cohortName'));
  return (

    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">Provision Results</h4>

                          
                

                </div>
            </div>
        </div>
    <div className="row">
      <div className="col-xl-12">
       <div className="card ">
       <div className="col-lg-8 mx-auto text-center mb-md-5">
       <img
              className=" object-cover" width={"80px"}
              src={'/src/Images/logo.png'}
              alt="logo"
            />
            <h4 className="card-title mb-4"> {cohort} By weekly IP Results </h4>
       </div>
        <div className="">
            <div className="d-flex flex-row justify-content-between shadow-lg   px-2 px-md-3 py-2 py-md-3  mb-2  rounded-md bg-light-bg_white">
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
            <div className="d-flex flex-row justify-content-between shadow-lg   px-2 px-md-3 py-2 py-md-3  mb-2  rounded-md bg-light-bg_white">
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
    </div>
    </div>
    </div>
    </div>
  )
}

export default Results