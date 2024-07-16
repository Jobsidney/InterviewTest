import React from "react";

import Chart from 'react-apexcharts'
import BarChat from "./AdminCharts/BarChat";
import DonutChart from "./AdminCharts/DonutChart";
import UpcomingActivities from "../components/UpcomingActivities";
import LatestStudenUpdate from "../components/LatestStudenUpdate";
function AdminDashboard({ courseData, mentors, students, studentPerCourse }) {  


 
  return (
    <div className="main-content">
    <div className="page-content">
                        <div className="container-fluid">

                            
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                        <h4 className="mb-sm-0 font-size-18">Dashboard</h4>

                                        

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                <div className="row">
                                    
                                        <a href="/" className="col-md-3">
                                            <div className="card mini-stats-wid">
                                                <div className="card-body text-start">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Registered Students</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">{students && students.length > 0 ? students.length : "0"}  </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">Students</small>
                                                            </div>
                                                        </div>

                                                        <div className="flex-shrink-0 align-self-center">
                                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                                                <span className="avatar-title">
                                                                    <i className="mdi mdi-book-education font-size-24"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="/inuka" className="col-md-3">
                                            <div className="card mini-stats-wid">
                                                <div className="card-body text-start">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Registered Course Units</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">{courseData && courseData.length > 0 ? courseData.length : "0"}  </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">Courses</small>
                                                            </div>
                                                        </div>

                                                        <div className="flex-shrink-0 align-self-center">
                                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    <i className="bx bx-purchase-tag-alt font-size-24"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="/janjaruka" className="col-md-3">
                                            <div className="card mini-stats-wid">
                                                <div className="card-body text-start">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Technical Mentor</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">{mentors && mentors.length > 0 ? mentors.length : "0"} </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">Mentors </small>
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-shrink-0 align-self-center ">
                                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                       
                                        <a href="/tuungane" className="col-md-3">
                                            <div className="card mini-stats-wid">
                                                <div className="card-body text-start">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Tuungane</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">290 </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">Beneficieries </small>
                                                            </div>
                                                        </div>

                                                        <div className="flex-shrink-0 align-self-center">
                                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    <i className="bx bx-purchase-tag-alt font-size-24"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="card overflow-hidden">
                                    <DonutChart/>
                                    </div>
                                    <div className="">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Top Counties We have Supported</h4>

                                            <div className="text-center">
                                                <div className="mb-4">
                                                    <i className="bx bx-map-pin text-primary display-4"></i>
                                                </div>
                                                <h3>1,456</h3>
                                                <p>Nairobi</p>
                                            </div>

                                            
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="col-xl-8">
                        
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-sm-flex flex-wrap">
                                                <h4 className="card-title mb-4">Annual Number Of Students</h4>
                                                <div className="ms-auto">
                                                    <ul className="nav nav-pills">
                                                        
                                                    
                                                        <li className="nav-item">
                                                            <a className="nav-link active" href="#">Year</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <BarChat/>
                                </div>
                            </div>
                            </div>
                        

                            <div className="row">
                              <UpcomingActivities/> 
                            </div>
                        
                            <div className="row">
                               <LatestStudenUpdate/>
                            </div>
                    
                        </div>
                    
                    </div>
</div>
</div>
  );
}

export default AdminDashboard;
