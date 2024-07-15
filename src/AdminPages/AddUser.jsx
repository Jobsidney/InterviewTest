import React from "react";
import logo from "../Images/logo.png";
import { useState, useEffect } from "react";
import { TiLockClosed } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { BsBookHalf } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiSolidPhone } from "react-icons/bi";
import { CgSpinnerTwo } from "react-icons/cg";
import { BiSolidGraduation } from "react-icons/bi";
import { toast } from "react-toastify";
import baseUrl from "../BaseUrl";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

function AddUser() {
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);
  const [loadingCohort, setLoadingCohort] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [loadingMode, setLoadingMode] = useState(true);
  const [courses, setCourses] = useState([]);
  const [installmentPlan, setInstallmentPlan] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [learningMode, setLearningMode] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const fetchCourses = () => {
    fetch(`${baseUrl}/courses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }
        return res.json();
      })
      .then((res) => {
        setCourses(res);
      })
      .catch((error) => {
        error &&
          toast.error("Failed to fetch courses", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
      });
  };

  const fetchCohort = () => {
    fetch(`${baseUrl}/cohort/`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch cohort");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setCohort(res);
        setLoadingCohort(false);
      })
      .catch((error) => {
        error &&
          toast.error("Failed to fetch cohort", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
      });
  };
  const fetchLearningMode = () => {
    fetch(`${baseUrl}/learning-mode/`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Learning mode");
        }
        return res.json();
      })
      .then((res) => {
        setLearningMode(res);
        setLoadingMode(false);
      })
      .catch((error) => {
        error &&
          toast.error("Failed to fetch Learning mode", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
      });
  };

  const fetchInstallmentPlan = () => {
    fetch(`${baseUrl}/installement-plans/`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Installment Plans");
        }
        return res.json();
      })
      .then((res) => {
        setInstallmentPlan(res);
        setLoadingPlan(false);
      })
      .catch((error) => {
        error &&
          toast.error("Failed to fetch Installment Plans", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
      });
  };

  useEffect(() => {
    fetchCourses();
    fetchInstallmentPlan();
    fetchCohort();
    fetchLearningMode();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    JSON.stringify(formDataObject);
    fetch(`${baseUrl}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.registration_number) {
          toast.success("User Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
          if (res.role === "student") {
            navigate("/admin");
            window.location.reload();
          } else if (res.role === "teacher") {
            navigate("/admin/mentors");
          }
        } else if (
          res.non_field_errors ||
          res.email ||
          res.username ||
          res.phone ||
          res.first_name ||
          res.last_name ||
          res.id_number ||
          res.gender ||
          res.period
        ) {
          const errorMessages = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              errorMessages.push(res[key][0]);
            }
          }
          toast.error(errorMessages.join("\n"), {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 6000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }
      });
  };

  return (
    <div className="flex h-screen w-full items-center overflow-hidden justify-center bg-light-primary dark:bg-dark-primary bg-cover bg-no-repeat">
      <div className="rounded-xl w-11/12 md:w-4/6 scroll max-h-full overflow-y-auto bg-light-secondary dark:bg-dark-secondary  px-2 md:px-10 py-4 md:py-10 shadow-lg backdrop-blur-md ">
        {!loadingCohort && !loadingPlan && !loadingMode ? (
          <div className="text-light-secondary_2 dark:text-dark-secondary_2">
            <div className="mb-8 flex flex-col items-center">
              <h1 className="mb-2 text-2xl text-light-secondary_2 dark:text-dark-secondary_2 uppercase font-semibold">
                User Registration
              </h1>
              <img
                className="w-[120px] h-[120px] object-cover"
                src={logo}
                alt="logo"
              />
              <span className="text-light-secondary_2 dark:text-dark-secondary_2 font-semibold capitalize">
                User(Student/Mentor) Details
              </span>
            </div>
            {installmentPlan.length > 0 && cohort.length > 0 ? (
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl border-none  items-center bg-light-primary dark:bg-dark-primary overflow-hidden  px-2 placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BiSolidGraduation className="text-[18px]" />
                    <select
                      required
                      className="flex-1 bg-light-primary h-full text-sm  py-3 pl-2  outline-none"
                      name="role"
                    >
                      <option value="" selected disabled>
                        Select User
                      </option>
                      <option value="student">Student</option>
                      <option value="teacher">Technical Mentor</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BiSolidUser className="text-[18px]" />
                    <input
                      required
                      className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none"
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BiSolidUser className="text-[18px]" />
                    <input
                      required
                      className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none "
                      type="last_name"
                      name="last_name"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BiSolidUser className="text-[18px]" />
                    <input
                      required
                      className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none "
                      type="text"
                      name="username"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <FaBirthdayCake className="text-[16px]" />
                    <input
                      required
                      className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none "
                      type="id_number"
                      name="id_number"
                      placeholder="National ID"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <MdEmail className="text-[16px]" />
                    <input
                      required
                      className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none "
                      type="text"
                      name="email"
                      placeholder="Enter your Email Address"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BiSolidPhone className="text-[18px]" />
                    <input
                      required
                      className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none "
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone Number"
                    />
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl border-none overflow-hidden items-center bg-light-primary dark:bg-dark-primary  px-2 placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <FaUser className="text-[16px]" />
                    <select
                      required
                      className="flex-1 bg-light-primary h-full text-sm  py-3 pl-2  outline-none"
                      name="gender"
                    >
                      <option value="" selected disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center overflow-hidden border-none bg-light-primary dark:bg-dark-primary  px-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BsBookHalf className="text-[16px]" />
                    <select
                      required
                      className="flex-1 bg-light-primary h-full text-sm  py-3 pl-2  outline-none"
                      name="course_id"
                    >
                      <option selected disabled>
                        Select Course
                      </option>
                      {courses.length > 0
                        ? courses.map(({ id, period, name }) => (
                            <option id={id} key={id} value={id}>
                              {name} {period} {" Months"}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center overflow-hidden border-none bg-light-primary dark:bg-dark-primary  px-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BiSolidUser className="text-[16px]" />
                    <select
                      required
                      className="flex-1 bg-light-primary h-full text-sm  py-3 pl-2  outline-none"
                      name="cohort_id"
                    >
                      <option selected disabled>
                        Select Cohort
                      </option>
                      {cohort.length > 0
                        ? cohort.map(({ id, start_date, name, slot_remaining, capacity }) => (
                            <option id={id} key={id} value={id}>
                              {name} (Starting:{" "}
                              {new Date(start_date).toDateString()} {'-'} slot {slot_remaining}/{capacity})
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center overflow-hidden border-none bg-light-primary dark:bg-dark-primary  px-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BsBookHalf className="text-[16px]" />
                    <select
                      required
                      className="flex-1 bg-light-primary h-full text-sm  py-3 pl-2  outline-none"
                      name="installement_id"
                    >
                      <option selected disabled>
                        Select Installment Plan
                      </option>
                      {installmentPlan.length > 0
                        ? installmentPlan.map(({ id, intrest, name }) => (
                            <option id={id} key={id} value={id}>
                              <span className="font-bold text-[10px] capitalize">
                                {name} -{" "}
                              </span>{" "}
                              {"Intrest"} (Kshs.{intrest})
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center overflow-hidden border-none bg-light-primary dark:bg-dark-primary  px-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <BsBookHalf className="text-[16px]" />
                    <select
                      required
                      className="flex-1 bg-light-primary h-full text-sm  py-3 pl-2  outline-none"
                      name="mode_id"
                    >
                      <option selected disabled>
                        Select Learning Mode
                      </option>
                      {learningMode.length > 0
                        ? learningMode.map(({ id, name }) => (
                            <option id={id} key={id} value={id}>
                              <span className="font-bold text-lg capitalize">
                                {name}{" "}
                              </span>{" "}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <TiLockClosed className="text-[18px]" />
                    <input
                      required
                      className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none "
                      type={`${show ? "text" : "password"}`}
                      name="password"
                      placeholder="Assign Temporary Password"
                    />
                    {!show ? (
                      <AiFillEyeInvisible
                        onClick={() => setShow(true)}
                        className="text-[18px] cursor-pointer mr-1"
                      />
                    ) : (
                      <AiFillEye
                        onClick={() => setShow(false)}
                        className="text-[18px] cursor-pointer mr-1"
                      />
                    )}
                  </div>
                </div>
                <div className="mb-4 w-full flex">
                  <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                    <TiLockClosed className="text-[18px]" />
                    <input
                      required
                      className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none "
                      type={`${show2 ? "text" : "password"}`}
                      name="confirm_password"
                      placeholder="Confirm Password"
                    />
                    {!show2 ? (
                      <AiFillEyeInvisible
                        onClick={() => setShow2(true)}
                        className="text-[18px] cursor-pointer mr-1"
                      />
                    ) : (
                      <AiFillEye
                        onClick={() => setShow2(false)}
                        className="text-[18px] cursor-pointer mr-1"
                      />
                    )}
                  </div>
                </div>
                {loading ? (
                  <div className="mt-8 flex justify-center text-lg">
                    <button
                      type="submit"
                      className="rounded-3xl bg-light-primary dark:bg-dark-primary text-[27px]  px-16 py-3 capitalize font-bold shadow-xl backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300  hover:bg-light-secondary dark:bg-dark-secondary"
                    >
                      <CgSpinnerTwo className="spin" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 flex justify-center text-lg">
                    <button
                      type="submit"
                      className="rounded-3xl bg-light-primary dark:bg-dark-primary  px-10 py-3 capitalize font-bold shadow-xl backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300 hover:text-white hover:bg-light-secondary dark:bg-dark-secondary"
                    >
                      Register
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <p className="text-white">
                Corhot or Installment Plan is Missing Kindly Add
              </p>
            )}
          </div>
        ) : (
          <div className="w-full h-full grid place-content-center">
            <CgSpinnerTwo className="spin text-[25px]" />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddUser;
