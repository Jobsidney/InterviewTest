import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../../Images/profile.png";
import { useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import mentor from "../../Images/mentor.svg";
import academics from "../../Images/academics.svg";
import dashboard from "../../Images/dashboard.svg";
import feedback from "../../Images/feedback_form.svg";
import reset_pass from "../../Images/reset_password.svg";
function Sidebar({ setShowSidebar, userData, courseData }) {
  if (!userData || userData === null) {
    navigate("../", { replace: true });
  }
  const navigate = useNavigate("");
  const [showAcademics, setShowAcademics] = useState(false);
  const [showFinancials, setShowFinancials] = useState(false);
  const location = useLocation("");
  const handleFinancials = () => {
    setShowFinancials((prev) => !prev);
    setShowAcademics(false);
  };

  const logOut = () => {
    var itemToKeep = localStorage.getItem("darkMode");
    var itemToKeep2 = localStorage.getItem("lastReminderTimestamp");
    localStorage.clear();
    localStorage.setItem("darkMode", itemToKeep);
    localStorage.setItem("lastReminderTimestamp", itemToKeep2);

    navigate("../", { replace: true });
  };
  const handleAcademics = () => {
    setShowAcademics((prev) => !prev);
    setShowFinancials(false);
  };

  const handleDashboardClick = () => {
    setShowSidebar(false);

    if (showAcademics) {
      setShowAcademics(false);
    }
    if (showFinancials) {
      setShowFinancials(false);
    }
  };
  const handlePasswordResetClick = () => {
    setShowSidebar(false);
    if (showAcademics) {
      setShowAcademics(false);
    }
    if (showFinancials) {
      setShowFinancials(false);
    }
  };
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

  useEffect(() => {
    if (
      location.pathname.includes("course_registration") ||
      location.pathname.includes("results")
    ) {
      setShowAcademics(true);
    }
    if (
      location.pathname.includes("fee_structure") ||
      location.pathname.includes("receipts") ||
      location.pathname.includes("fee_payment") ||
      location.pathname.includes("fee_statement")
    ) {
      setShowFinancials(true);
    }
  }, []);
  return (
    <div
      className={` ${
        darkMode ? "dark" : ""
      } w-full h-full px-2 py-2 flex flex-col overflow-y-auto`}
    >
      <div className="w-full h-full flex flex-col gap-1">
        <div className="w-full pb-2 h-[65px] gap-3 mb-2 border-b-2 border-b-dark-primary flex items-center">
          <img
            className="w-[60px] h-[60px] object-cover shadow-xl rounded-full"
            src={userData.profile_pic ? userData.profile_pic : profilePic}
            alt=""
          />
          <div className="flex flex-col text-light-profile_color dark:text-dark-primary">
            <p className="block capitalize font-semibold">
              {userData.first_name && userData.first_name}{" "}
              {userData.last_name && userData.last_name}
            </p>
            <span>{courseData.name ? courseData.name + " Student" : "--"}</span>
          </div>
        </div>
        <Link
          onClick={() => handleDashboardClick()}
          to={"/dashboard"}
          className={`${
            location.pathname == "/dashboard"
              ? "bg-dark-secondary_2 dark:bg-dark-secondary_2 text-light-secondary_2 hover:bg-dark-secondary_2"
              : "hover:bg-light-secondary_3"
          } w-full h-auto flex  dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize flex-col rounded-sm `}
        >
          <div className="w-full px-2 flex gap-4 py-1 cursor-pointer items-center">
            <img className="w-[30px] " src={dashboard} alt="" />
            <p className=" dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize">
              Dashboard
            </p>
          </div>
        </Link>
        <div className="w-full h-auto flex flex-col ">
          <div
            onClick={handleAcademics}
            className={`${
              location.pathname.includes("/course") ||
              location.pathname.includes("/results")
                ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                : "hover:bg-light-secondary_3"
            } w-full relative px-2 py-1 flex gap-4 cursor-pointer items-center  rounded-sm`}
          >
            <img className="w-[30px] " src={academics} alt="" />
            <p className="dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize">
              Academics
            </p>
            {showAcademics ? (
              <FaAngleRight className="absolute text-[20px] right-2" />
            ) : (
              <FaAngleDown className="absolute text-[20px] right-2" />
            )}
          </div>
          <div
            className={`${
              showAcademics ? "flex" : "hidden"
            } w-full mt-1 flex-col`}
          >
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./course_registration"}
              className={`${
                location.pathname.includes("/course_registration")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Course Registration
            </Link>
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./results"}
              className={`${
                location.pathname.includes("/results")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Provisional Results
            </Link>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col ">
          <div
            onClick={handleFinancials}
            className={`${
              location.pathname.includes("/fee") ||
              location.pathname.includes("/receipts")
                ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                : "hover:bg-light-secondary_3"
            } w-full relative px-2 py-1 flex gap-4 cursor-pointer items-center  rounded-sm`}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="#CCBA78CC"
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
            </svg>{" "}
            <p className="dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize">
              Financials
            </p>
            {showFinancials ? (
              <FaAngleRight className="absolute text-[20px] right-2" />
            ) : (
              <FaAngleDown className="absolute text-[20px] right-2" />
            )}
          </div>
          <div
            className={`${
              showFinancials ? "flex" : "hidden"
            } w-full mt-1 flex-col`}
          >
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./fee_structure"}
              className={`${
                location.pathname.includes("/fee_structure")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Fee Structure
            </Link>
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./fee_statement"}
              className={`${
                location.pathname.includes("/fee_statement")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Fee Statement
            </Link>

            <Link
              onClick={() => setShowSidebar(false)}
              to={"./receipts"}
              className={`${
                location.pathname.includes("/receipts")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Receipts
            </Link>
            <Link
              onClick={() => setShowSidebar(false)}
              to={"./fee_payment"}
              className={`${
                location.pathname.includes("/fee_payment")
                  ? "bg-dark-secondary_2 text-light-secondary_2 dark:bg-dark-secondary_2 hover:bg-dark-secondary_2 hover:dark:bg-dark-secondary_2"
                  : "hover:bg-light-secondary_3"
              } w-full h-full py-1 pl-[55px] dark:text-dark-secondary rounded-sm text-sm`}
            >
              Fee Payment
            </Link>
          </div>
        </div>
        <Link
          to={"./mentors"}
          onClick={() => handlePasswordResetClick()}
          className={`${
            location.pathname.includes("/mentors")
              ? "bg-dark-secondary_2  dark:bg-dark-secondary_2 text-dark-text_color   hover:dark:bg-dark-secondary_2"
              : "hover:bg-light-secondary_3 "
          } w-full h-auto flex text-sm font-semibold tracking-wider dark:text-dark-text_color capitalize flex-col rounded-sm`}
        >
          <div className="w-full px-2 py-1 flex gap-4 cursor-pointer  items-center">
            <img className="w-[30px] " src={mentor} alt="" />
            My Mentors
          </div>
        </Link>
        <Link
          to={"./reset_password"}
          onClick={() => handlePasswordResetClick()}
          className={`${
            location.pathname.includes("/reset_password")
              ? "bg-dark-secondary_2  dark:bg-dark-secondary_2 text-dark-text_color   hover:dark:bg-dark-secondary_2"
              : "hover:bg-light-secondary_3 "
          } w-full h-auto flex text-sm font-semibold tracking-wider dark:text-dark-text_color capitalize flex-col rounded-sm`}
        >
          <div className="w-full px-2 py-1 flex gap-4 cursor-pointer  items-center">
            <img className="w-[30px] " src={reset_pass} alt="" />
            Reset Password
          </div>
        </Link>
        <Link
          onClick={() => setShowSidebar(false)}
          to={
            "https://docs.google.com/forms/d/e/1FAIpQLScdmsmHvkZoEM_qwlkJjlINJe-6xOxhHcx8ZvhMYjGcgJKa5g/viewform"
          }
          target="_blank"
          className="w-full h-auto flex hover:dark:bg-dark-secondary_3 hover:bg-light-secondary_3  text-light-text_color dark:text-dark-text_color text-sm font-semibold tracking-wider capitalize flex-col  rounded-sm"
        >
          <div className="w-full px-2 py-1 flex gap-4 cursor-pointer items-center">
            <img className="w-[30px] " src={feedback} alt="" />
            Feedback Form
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
          className="w-full px-2 py-2 mt-4 flex gap-4 cursor-pointer items-center transition-all ease-linear duration-500 hover:dark:bg-dark-primary hover:bg-light-secondary rounded-sm"
        >
          <HiOutlineLogout className="text-[30px] text-red-500" />
          <p className="text-md uppercase font-bold text-red-500">Log Out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
