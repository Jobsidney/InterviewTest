import React, { useState, useEffect } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CgSpinnerTwo } from "react-icons/cg";
import baseUrl from "../BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [courseNames, setCourseNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadDelete, setLoadDelete] = useState(false);
  const [confirmPage, setConfirmPage] = useState(false);
  const [mentorId, setMentorId] = useState(null);
  const [mentorName, setMentorName] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate("");

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
            const response = await fetch(`${baseUrl}/courses/${courseId}/`, {
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
    fetch(`${baseUrl}/users/${id}/`, {
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
    <div className="w-full h-full px-4">
      <div className="w-full h-auto mt-4 flex rounded-md mb-4 flex-col">
        <div className="flex items-center w-full h-auto py-2 px-4 rounded-t-md font-semibold bg-light-secondary dark:bg-dark-secondary">
          <AiOutlineBars className="text-[18px] text-light-text_color dark:text-dark-text_color mr-2" />
          <p className="capitalize text-light-text_color dark:text-dark-text_color mr-2">
            All Technical Mentors{" "}
          </p>
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="w-[40%] ml-2 py-2 px-4 outline-none rounded-3xl"
            placeholder="Search by name/regNo/email"
            type="search"
            name="search"
          />
          <button
            onClick={() => navigate("/admin/add_user")}
            className="text-center mx-auto py-2 border px-4 bg-light-secondary_2 dark:bg-dark-secondary_2 rounded-3xl"
          >
            Add Mentor
          </button>
        </div>
        {isLoading ? (
          <div className="w-full py-10 grid place-content-center text-[25px]">
            <CgSpinnerTwo className="spin" />
          </div>
        ) : filteredMentorsData.length > 0 ? (
          <div className="w-full shadow-lg h-full bg-light-secondary_2 dark:bg-dark-secondary_2 px-4 py-2 rounded-b-md overflow-y-auto">
            {filteredMentorsData.map(
              ({ first_name, last_name, course_id, phone, id }, index) => (
                <div className="flex justify-between shadow-lg flex-col lg:flex-row px-2 py-2 items-center md:px-4 mb-2 rounded-md bg-light-bg_white dark:bg-dark-bg_white">
                  <div className=" w-full lg:w-auto text-left ">
                    {index + 1}.
                  </div>
                  <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">First Name</p>
                    <p className="capitalize">
                      {first_name ? first_name : "--"}
                    </p>
                  </div>
                  <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">Last Name</p>
                    <p className="capitalize">{last_name ? last_name : "--"}</p>
                  </div>
                  <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">Phone Number</p>
                    <p className="uppercase">{phone ? phone : "--"}</p>
                  </div>
                  <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">Course Assigned</p>
                    <p className="capitalize">
                      {courseNames[course_id] || "loading..."}
                    </p>
                  </div>
                  <div className="w-full flex lg:flex-col py-2 my-1 lg:py-1 shadow-md lg:shadow-none rounded-sm px-2 lg:w-auto">
                    <p className="w-full font-semibold">Actions</p>
                    <div className="flex gap-2">
                      <p className="w-auto py-2 px-3 rounded-md text-light-text_color transition-all duration-500 cursor-pointer hover:text-white text-lg bg-light-button_edit dark:bg-dark-button_edit">
                        <RiEdit2Fill />
                      </p>
                      <p
                        onClick={() => pickMentorId(id, first_name)}
                        className="w-auto py-2 px-3 rounded-md text-light-text_color transition-all duration-500 cursor-pointer hover:text-red-600 text-lg bg-light-button_delete dark:bg-dark-button_delete"
                      >
                        <RiDeleteBin6Fill />
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-white w-full whitespace-nowrap py-6 text-center">
            No mentors Found
          </p>
        )}
      </div>
      {confirmPage ? (
        <div className="w-max h-max absolute top-0 right-2 md:top-[20px] md:right-5 p-2 z-10 rounded-xl shadow-lg bg-white">
          <div className="w-[250px]">
            <div className="text-center p-1 flex-auto justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 flex items-center text-red-500 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-medium py-4">
                Are you sure You want to delete{" "}
                <span className="text-danger font-semibold">
                  {mentorName ? mentorName : "this"}
                </span>{" "}
                from Technical Mentor's List?
              </p>
            </div>
            <div className="p-3 mt-2 text-center space-x-4 md:block">
              <button
                onClick={() => handleCancel()}
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              {loadDelete ? (
                <button
                  onClick={() => handleConfirmDelete()}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-lg shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  <CgSpinnerTwo className="spin" />
                </button>
              ) : (
                <button
                  onClick={() => handleConfirmDelete()}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Mentors;
