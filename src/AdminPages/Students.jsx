import React, { useState, useEffect } from "react";

import baseUrl from "../BaseUrl";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Modal } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Modal as BaseModal } from '@mui/base/Modal';
import LoaderIndicator from '../components/LoaderIndicator';
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import EditStatus from "../components/EditStatus";
import EditStudentAcademics from "../components/EditStudentAcademics";

function Students() {
  const navigate = useNavigate("");
  const [courseNames, setCourseNames] = useState({});
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadDelete, setLoadDelete] = useState(false);
  const [confirmPage, setConfirmPage] = useState(false);
  const [search, setSearch] = useState("");
  const [done, setDone] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(0);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleCancel = () => {
    setConfirmPage(false);
    return;
  };
  const columns=[

    {field:"last_name",headerName:"Last Name" },
    {field:"first_name",headerName:"First Name",flex:1,cellClassName:"name-column--cell"},
    
    {field:"registration_number",flex:1,headerName:"registration_number"},
    {field:"courseNames",flex:1,headerName:"Couse Name"},
  
    {field:"Edit",HeadernAME:"Edit",renderCell:()=>{
        return(
        <button onClick={handleOpen} className="btn btn-outline-secondary btn-sm edit" title="Edit">
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
    )}},
    {field:"Delete",HeadernAME:"Delete",renderCell:()=>{return(
        <IconButton aria-label="delete">
                       <i  className="bx bx-trash"></i>
                     </IconButton>
    )}},
    // {field:"View Details",HeadernAME:"View Details",renderCell:()=>{return(
    //     <a type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" >View Details </a>
    // )}}
]


  const filteredStudentData =
    students.length > 0 && !done ? (
      students.filter((student) => {
        if (
          student.first_name.toLowerCase().includes(search.toLowerCase()) ||
          student.last_name.toLowerCase().includes(search.toLowerCase()) ||
          student.registration_number
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase())
        ) {
          return student;
        }
      })
    ) : (
      <>
        <p className="w-full h-full text-center text-light-text_color dark:text-dark-text_color mr-2">
          No students Found
        </p>
        <a
          href="./add_user"
          className="w-auto py-2 px-4 dark:bg-light-secondary_2 bg-dark-secondary_2 rounded-md text-light-text_color dark:text-dark-text_color mr-2"
        >
          Add Student Mentor
        </a>
      </>
    );
  const pickStudentId = (id, first_name) => {
    setStudentId(id);
    setStudentName(first_name);
    setConfirmPage(true);
  };

  function fetchStudents() {
    fetch(`https://mlight.nanesoft-lab.com/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const students = res.filter((student) => {
          return student.role === "student";
        });
        setStudents(students);
        setDone(false);
      })
      .then((err) => {
        if (err) {
          toast.err("Something Went Wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }
      });
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const uniqueCourseIds = Array.from(
      new Set(students.map((student) => student.course_id))
    );
    const fetchCourseNames = async () => {
      const courseNamesMap = {};
      for (const courseId of uniqueCourseIds) {
        try {
          const response = await fetch(`https://mlight.nanesoft-lab.com/courses/${courseId}/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const courseData = await response.json();
          courseNamesMap[courseId] = courseData.name;
          setIsLoading(false);
        } catch (error) {
          console.error(
            `Error fetching course name for courseId ${courseId}`,
            error
          );
        }
      }
      setCourseNames(courseNamesMap);
    };

    fetchCourseNames();
  }, [students]);

  const deleteStudent = (id) => {
    fetch(`https://mlight.nanesoft-lab.com/users/${id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        setLoadDelete(false);
        if (res.status === 204) {
          setConfirmPage(false);
          toast.success(
            `${
              studentName ? studentName : "Student "
            } was deleted successfully.`,
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            }
          );
          setTimeout(() => {
            window.location.reload();
          }, 3200);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          // console.log(data);
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }
      });
  };

  const handleConfirmDelete = () => {
    setLoadDelete(true);
    if (studentId) {
      deleteStudent(studentId);
    }
  };

  return (
    <>
    <Toaster />
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <EditStudentAcademics studentData={selectedRowData} handleClose={handleClose} rerender={()=>
        {}
       }/>
      </Modal>
      {/* <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <EditStatus studentData={selectedRowData} handleClose={handleClose2} rerender={()=>{}} apiPath={'form_one'} apiPromotePath={'form_two'}/>
      </Modal> */}
    <div className="main-content">
    <div className="page-content">
    <div className="container-fluid">
    
      
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">Students Table</h4>
                   
                
    
                </div>
            </div>
        </div>
      
    
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-row justify-content-between">
                            <h4 className="card-title"> Table</h4>
                        <button onClick={()=>navigate('/register')}  type="button" className="btn btn-success mt-3 mt-lg-0" >Add Student</button>
    
                        </div>
    
                        
    
                        <div className="table-responsive">
                            {isLoading?
                               'loading'
                                
                            :
                           
                           <Box
                           sx={{
                            "& .MuiDataGrid-root":{
                                border:"none"
                            },
                            "& .MuiDataGrid-columnHeader":{
                                backgroundColor: "#eff2f7",
                                color: "black",
                                fontWeight: "bold"
                            },
                            // "& .MuiDataGrid-footerContainer":{
                            //     backgroundColor: "#eff2f7",
                            //     color: "black"
                            // },
                            "& .MuiDataGrid-toolbarContainer":{
                                backgroundColor: "white",
                                color: "black !important",
                                paddingBottom:" 10px",
                                paddingTop:" 10px"
                            
                            },
                            "& .name-column--cell":{
                                color:"#495057"
                            
                            },
                            "& .KTNO-column--cell":{
                                color:"black",
                                fontWeight:"bold",
                                fontSize:"17px"
                            
                            }
                           }}
                           
                           ><DataGrid
                           slots={{toolbar:GridToolbar}}
                           rows={students}
                           columns={columns}
                           className="list"
                           pagingation
                           pageSize={10}
                           rowLength={10}
                          disableRowSelectionOnClick
                           onCellClick={(params)=>{
                            setSelectedRowData(params.row);
                            setSelectedRowID(params.row.id);
                            
                           }}
                           
                           onCellEditStop={async(params)=>{
                            const row =await params.row.status
                             console.log(row);
                            
                           }}
                           
                           autoHeight
                           // sortModel={sortModel}
                           
                           checkboxSelection
                         
                           
                           >
    
                           </DataGrid></Box> }
                        </div>
    
                    </div>
                </div>
            </div> 
        </div> 
    
    </div> 
    </div>
    </div>
    </>
  );
}

export default Students;
