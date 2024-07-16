import React, { useState, useEffect } from "react";

import baseUrl from "../BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Box, IconButton, Modal } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import EditStudentAcademics from "../components/EditStudentAcademics";


function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [courseNames, setCourseNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadDelete, setLoadDelete] = useState(false);
  const [confirmPage, setConfirmPage] = useState(false);
  const [mentorId, setMentorId] = useState(null);
  const [mentorName, setMentorName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowID, setSelectedRowID] = useState(0);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate("");

  const columns=[

    {field:"last_name",headerName:"Last Name" },
    {field:"first_name",headerName:"First Name",flex:1,cellClassName:"name-column--cell"},
    
    {field:"phone_number",flex:1,headerName:"registration_number"},
    {field:`${courseNames[1]}`,flex:1,headerName:"Couse Name"},
  
    {field:"Edit",HeadernAME:"Edit",renderCell:()=>{
        return(
        <button onClick={handleOpen} className="btn btn-outline-secondary btn-sm edit" title="Edit">
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
    )}},
    {field:"Delete",HeadernAME:"Delete",
      editable: true,
      type: "singleSelect",
      renderCell:()=>{return(
        <IconButton onClick={handleConfirmDelete} aria-label="delete">
                       <i  className="bx bx-trash"></i>
                     </IconButton>
    )}},
    // {field:"View Details",HeadernAME:"View Details",renderCell:()=>{return(
    //     <a type="button" className="btn btn-primary btn-sm btn-rounded waves-effect waves-light" >View Details </a>
    // )}}
]


  function fetchMentors() {
    fetch(`https://mlight.nanesoft-lab.com/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const teachers = res.filter((teacher) => {
          return teacher.role === "teacher";
        });
        setMentors(teachers);
      })
      .catch((err) => {
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
      })
      .finally((err) => {
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
    fetchMentors();
  }, []);

  const filteredMentorsData =
    mentors.length > 0 ? (
      mentors.filter((mentor) => {
        if (
          mentor.first_name.toLowerCase().includes(search.toLowerCase()) ||
          mentor.last_name.toLowerCase().includes(search.toLowerCase()) ||
          mentor.email.toLowerCase().includes(search.toLowerCase()) ||
          mentor.phone.toLowerCase().includes(search.toLowerCase())
        ) {
          return mentor;
        }
      })
    ) : (
      <>
        <div className="w-3/4 h-[200px] mx-auto flex flex-col items-center justify-center">
          <p className="w-full h-auto mb-4 text-center text-red-500">
            No Technical Mentors Found
          </p>
          <a
            href="./add_user"
            className="inline-block text-center w-2/5 mx-auto py-2 border px-4 bg-light-secondary_2 dark:bg-dark-secondary_2 rounded-md"
          >
            Add Mentor
          </a>
        </div>
      </>
    );
  useEffect(() => {
    const uniqueCourseIds = Array.from(
      new Set(mentors.map((student) => student.course_id))
    );
    if (mentors.length > 0) {
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
    }
  }, [mentors]);

  const handleCancel = () => {
    setConfirmPage(false);
    return;
  };

  const pickMentorId = (id, first_name) => {
    setMentorId(id);
    setMentorName(first_name);
    setConfirmPage(true);
  };
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
              mentorName ? mentorName : "Technical Mentor"
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
    if (mentorId) {
      deleteStudent(mentorId);
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
                    <h4 className="mb-sm-0 font-size-18">Mentors Table</h4>
                   
                
    
                </div>
            </div>
        </div>
      
    
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-row justify-content-between">
                            <h4 className="card-title"> Table</h4>
                        <button onClick={()=>navigate('/admin/add_user')}  type="button" className="btn btn-success mt-3 mt-lg-0" >Add Mentor</button>
    
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
                           rows={mentors}
                           columns={columns}
                           className="list"
                           pagingation
                           pageSize={10}
                           rowLength={10}
                          disableRowSelectionOnClick
                           onCellClick={(params)=>{
                            setSelectedRowData(params.row);
                            setSelectedRowID(params.row.id);
                            setMentorId(params.row.id);
                            
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

export default Mentors;
