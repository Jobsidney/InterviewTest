import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AddCourse from "./AddCourse";
import AddUser from "./AddUser";
import ErrorPage from "../Pages/ErrorPage";
import baseUrl from "../BaseUrl";
import { toast } from "react-toastify";
import Students from "./Students";
import Mentors from "./Mentors";
import Corhot from "./Courses/Corhot";
import LearningMode from "./Courses/LearningMode";
import InstallmentPlan from "./Courses/InstallmentPlan";
import AllTransactions from "./Financials/AllTransactions";
import StudentTransaction from "./Financials/StudentTransactions";
import LeftSideNav from "../components/LeftSideNav";

function Admin() {
  const navigate = useNavigate("");
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentPerCourse, setStudentPerCourse] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [courseDataLoaded, setCourseDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [adminData, setAdminData] = useState({});
  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const data = localStorage.getItem("adminData");

  useEffect(() => {
    if (!data) {
      navigate("../", { replace: true });
      return;
    }

    const d = JSON.parse(data);
    setAdminData(d.adminData);

    fetch(`https://mlight.nanesoft-lab.com/courses/`)
      .then((res) => res.json())
      .then((res) => {
        setCourseData(res);
        setCourseDataLoaded(true);
      })
      .catch((err) => {
        setLoading(false);
        if (err) {
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
  }, [data, navigate]);

  useEffect(() => {
    if (courseDataLoaded) {
      fetch(`https://mlight.nanesoft-lab.com/users/`)
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          const teachers = res.filter((teacher) => teacher.role === "teacher");
          setMentors(teachers);
          const students = res.filter((student) => student.role === "student");
          setStudents(students);
        })
        .catch((err) => {
          setLoading(false);
          err && toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        });
    }
  }, [courseDataLoaded]);

  function fetchStudentsPerCourse(token) {
    fetch(`https://mlight.nanesoft-lab.com/students-per-course/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setStudentPerCourse(res.students_per_course);
      });
  }
  useEffect(() => {
    if (data) {
      const token = JSON.parse(localStorage.getItem("tokenAdmin"));
      fetchStudentsPerCourse(token);
    }
  }, []);

  return (
    <>
        <LeftSideNav userData={adminData}/>
      <Routes>
              <Route
                path="/"
                element={
                  <AdminDashboard
                    courseData={courseData}
                    mentors={mentors}
                    students={students}
                    studentPerCourse={studentPerCourse}
                  />
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminDashboard
                    courseData={courseData}
                    mentors={mentors}
                    students={students}
                    studentPerCourse={studentPerCourse}
                  />
                }
              />
              <Route path="/add_course" element={<AddCourse />} />
              <Route path="/add_user" element={<AddUser />} />
              <Route path="/learning_mode" element={<LearningMode />} />
              <Route path="/add_corhot" element={<Corhot />} />
              <Route path="/installment_plan" element={<InstallmentPlan />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/students" element={<Students />} />
              <Route path="/transactions" element={<AllTransactions />} />
              <Route path="/transactions/details" element={<StudentTransaction />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>

 

    </>
  );
}

export default Admin;
