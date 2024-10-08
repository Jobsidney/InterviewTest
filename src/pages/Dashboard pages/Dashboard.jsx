import React, { useEffect, useState } from "react";

import Content from "./Content";
import Header from "./Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import CourseRegistration from "../Academics/CourseRegistration";
import ErrorPage from "../ErrorPage";
import Results from "../Academics/Results";
import Receipts from "../Financials/Receipts";
import FeeStatement from "../Financials/FeeStatement";
import FeeStructure from "../Financials/FeeStructure";
import ResetPassword from "../Password/ResetPassword";
import baseUrl from "../../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import FeePayment from "../Financials/FeePayment";
import Receipt from "../Financials/Receipt";
import Test from "../Financials/Test";
import ShowStatement from "../Financials/ShowStatement";
import GenerateFeeStructure from "../Financials/GenerateFeeStructure";
import UpdateStudentDetails from "../UpdateStudentDetails";
import MyMentors from "../MyMentors/MyMentors";
import SidebarNav from "./SidebarNav";

function Dashboard() {
  const navigate = useNavigate("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [userData, setUserData] = useState({});
  const [done, setDone] = useState(false);
  const [token, setToken] = useState(null);
  const [dueDates, setDueDates] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData")) || {};
    setUserData(data.userData);
    const token = JSON.parse(localStorage.getItem("token"));
    setToken(token);
  }, []);
  function fetchStudentDueDate(token) {
      fetch(`https://mlight.nanesoft-lab.com/student-duedates/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const me = res.filter((student) =>{
            return student.student_id === userData.id
          })
          setDueDates(me[0].installments); 
          localStorage.setItem('ddd', JSON.stringify(me[0].installments)) 
          setDone(true);   
        });
    
  }
  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const fetchCourse = () => {
    if (!userData) {
      navigate("../", { replace: true });
    } else {
      fetch(`https://mlight.nanesoft-lab.com/courses/${userData.course_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setCourseData(res);
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
  };

  useEffect(() => {
      fetchCourse();
      if(token){
        fetchStudentDueDate(token);
      }
    }, [userData, token]);

  return userData && courseData ? (
    <>
        <SidebarNav
          setShowSidebar={setShowSidebar}
          userData={userData}
          courseData={courseData}
        />
        
          <Routes>
            <Route
              path="/"
              element={<Content userData={userData} courseData={courseData} done2={done} dueDates={dueDates} />}
            />
            <Route
              path="/course_registration"
              element={
                <CourseRegistration
                  userData={userData}
                  courseData={courseData}
                />
              }
            />
            <Route path="/results" element={<Results />} />
            <Route path="/receipts" element={<Receipts />} />
            <Route
              path="/mentors"
              element={<MyMentors userData={userData} />}
            />
            <Route path="/fee_statement" element={<FeeStatement />} />
            <Route path="/update_details" element={<UpdateStudentDetails />} />
            <Route path="/fee_statement/download" element={<ShowStatement />} />
            <Route path="/fee_structure" element={<GenerateFeeStructure />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/receipt" element={<Receipt dueDates={dueDates}/>} />
            <Route path="/receipts/download" element={<Test />} />
            <Route path="/fee_payment" element={<FeePayment />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <ToastContainer />
    
    </>
  ) : null;
}

export default Dashboard;
