import React, { useState, useEffect } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { CgSpinnerTwo } from "react-icons/cg";
import baseUrl from "../../BaseUrl";
import { toast } from "react-toastify";


function MyMentors({ userData }) {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
          return (
            teacher.role === "teacher" &&
            teacher.course_id === userData.course_id
          );
        });
        setMentors(teachers);
        setIsLoading(false);
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

  return (
    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">My mentors</h4>

                          
                

                </div>
            </div>
        </div>
    <div className="row">
      <div className="col-xl-12">
       <div className="card ">
        {isLoading ? (
          <div className="w-full py-10 grid place-content-center text-[25px]">
            <CgSpinnerTwo className="spin" />
          </div>
        ) : mentors.length > 0 ? (
          <div className="w-full shadow-lg h-full bg-light-secondary_2 dark:bg-dark-secondary_2 px-4 py-2 rounded-b-md overflow-y-auto">
            {mentors.map(
              ({ first_name, last_name, phone, email, id }, index) => (
                <div key={id} className="d-flex flex-row justify-content-between border-bottom">
                  <div className=" w-full lg:w-auto text-left ">
                    {index + 1}.
                  </div>
                  <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">Name</p>
                    <p className="capitalize">
                      {first_name ? first_name : "--"} {last_name ? last_name : "--"}
                    </p>
                  </div>                 
                  <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">Phone Number</p>
                    <a href={`tel:${phone}`} rel="noreferer" target="_blank" className="lowercase text-blue-600">{phone ? phone : "--"}</a>
                  </div>
                  <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">Email Address</p>
                    <a href={`mailto:${email}`} rel="noreferer" target="_blank" className="lowercase text-blue-600">{email ? email : "--"}</a>
                  </div>
                  
                </div>
              )
            )}
          </div>
        ) : (
          <p className="w-full min-h-full text-center text-danger">No Mentor is Assigned to You</p>
        )}
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default MyMentors;
