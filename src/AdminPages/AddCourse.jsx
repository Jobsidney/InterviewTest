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
import { Toaster } from "react-hot-toast";
import CardHeader from "../components/CardHeader";
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
    fetch(`https://mlight.nanesoft-lab.com/courses/`, {
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
    <>
    <Toaster />
    <div className="main-content">
    <div className="page-content">
    <div className="container-fluid">
    <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">Course Registration</h4>

                          
                

                </div>
            </div>
        </div>

        <div className="row">
      <div className="col-xl-12">
                  <div className="card ">
                      <div className="card-body ">
                      <CardHeader title={"Register a new course"} />
                      <div className="row col-xl-8 mx-auto">
            <div className="mb-8 flex flex-col items-center">
            
          <form className="text-start " onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-3 col-12">
              <label  className="form-label">Name <span className='text-danger fs-sm'>*</span></label>
                <input
                  className=" form-control "
                  type="text"
                  name="name"
                  placeholder="Enter Course Name"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12">
              <label  className="form-label">Period <span className='text-danger fs-sm'>*</span></label>
                <input
                  className=" form-control "
                  type="number"
                  name="period"
                  required
                  placeholder="Enter Course Period (in months)"
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12">
              <label  className="form-label">Amount <span className='text-danger fs-sm'>*</span></label>
                <input
                  className=" form-control "
                  type="number"
                  name="fees"
                  required
                  placeholder="Enter Fee Amount (in Kshs)"
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12">
              
                <input
                  className="bg-transparent h-full ml-2 mr-4 accent-dark-secondary_2"
                  type="checkbox"
                  name="accept_mode"
                  checked={acceptMode}
                  onChange={handleCheckboxChange}
                />
                <label  className="form-label">Does the Course support both Hybrid and Remote? <span className='text-danger fs-sm'>*</span></label>
                <p className="text-light-secondary_2 dark:text-dark-secondary_2 text-sm outline-none">
                  
                </p>
              </div>
            </div>
            {loading ? (
              <div className="mt-4 flex justify-center text-lg">
                <button
                  type="submit"
                  className="btn btn-primary w-md outline"
                >
                  <CgSpinnerTwo className="spin" />
                </button>
              </div>
            ) : (
              <div className="mt-4 flex justify-center text-lg">
                <button
                  type="submit"
                  className="btn btn-primary w-md outline"
                >
                  Add Course
                </button>
              </div>
            )}
          </form>
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
  );
}

export default AddCourse;
