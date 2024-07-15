import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import LeftSideNav from '../components/LeftSideNav';
import { Toaster } from 'react-hot-toast';


export default function DefaultDashBoard() {

    const studentsData2=[
        {
            "name": "scholar",
            "kt_no":"kt001",
            "county":"NRB",
            "sub_county":"k",
            "enrollment_year": 2023,
            "age": 15,
            "kcpe_index": 12345,
            "kcpe": 65,
            "high_school": "Nairobi School"
        },
        {
            "name": "scholar",
            "kt_no":"kt001",
            "county":"NRB",
            "sub_county":"k",
            "enrollment_year": 2023,
            "age": 15,
            "kcpe_index": 12345,
            "kcpe": 65,
            "high_school": "Nairobi School"
        },
        {
            "name": "scholar",
            "kt_no":"kt001",
            "county":"NRB",
            "sub_county":"k",
            "enrollment_year": 2023,
            "age": 15,
            "kcpe_index": 12345,
            "kcpe": 65,
            "high_school": "Nairobi School"
        }
    ]
 
//the below line now gets the students from the stored state
   
    
  return (
<>
<Toaster />
<LeftSideNav/>

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
                                                            <p className="text-muted fw-medium">Scholarships</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">{students && students.length > 0 ? students.length : "0"}  </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">Scholars </small>
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
                                                            <p className="text-muted fw-medium">Inuka</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">{courseData && courseData.length > 0 ? courseData.length : "0"}  </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">Beneficieries</small>
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
                                                            <p className="text-muted fw-medium">Janjaruka</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">{mentors && mentors.length > 0 ? mentors.length : "0"} </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">Beneficieries </small>
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
                                    <div className="donut">
                                        
                                    <Chart className="w-100" type='donut' options={{colors:["#9e1039","#556ee6"],labels:['Males',"Females"],
                                    tooltip: {
y: {
formatter: (val) =>{
return `${val}% `;
}
}}}}   series={[47,53]}
                                    
                                    />
      </div>
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

                                            <div className="table-responsive mt-4">
                                                <table className="table align-middle table-nowrap">
                                                    {/* <tbody>
                                                        <tr>
                                                            <td style="width: 30%">
                                                                <p className="mb-0">San Francisco</p>
                                                            </td>
                                                            <td style="width: 25%">
                                                                <h5 className="mb-0">1,456</h5></td>
                                                            <td>
                                                                <div className="progress bg-transparent progress-sm">
                                                                    <div className="progress-bar bg-primary rounded" role="progressbar" style="width: 94%" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p className="mb-0">Los Angeles</p>
                                                            </td>
                                                            <td>
                                                                <h5 className="mb-0">1,123</h5>
                                                            </td>
                                                            <td>
                                                                <div className="progress bg-transparent progress-sm">
                                                                    <div className="progress-bar bg-success rounded" role="progressbar" style="width: 82%" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p className="mb-0">San Diego</p>
                                                            </td>
                                                            <td>
                                                                <h5 className="mb-0">1,026</h5>
                                                            </td>
                                                            <td>
                                                                <div className="progress bg-transparent progress-sm">
                                                                    <div className="progress-bar bg-warning rounded" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody> */}
                                                </table>
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
                                            
                                            <div className="col-xl-4">
                                      
       <Chart type='bar' options={{colors:["#9e1039","#556ee6"], chart: {
          id: 'growth'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }}}  width={800} series={[{
        name: 'Male',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      },
      {
        name: 'Females',
        data: [40, 36, 39, 48, 49, 63, 74, 90, 129]
      }
      ]}/>
                                
                            </div>
                                </div>
                            </div>
                            </div>
                        

                            <div className="row">
                               
                                <div className="col-xl-8">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title mb-5">Upcoming Activity</h4>
                                            <ul className="verti-timeline list-unstyled">
                                                <li className="event-list">
                                                    <div className="event-timeline-dot">
                                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <h5 className="font-size-14">22 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div>
                                                                Janjaruka Camp Event
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="event-list">
                                                    <div className="event-timeline-dot">
                                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <h5 className="font-size-14">17 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div>
                                                                Everyone realizes why a new common language would be desirable... <a href="javascript: void(0);">Read more</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="event-list active">
                                                    <div className="event-timeline-dot">
                                                        <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <h5 className="font-size-14">15 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div>
                                                                Joined the group “Boardsmanship Forum”
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="event-list">
                                                    <div className="event-timeline-dot">
                                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <h5 className="font-size-14">12 Nov <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div>
                                                                Responded to need “In-Kind Opportunity”
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="text-center mt-4"><a href="javascript: void(0);" className="btn btn-primary waves-effect waves-light btn-sm">View More <i className="mdi mdi-arrow-right ms-1"></i></a></div>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Latest Student Update</h4>
                                            <div className="table-responsive">
                                                <table className="table align-middle table-nowrap mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>
                                                                <div className="form-check font-size-16 align-middle">
                                                                    <input className="form-check-input" type="checkbox" id="transactionCheck01"/>
                                                                    <label className="form-check-label" ></label>
                                                                </div>
                                                            </th>
                                                            <th className="align-middle">Student ID</th>
                                                            <th className="align-middle">Student Name</th>
                                                            <th className="align-middle">Date</th>
                                                            <th className="align-middle">Total</th>
                                                            <th className="align-middle">Scholarship Status</th>
                                                            <th className="align-middle">Academic Level</th>
                                                            <th className="align-middle">View Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check font-size-16">
                                                                    <input className="form-check-input" type="checkbox" id="transactionCheck02"/>
                                                                    <label className="form-check-label" ></label>
                                                                </div>
                                                            </td>
                                                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2540</a> </td>
                                                            <td>Neal Matthews</td>
                                                            <td>
                                                                07 Oct, 2019
                                                            </td>
                                                            <td>
                                                                $400
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-pill badge-soft-success font-size-11">Passed</span>
                                                            </td>
                                                            <td>
                                                                <i className="fab fa-cc-mastercard me-1"></i> Mastercard
                                                            </td>
                                                            <td>
                                                                
                                                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <div className="form-check font-size-16">
                                                                    <input className="form-check-input" type="checkbox" id="transactionCheck03"/>
                                                                    <label className="form-check-label" ></label>
                                                                </div>
                                                            </td>
                                                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2541</a> </td>
                                                            <td>Jamal Burnett</td>
                                                            <td>
                                                                07 Oct, 2019
                                                            </td>
                                                            <td>
                                                                $380
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-pill badge-soft-danger font-size-11">Discontinued</span>
                                                            </td>
                                                            <td>
                                                                <i className="fab fa-cc-visa me-1"></i> Visa
                                                            </td>
                                                            <td>
                                                                
                                                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <div className="form-check font-size-16">
                                                                    <input className="form-check-input" type="checkbox" id="transactionCheck04"/>
                                                                    <label className="form-check-label" ></label>
                                                                </div>
                                                            </td>
                                                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2542</a> </td>
                                                            <td>Juan Mitchell</td>
                                                            <td>
                                                                06 Oct, 2019
                                                            </td>
                                                            <td>
                                                                $384
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-pill badge-soft-success font-size-11">Passed</span>
                                                            </td>
                                                            <td>
                                                                <i className="fab fa-cc-paypal me-1"></i> Paypal
                                                            </td>
                                                            <td>
                                                               
                                                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check font-size-16">
                                                                    <input className="form-check-input" type="checkbox" id="transactionCheck05"/>
                                                                    <label className="form-check-label" ></label>
                                                                </div>
                                                            </td>
                                                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2543</a> </td>
                                                            <td>Barry Dick</td>
                                                            <td>
                                                                05 Oct, 2019
                                                            </td>
                                                            <td>
                                                                $412
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-pill badge-soft-success font-size-11">Passed</span>
                                                            </td>
                                                            <td>
                                                                <i className="fab fa-cc-mastercard me-1"></i> Mastercard
                                                            </td>
                                                            <td>
                                                               
                                                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check font-size-16">
                                                                    <input className="form-check-input" type="checkbox" id="transactionCheck06"/>
                                                                    <label className="form-check-label" ></label>
                                                                </div>
                                                            </td>
                                                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2544</a> </td>
                                                            <td>Ronald Taylor</td>
                                                            <td>
                                                                04 Oct, 2019
                                                            </td>
                                                            <td>
                                                                $404
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-pill badge-soft-warning font-size-11">Refund</span>
                                                            </td>
                                                            <td>
                                                                <i className="fab fa-cc-visa me-1"></i> Visa
                                                            </td>
                                                            <td>
                                                                
                                                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="form-check font-size-16">
                                                                    <input className="form-check-input" type="checkbox" id="transactionCheck07"/>
                                                                    <label className="form-check-label" ></label>
                                                                </div>
                                                            </td>
                                                            <td><a href="javascript: void(0);" className="text-body fw-bold">#SK2545</a> </td>
                                                            <td>Jacob Hunter</td>
                                                            <td>
                                                                04 Oct, 2019
                                                            </td>
                                                            <td>
                                                                $392
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-pill badge-soft-success font-size-11">Passed</span>
                                                            </td>
                                                            <td>
                                                                <i className="fab fa-cc-paypal me-1"></i> Paypal
                                                            </td>
                                                            <td>
                                                                
                                                                <button type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" data-bs-toggle="modal" data-bs-target=".transaction-detailModal">
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                        </div>
                    
                    </div>
</div>
</div>

</>
 )
}