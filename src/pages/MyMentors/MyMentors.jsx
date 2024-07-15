import React, { useState, useEffect } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { CgSpinnerTwo } from "react-icons/cg";
import baseUrl from "../../BaseUrl";
import { toast } from "react-toastify";


function MyMentors({ userData }) {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function fetchMentors() {
    fetch(`${baseUrl}/users/`, {
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
    <div className="w-full h-full px-4">
      <div className="w-full h-auto mt-4 flex rounded-md mb-4 flex-col">
        <div className="flex items-center w-full h-auto py-2 px-4 rounded-t-md font-semibold bg-light-secondary dark:bg-dark-secondary">
          <AiOutlineBars className="text-[18px] text-light-text_color dark:text-dark-text_color mr-2" />
          <p className="capitalize text-light-text_color dark:text-dark-text_color mr-2">
            My Technical Mentors{" "}
          </p>
        </div>
        {isLoading ? (
          <div className="w-full py-10 grid place-content-center text-[25px]">
            <CgSpinnerTwo className="spin" />
          </div>
        ) : mentors.length > 0 ? (
          <div className="w-full shadow-lg h-full bg-light-secondary_2 dark:bg-dark-secondary_2 px-4 py-2 rounded-b-md overflow-y-auto">
            {mentors.map(
              ({ first_name, last_name, phone, email, id }, index) => (
                <div key={id} className="flex justify-between shadow-lg flex-col lg:flex-row px-2 py-2 items-center md:px-4 mb-2 rounded-md bg-light-bg_white dark:bg-dark-bg_white">
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
                  {/* <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">Course Assigned</p>
                    <p className="capitalize">test</p>
                  </div> */}
                </div>
              )
            )}
          </div>
        ) : (
          <p className="w-full min-h-full text-center text-red-500">No Mentor is Assigned to You</p>
        )}
      </div>
    </div>
  );
}

export default MyMentors;
