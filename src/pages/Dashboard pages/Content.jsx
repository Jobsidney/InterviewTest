import React, { useEffect, useState } from "react";
import { TbProgressCheck } from "react-icons/tb";
import { FcBusinessman } from "react-icons/fc";
import profilePic from "../../Images/profile.png";
import baseUrl from "../../BaseUrl";
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Content({ userData, courseData, done2, dueDates }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [totalBill, setTotalBill] = useState("");
  const [feeDetails, setFeeDetails] = useState([]);
  const [cohortName, setCohortName] = useState("");
  const [done, setDone] = useState(false);
  const [c, setC] = useState(false);
  const [d, setD] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [myMentors, setMyMentors] = useState([]);
  const [structureDetails, setStructureDetails] = useState([]);
  const student_id = userData.id;
  function fetchCourse() {
    fetch(`https://mlight.nanesoft-lab.com/generate/fee-stracture/?student_id=${student_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setStructureDetails(res);
        localStorage.setItem("startDate", JSON.stringify(res.start_date));
        setTotalBill(res.total_fees);
        setC(true);
      });
  }
  const sendReminders = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const body = {
      student_ids: `${student_id}`,
    };
    if (token) {
      fetch(`https://mlight.nanesoft-lab.com/send-reminders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res === "Reminder sent successfully") {
            toast.success("Reminder sent successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          } else {
            toast.error("Something Went Wrong", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          }
        })
        .catch((err) => {
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
        })
        .finally((err) => {
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
    }
  };
  function fetchFeeDetails() {
    fetch(`https://mlight.nanesoft-lab.com/transactions/?search=${student_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeDetails(res);
        setD(true);
        setLoading(false);
      })
      .catch((err) => {
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
      })
      .finally((err) => {
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
  }
  useEffect(() => {
    fetchCourse();
    fetchFeeDetails();
  }, []);
  function getLastReminderTimestamp() {
    const lastReminderTimestamp = localStorage.getItem("lastReminderTimestamp");
    return lastReminderTimestamp ? parseInt(lastReminderTimestamp, 10) : 0;
  }
  const remindersSent = new Array(dueDates.length).fill(false);
  function checkAndSendReminders() {
    if (done2) {
      const currentTimestamp = new Date().getTime();
      const lastReminderTimestamp = getLastReminderTimestamp();
        if (currentTimestamp - lastReminderTimestamp >= 2 * 60 * 60 * 1000) {
        dueDates.forEach((dueDate, index) => {
          if (remindersSent[index]) {
            return;
          }
  
          const totalPaidAmount =
            feeDetails.length > 0
              ? feeDetails[0].total_amount -
                feeDetails[feeDetails.length - 1].balance
              : 0;
  
          const sumInstallments = dueDates
            .slice(0, index + 1)
            .reduce((sum, installment) => sum + installment.amount, 0);
  
          if (totalPaidAmount < sumInstallments) {
            const dueDateTimestamp = new Date(dueDate.dueDate).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = dueDateTimestamp - currentTime;
  
            if (timeDifference <= 48 * 60 * 60 * 1000 && timeDifference > 0) {
              sendReminders(dueDate);
              remindersSent[index] = true;
                localStorage.setItem("lastReminderTimestamp", currentTime.toString());
            }
          }
        });
      }
    }
  }
  useEffect(() => {
    checkAndSendReminders();
  
    const reminderInterval = 24 * 60 * 60 * 1000;
    const intervalId = setInterval(checkAndSendReminders, reminderInterval);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
    

  const reminderInterval = 2 * 60 * 60 * 1000;
  setInterval(checkAndSendReminders, reminderInterval);
  checkAndSendReminders();

  if (courseData.name) {
    localStorage.setItem("courseName", JSON.stringify(courseData.name));
  }

  const fetchCohortName = (id) => {
    fetch(`https://mlight.nanesoft-lab.com/cohort/${id}/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("cohortName", JSON.stringify(res.name));
        setCohortName(res.name);
        setDone(true);
      });
  };
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
          return teacher.role === "teacher";
        });
        setMentors(teachers);
      })
      .catch((err) => {
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
      })
      .finally((err) => {
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
  }
  useEffect(() => {
    fetchCohortName(userData.cohort_id);
    fetchMentors();
  }, []);

  const handleUpdate = () => {
    navigate("./update_details");
  };
  useEffect(() => {
    if (mentors.length > 0) {
      const myMentorss = mentors.filter(({ course_id }) => {
        return course_id === userData.course_id;
      });
      setMyMentors(myMentorss);
    }
  }, [mentors]);

  return (
    <div className="main-content">
    <div className="page-content">
                        <div className="container-fluid">
      <div className="row">
      <a href="/janjaruka" className="col-md-3">
        <div className="card mini-stats-wid">
          <div className="card-body text-start">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Course Progress </p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 "> 10% </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">   </small>
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-shrink-0 align-self-center ">
                                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="/janjaruka" className="col-md-3">
                                            <div className="card mini-stats-wid">
                                                <div className="card-body text-start">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Technical Mentor</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">  {myMentors.length > 0
              ? myMentors[myMentors.length - 1].first_name
              : myMentors.length === 0
              ? "0"
              : "Loading..."} </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">  </small>
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-shrink-0 align-self-center ">
                                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="/janjaruka" className="col-md-3">
                                            <div className="card mini-stats-wid">
                                                <div className="card-body text-start">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Registered Course</p>
                                                            <div className="d-flex flex-row">
                                                                <h5 className="mb-0 ">   {courseData.name} </h5>
                                                                <small className="text-muted fw-medium text-sm mx-2">  </small>
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-shrink-0 align-self-center ">
                                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                                <span className="avatar-title rounded-circle bg-primary">
                                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>

        <div className="col-xl-4">
      <div className="card">
        <div className="card-body">
        <h4 className="card-title mb-4">Student Finance Info</h4>
        <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Total Billed:{" "}
            
          </p>
          <p><span>
              {loading
                ? "loading..."
                : feeDetails.length > 0
                ? `Kshs. ${feeDetails[0].total_amount}`
                : totalBill
                ? `Kshs. ${totalBill}`
                : "loading..."}
            </span></p>
          </div>
          <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Total Paid:{" "}
            
          </p>
          <p><span>
          {loading
                ? "loading..."
                : feeDetails.length > 0
                ? `Kshs. ${
                    feeDetails[0].total_amount -
                    feeDetails[feeDetails.length - 1].balance
                  }`
                : "Kshs. 0"}
            </span></p>
          </div>
          <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Due Balance:{" "}
            
          </p>
          <p><span>
          {loading
                ? "loading..."
                : feeDetails.length > 0
                ? `Kshs. ${feeDetails[feeDetails.length - 1].balance}`
                : totalBill
                ? `Kshs. ${totalBill}`
                : "loading..."}
            </span></p>
          </div>
          <small className="text-start">
            {done2 && d > 0 ? (
              <>
                {done2 > 0 && d ? (
                  <>
                    {dueDates.map((dueDate, index) => {
                      const totalPaidAmount =
                        feeDetails.length > 0
                          ? feeDetails[0].total_amount -
                            feeDetails[feeDetails.length - 1].balance
                          : 0;

                      const sumInstallments = dueDates
                        .slice(0, index + 1)
                        .reduce(
                          (sum, installment) => sum + installment.amount,
                          0
                        );

                      if (totalPaidAmount >= sumInstallments) {
                        return null;
                      }

                      const remainingBalance =
                        sumInstallments - totalPaidAmount;

                      const installmentKey = `Installment_${index}`;
                      const installmentData = {
                        dueB:
                          totalPaidAmount >= sumInstallments - dueDate.amount
                            ? remainingBalance
                            : dueDate.amount,
                        dueD: dueDate.dueDate,
                      };

                      localStorage.setItem(
                        installmentKey,
                        JSON.stringify(installmentData)
                      );

                      return (
                        <span key={index} className="text-start">
                          Pay Installment {dueDate.installment} of Kshs.{" "}
                          {installmentData.dueB} Due on{" "}
                          {new Date(installmentData.dueD).toDateString()}
                          <br/>
                        </span>
                       
                      );
                    })}
                  </>
                ) : (
                  "loading..."
                )}
              </>
            ) : (
              "loading..."
            )}
          </small>
        </div>
        </div>


        <div className="card">
        <div className="card-body">
        <h4 className="card-title mb-4">Student Information</h4>
        <div className="">
        
              <p className="form-control">
                Phone Number
                <span className="uppercase  font-medium">
                  {userData.phone ? userData.phone : "--"}
                </span>
              </p>
            
            
              <p className="form-control">
                Email
                <span className="font-medium">
                  {userData.email ? userData.email : "--"}
                </span>
              </p>
            
            
              <p className="form-control">
                County
                <span className="capitalize font-medium">
                  {userData.county ? userData.county : "--"}
                </span>
              </p>
            
            
              <p className="form-control">
                County
                <span className="capitalize font-medium">
                  {userData.county ? userData.county : "--"}
                </span>
              </p>
            
            
              <p className="form-control">
                Town
                <span className="capitalize font-medium">
                  {userData.town ? userData.town : "--"}
                </span>
              </p>
            
            
              <p className="form-control">
                Postal Address
                <span className="capitalize font-medium">
                  {userData.address ? userData.address : "--"}
                </span>
              </p>
            
        </div>
        </div>
        </div>
      </div>
<div className="col-xl-8">
      <div className="card">
        <div className="card-body">
        <h4 className="card-title mb-4">Student Information</h4>
        <img
              className="w-[70px] ml-6 h-[70px] mt-2 object-cover shadow-xl rounded-[50%]"
              src={userData.profile_pic ? userData.profile_pic : profilePic}
              alt=""
            />
          <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Registration Number:{" "}
            
          </p>
          <p><span>
          {userData.registration_number
                    ? userData.registration_number
                    : "--"}
            </span></p>
          </div>
          <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Cohort:{" "}
            
          </p>
          <p><span>
          {done ? cohortName : <CgSpinnerTwo className="spin" />}
            </span></p>
          </div>
          <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Name:{" "}
            
          </p>
          <p><span>
          {userData.first_name && userData.first_name}{" "}
          {userData.last_name && userData.last_name}
            </span></p>
          </div>
          <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            ID Number:{" "}
            
          </p>
          <p><span>
          {userData.id_number ? userData.id_number : "--"}
            </span></p>
          </div>
          <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Gender:{" "}
            
          </p>
          <p><span>
          {userData.gender ? userData.gender : "--"}
            </span></p>
          </div>
          <div className="flex-row d-flex justify-content-between border-bottom">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            UserName:{" "}
            
          </p>
          <p><span>
          {userData.username ? userData.username : "--"}
            </span></p>
          </div>
       
          
        </div>
        </div>
      </div>


      </div>
      
      <div className=" py-2 px-6 my-3 ">
        <button
          onClick={handleUpdate}
          className="btn btn-primary w-md outline"
        >
          Update Information
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Content;
