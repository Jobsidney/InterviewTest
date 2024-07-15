import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../Images/profile.png";
import { useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import student from "../Images/student.svg";
import mentor from "../Images/mentor.svg";
import statement from "../Images/statement.svg";

function Sidebar({ setShowSidebar, userData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCourses, setShowCourses] = useState(false);

  const handleCourses = () => {
    setShowCourses((prev) => !prev);
  };
  const logOut = () => {
    localStorage.removeItem("adminData");
    localStorage.removeItem("courseData");
    localStorage.removeItem("tokenAdmin");
    navigate("../", { replace: true });
  };
  if (!userData || userData === null) {
    navigate("../", { replace: true });
  }

  const [darkMode, setDarkMode] = useState("");
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      body.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      body.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div
      className={` ${
        darkMode ? "dark" : ""
      } w-full h-full px-2 py-2 flex flex-col overflow-y-auto`}
    >
      <div className="w-full h-full">
        <div className="w-full pb-2 h-[65px] gap-3 mb-2 border-b-2 border-b-[#FED0AB] flex items-center">
          <img
            className="w-[60px] h-[60px] object-cover shadow-xl rounded-[50%]"
            src={profilePic}
            alt=""
          />
          <div className="flex flex-col text-light-profile_color dark:text-dark-profile_color">
            <p className="block capitalize font-semibold">
              {userData.first_name && userData.first_name}{" "}
              {userData.last_name && userData.last_name}
              {userData.username && userData.username}
              <span className="text-sm lowercase">
                {" "}
                ({userData.email && userData.email})
              </span>
            </p>
            <span className="uppercase">
              {userData.role ? userData.role : "--"}
            </span>
          </div>
        </div>
        <Link
          to={"/admin"}
          onClick={() => {
            setShowSidebar(false);
            if (showCourses) {
              setShowCourses(false);
            }
          }}
          className={`${
            location.pathname === "/admin"
              ? "bg-dark-secondary_2 dark:bg-dark-secondary_2 text-light-secondary_2 hover:bg-dark-secondary_2"
              : "hover:bg-light-secondary_3"
          } w-full h-auto flex mb-1 dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize flex-col rounded-sm `}
        >
          <div className="w-full px-2 py-1 flex gap-4 cursor-pointer items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="#CCBA78"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.25 0.875H2.75C2.25287 0.875496 1.77625 1.0732 1.42472 1.42472C1.0732 1.77625 0.875496 2.25287 0.875 2.75V25.25C0.875496 25.7471 1.0732 26.2238 1.42472 26.5753C1.77625 26.9268 2.25287 27.1245 2.75 27.125H25.25C25.7471 27.1243 26.2235 26.9265 26.575 26.575C26.9265 26.2235 27.1243 25.7471 27.125 25.25V2.75C27.1245 2.25287 26.9268 1.77625 26.5753 1.42472C26.2238 1.0732 25.7471 0.875496 25.25 0.875ZM25.25 9.3125H12.125V2.75H25.25V9.3125ZM10.25 2.75V9.3125H2.75V2.75H10.25ZM2.75 25.25V11.1875H25.25L25.2519 25.25H2.75Z"
                fill="#E4A951"
              />
            </svg>
            <p className=" dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize">
              Dashboard
            </p>
          </div>
        </Link>

        <Link
          to={"./students"}
          onClick={() => {
            setShowSidebar(false);
            if (showCourses) {
              setShowCourses(false);
            }
          }}
          className={`${
            location.pathname.includes("/students")
              ? "bg-dark-secondary_2 dark:bg-dark-secondary_2 text-light-secondary_2 hover:bg-dark-secondary_2"
              : "hover:bg-light-secondary_3"
          } w-full h-auto flex mb-1 dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize flex-col  rounded-sm`}
        >
          <div className="w-full px-2 py-1 flex gap-4 cursor-pointer items-center">
            <img
              className="bg-light-primary rounded-full"
              src={student}
              alt=""
            />
            Students
          </div>
        </Link>
        <Link
          to={"./mentors"}
          onClick={() => {
            setShowSidebar(false);
            if (showCourses) {
              setShowCourses(false);
            }
          }}
          className={`${
            location.pathname.includes("/mentors")
              ? "bg-dark-secondary_2 dark:bg-dark-secondary_2 text-light-secondary_2  hover:bg-dark-secondary_2"
              : "hover:bg-light-secondary_3"
          } w-full h-auto flex mb-1 dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize flex-col rounded-sm`}
        >
          <div className="w-full px-2 py-1 flex gap-4 cursor-pointer items-center">
            <img className="w-[30px] " src={mentor} alt="" />
            Mentors
          </div>
        </Link>
        <Link
          to={"./add_user"}
          onClick={() => {
            setShowSidebar(false);
            if (showCourses) {
              setShowCourses(false);
            }
          }}
          className={`${
            location.pathname.includes("/add_user")
              ? "bg-dark-secondary_2 dark:bg-dark-secondary_2 text-light-secondary_2  hover:bg-dark-secondary_2"
              : "hover:bg-light-secondary_3"
          } w-full h-auto flex mb-1 dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize flex-col rounded-sm`}
        >
          <div className="w-full px-2 py-2 flex gap-4 cursor-pointer items-center">
            <HiUsers className="text-[25px] text-light-secondary dark:text-dark-secondary" />
            Add user
          </div>
        </Link>
        <div className="w-full h-auto mb-3 flex flex-col ">
          <div
            onClick={handleCourses}
            className={`${
              location.pathname.includes("/add_course") ||
              location.pathname.includes("/add_corhot") ||
              location.pathname.includes("/learning_mode")
                ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                : "hover:bg-light-secondary_3"
            } w-full relative px-2 py-1 flex gap-4 cursor-pointer items-center  rounded-sm`}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="#CCBA78"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8465 23.5499L10.9438 16.2379C7.61 19.715 4.38486 23.3604 1 26.7267L1.00081 28.9843C1.00081 29.5189 1.17165 30.0316 1.47573 30.4096C1.77982 30.7876 2.19225 31 2.6223 31H29.3769C29.8069 31 30.2194 30.7876 30.5235 30.4096C30.8275 30.0316 30.9984 29.5189 30.9984 28.9843V9.88229C30.9984 9.88229 22.0583 19.1345 17.8465 23.5489V23.5499Z"
                stroke="#E4A951"
                stroke-width="0.416667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30.9984 1L17.8457 14.6666L10.943 7.35557L1.00085 17.8434V21.9625L10.943 11.4747L17.8457 18.7847L31 5.11812V1H30.9984Z"
                stroke="#E4A951"
                stroke-width="0.416667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize">
              Courses
            </p>
            {showCourses ? (
              <FaAngleRight className="absolute text-[20px] right-2" />
            ) : (
              <FaAngleDown className="absolute text-[20px] right-2" />
            )}
          </div>
          <div
            className={`${
              showCourses ? "flex" : "hidden"
            } w-full mt-1 flex-col`}
          >
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./add_course"}
              className={`${
                location.pathname.includes("/add_course")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Add Course
            </Link>
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./learning_mode"}
              className={`${
                location.pathname.includes("/learning_mode")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Add Learning Mode
            </Link>
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./installment_plan"}
              className={`${
                location.pathname.includes("/installment_plan")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Add Installment Plan
            </Link>
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./add_corhot"}
              className={`${
                location.pathname.includes("/add_corhot")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Add Corhot
            </Link>
          </div>
        </div>
        <Link
          to={"./transactions"}
          onClick={() => {
            setShowSidebar(false);
            if (showCourses) {
              setShowCourses(false);
            }
          }}
          className={`${
            location.pathname.includes("/transactions")
              ? "bg-dark-secondary_2 dark:bg-dark-secondary_2 text-light-secondary_2 hover:bg-dark-secondary_2"
              : "hover:bg-light-secondary_3"
          } w-full h-auto flex mb-1 dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize flex-col  rounded-sm`}
        >
          <div className="w-full px-2 py-1 flex gap-4 cursor-pointer items-center">
            <img
              className="bg-light-primary rounded-md w-[30px] h-[30px]"
              src={statement}
              alt=""
            />
            All Transactions
          </div>
        </Link>
      </div>

      <div className="w-full h-auto flex flex-col ">
        <div className="dark-mode-toggle w-full flex justify-between pr-8">
          <input
            type="checkbox"
            id="dark-mode-switch"
            className="dark-mode-switch hidden h-8"
            onChange={toggleDarkMode}
            checked={darkMode}
          />
          <label
            htmlFor="dark-mode-switch"
            className="dark-mode-label cursor-pointer inline-block w-16 h-8 px-2 bg-light-primary dark:bg-dark-secondary_2 rounded-full transition duration-500 "
          >
            <span className="dark:translate-x-6 transform inline-block w-6 h-6 mt-1 bg-white rounded-full shadow-md transition duration-300"></span>
          </label>
          <p className={`dark:text-dark-text_color`}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </p>
        </div>
        <div
          onClick={() => logOut()}
          className="w-full px-2 py-1 mt-4 flex gap-4 cursor-pointer items-center transition-all ease-linear duration-500 hover:dark:bg-dark-primary hover:bg-light-secondary rounded-sm"
        >
          <HiOutlineLogout className="text-[30px] text-red-500" />
          <p className="text-md uppercase font-bold text-red-500">Log Out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
