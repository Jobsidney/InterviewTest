import React, { useState } from "react";
import logo from "../Images/logo.png";
import { TiLockClosed } from "react-icons/ti";
import { BiSolidUser } from "react-icons/bi";
import { CgSpinnerTwo } from "react-icons/cg";
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineLaptop } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import baseUrl from "../BaseUrl";
function AddCourse() {
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);
  const [acceptMode, setAcceptMode] = useState(false); // State to track the checkbox value

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    formDataObject["accept_mode"] = acceptMode;
    fetch(`${baseUrl}/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (!res.error) {
          navigate("/admin", { replace: true });
          toast.success("Course Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Something Went Wrong!", {
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

  const handleCheckboxChange = (event) => {
    setAcceptMode(event.target.checked);
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-light-primary dark:bg-dark-primary bg-cover bg-no-repeat overflow-y-auto">
      <div className="rounded-xl h-auto w-11/12 md:w-4/6 bg-light-secondary dark:bg-dark-secondary bg-opacity-50 px-2 md:px-10 py-4 md:py-10 shadow-lg backdrop-blur-md ">
        <div className="text-light-secondary_2 dark:text-dark-secondary_2 overflow-y-auto">
          <div className="flex flex-col items-center">
            <h1 className="mb-2 text-2xl text-light-secondary_2 text-center dark:text-dark-secondary_2 uppercase font-semibold">
              Course Registration
            </h1>
            <img
              className="w-[120px] h-[120px] object-cover"
              src={logo}
              alt="logo"
            />
            <span className="text-light-secondary_2 text-center dark:text-dark-secondary_2 font-semibold">
              Enter Course Details
            </span>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4 w-full flex">
              <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary bg-opacity-50 px-2 py-3  text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                <BiSolidUser className="text-[18px]" />
                <input
                  className=" flex-1 bg-transparent placeholder:capitalize h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 placeholder:text-sm outline-none "
                  type="text"
                  name="name"
                  placeholder="Enter Course Name"
                  required
                />
              </div>
            </div>
            <div className="mb-4 w-full flex">
              <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary bg-opacity-50 px-2 py-3  text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                <TiLockClosed className="text-[18px]" />
                <input
                  className=" flex-1 bg-transparent h-full pl-2 placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 placeholder:text-sm outline-none "
                  type="number"
                  name="period"
                  required
                  placeholder="Enter Course Period (in months)"
                />
              </div>
            </div>
            <div className="mb-4 w-full flex">
              <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary bg-opacity-50 px-2 py-3  text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                <GiMoneyStack className="text-[18px]" />
                <input
                  className=" flex-1 bg-transparent h-full pl-2 placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 placeholder:text-sm outline-none "
                  type="number"
                  name="fees"
                  required
                  placeholder="Enter Fee Amount (in Kshs)"
                />
              </div>
            </div>
            <div className="mb-4 w-full flex">
              <div className="w-full flex rounded-3xl items-center justify-start border-none bg-light-primary dark:bg-dark-primary bg-opacity-50 px-2 py-3  text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                <AiOutlineLaptop className="text-[18px] " />
                <input
                  className="bg-transparent h-full ml-2 mr-4 accent-dark-secondary_2"
                  type="checkbox"
                  name="accept_mode"
                  checked={acceptMode}
                  onChange={handleCheckboxChange}
                />
                <p className="text-light-secondary_2 dark:text-dark-secondary_2 text-sm outline-none">
                  Does the Course support both Hybrid and Remote?
                </p>
              </div>
            </div>
            {loading ? (
              <div className="mt-4 flex justify-center text-lg">
                <button
                  type="submit"
                  className="rounded-3xl bg-light-primary mb-2 dark:bg-dark-primary text-[27px] bg-opacity-50 px-16 py-3 capitalize font-bold shadow-xl backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300  hover:bg-light-secondary dark:bg-dark-secondary"
                >
                  <CgSpinnerTwo className="spin" />
                </button>
              </div>
            ) : (
              <div className="mt-4 flex justify-center text-lg">
                <button
                  type="submit"
                  className="rounded-3xl bg-light-primary mb-2 dark:bg-dark-primary bg-opacity-50 px-10 py-3 capitalize font-bold shadow-md backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300 hover:text-white hover:bg-light-secondary dark:bg-dark-secondary"
                >
                  Add Course
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
