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
    fetch(`${baseUrl}/generate/fee-stracture/?student_id=${student_id}`, {
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
      fetch(`${baseUrl}/send-reminders/`, {
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
    fetch(`${baseUrl}/transactions/?search=${student_id}`, {
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
    fetch(`${baseUrl}/cohort/${id}/`, {
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
    <div className="w-full h-full overflow-y-auto flex flex-col">
      <div className="w-full h-auto my-3 grid grid-cols-1 md:grid-cols-2 ">
        <div className="w-[92%] md:w-[230px] lg:w-[80%] lg:mb-2 mb-3 mx-auto pt-3 shadow-lg h-max min-h-[150px] rounded-md bg-light-secondary_2 dark:bg-dark-secondary_2 flex flex-col items-center justify-evenly">
          <TbProgressCheck className="text-[40px] w-[45px] p-2 h-[45px] rounded-[50%] bg-light-black_color dark:bg-dark-text_color text-light-secondary dark:text-dark-secondary" />
          <p className="w-full py-2 px-1 text-center text-light-text_color dark:text-dark-text_color tracking-wider font-semibold">
            Course Progress
          </p>
          <p className="w-full py-2 px-1 text-center text-light-text_color dark:text-dark-text_color tracking-wider font-bold">
            10%
          </p>
        </div>
        <div className="w-[92%] md:w-[230px] lg:w-[80%] mx-auto mb-3 pt-3 lg:mb-0 shadow-lg h-max min-h-[150px] rounded-md bg-light-secondary_2 dark:bg-dark-secondary_2 flex flex-col items-center justify-evenly">
          <svg
            className="w-[45px] p-2 h-[45px] rounded-[50%] bg-light-black_color dark:bg-dark-text_color"
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 30H3C2.20459 29.9994 1.44199 29.7735 0.879557 29.3717C0.31712 28.97 0.000794215 28.4253 0 27.8571V2.14286C0.000794215 1.57471 0.31712 1.03 0.879557 0.628255C1.44199 0.226514 2.20459 0.000567296 3 0H27C27.7954 0.000567296 28.558 0.226514 29.1204 0.628255C29.6829 1.03 29.9992 1.57471 30 2.14286V19.9479L22.5 17.2693L15 19.9479V2.14286H3V27.8571H27V23.5714H30V27.8571C29.9988 28.4252 29.6824 28.9698 29.12 29.3714C28.5577 29.7731 27.7953 29.9991 27 30ZM22.5 14.8736L27 16.4807V2.14286H18V16.4807L22.5 14.8736Z"
              fill="#8BDC77"
            />
          </svg>
          <p className="w-full py-2 px-1 text-center text-light-text_color dark:text-dark-text_color tracking-wider font-semibold">
            Registered Course
          </p>
          <p className="w-full py-2 px-1 text-center text-light-text_color dark:text-dark-text_color capitalize tracking-wider font-bold">
            {courseData.name}
          </p>
        </div>
        <div className="w-[92%] md:w-[230px] lg:w-[80%] lg:mb-2  mx-auto mb-3 pt-3 shadow-lg  h-max min-h-[150px] rounded-md bg-light-secondary_2 dark:bg-dark-secondary_2 flex flex-col items-center justify-evenly">
          <FcBusinessman className="text-[40px] w-[45px] p-2 h-[45px] rounded-[50%] bg-light-black_color dark:bg-dark-text_color " />
          <p className="w-full py-2 px-1 text-center text-light-text_color dark:text-dark-text_color tracking-wider font-semibold">
            Technical Mentor
          </p>
          <p className="w-full py-2 px-1 text-center text-light-text_color dark:text-dark-text_color capitalize tracking-wider font-bold">
            {myMentors.length > 0
              ? myMentors[myMentors.length - 1].first_name
              : myMentors.length === 0
              ? "0"
              : "Loading..."}
          </p>
        </div>
        <div className="w-[92%] md:w-[230px] lg:w-[80%] lg:mb-2 mx-auto mb-3 pt-3 shadow-lg  h-max min-h-[150px] rounded-md bg-light-secondary_2 dark:bg-dark-secondary_2 flex flex-col items-center justify-evenly">
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Total Billed:{" "}
            <span>
              {loading
                ? "loading..."
                : feeDetails.length > 0
                ? `Kshs. ${feeDetails[0].total_amount}`
                : totalBill
                ? `Kshs. ${totalBill}`
                : "loading..."}
            </span>
          </p>
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Total Paid:{" "}
            <span>
              {loading
                ? "loading..."
                : feeDetails.length > 0
                ? `Kshs. ${
                    feeDetails[0].total_amount -
                    feeDetails[feeDetails.length - 1].balance
                  }`
                : "Kshs. 0"}
            </span>
          </p>
          <p className="w-full px-2 flex justify-between border-b border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color capitalize tracking-wide">
            Balance Due:{" "}
            <span>
              {loading
                ? "loading..."
                : feeDetails.length > 0
                ? `Kshs. ${feeDetails[feeDetails.length - 1].balance}`
                : totalBill
                ? `Kshs. ${totalBill}`
                : "loading..."}
            </span>
          </p>
          <div className="w-full px-2 flex flex-col border-b-light-text_color dark:border-b-dark-text_color text-light-text_color dark:text-dark-text_color">
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
                        <span key={index} className="w-full text-[14px]">
                          Pay Installment {dueDate.installment} of Kshs.{" "}
                          {installmentData.dueB} Due on{" "}
                          {new Date(installmentData.dueD).toDateString()}
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
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex px-4 pb-4 md:p-2 gap-2 flex-col mt-3 py-2 md:pb-2  items-center md:items-start md:flex-row  justify-evenly flex-wrap">
        <div className="flex flex-col shadow-lg w-full md:w-[75%] lg:w-[60%] overflow-hidden rounded-lg mb-4 lg:mb-0">
          <p className="w-full py-2 px-3 bg-light-secondary dark:bg-dark-secondary">
            Student Information
          </p>
          <div className="w-full min-h-max bg-light-secondary_2 dark:bg-dark-secondary_2 ">
            <img
              className="w-[70px] ml-6 h-[70px] mt-2 object-cover shadow-xl rounded-[50%]"
              src={userData.profile_pic ? userData.profile_pic : profilePic}
              alt=""
            />
            <div className="w-full">
              <p className="w-full flex justify-between py-2 px-2 md:px-8 text-light-text_color dark:text-dark-text_color font-semibold border-b border-b-secondary">
                Registration Number{" "}
                <span className="uppercase font-medium">
                  {userData.registration_number
                    ? userData.registration_number
                    : "--"}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-full flex justify-between py-2 px-2 md:px-8 text-light-text_color dark:text-dark-text_color font-semibold border-b border-b-secondary">
                Cohort{" "}
                <span className="uppercase font-medium">
                  {done ? cohortName : <CgSpinnerTwo className="spin" />}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-full flex justify-between py-2 px-2 md:px-8 text-light-text_color dark:text-dark-text_color font-semibold border-b border-b-secondary">
                Name{" "}
                <span className="capitalize font-medium">
                  {userData.first_name && userData.first_name}{" "}
                  {userData.last_name && userData.last_name}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-full flex justify-between py-2 px-2 md:px-8 text-light-text_color dark:text-dark-text_color font-semibold border-b border-b-secondary">
                ID/Passport Number{" "}
                <span className="capitalize font-medium">
                  {userData.id_number ? userData.id_number : "--"}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-full flex justify-between py-2 px-2 md:px-8 text-light-text_color dark:text-dark-text_color font-semibold border-b border-b-secondary">
                Gender{" "}
                <span className="capitalize font-medium">
                  {userData.gender ? userData.gender : "--"}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-full flex justify-between py-2 px-2 md:px-8 text-light-text_color dark:text-dark-text_color font-semibold border-b border-b-secondary">
                Username
                <span className="font-medium">
                  {userData.username ? userData.username : "--"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col shadow-lg w-full  md:w-[75%] lg:w-[35%] lg:h-full mb-8 md:mb-2 overflow-hidden rounded-lg ">
          <p className="w-full py-2 px-3 bg-light-secondary dark:bg-dark-secondary">
            Student Contact Information
          </p>
          <div className="w-full pb-4 lg:pb-0  bg-light-secondary_2 dark:bg-dark-secondary_2 flex-1">
            <div className="w-full ">
              <p className="w-11/12 flex justify-between mx-auto mt-4 rounded-md py-2 px-2 text-light-black_color dark:text-light-black_color font-semibold bg-light-bg_white shadow-lg dark:bg-dark-text_color ">
                Phone Number
                <span className="uppercase  font-medium">
                  {userData.phone ? userData.phone : "--"}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-11/12 flex justify-between mx-auto mt-4 rounded-md py-2 px-2 text-light-black_color dark:text-light-black_color font-semibold bg-light-bg_white shadow-lg dark:bg-dark-text_color ">
                Email
                <span className="font-medium">
                  {userData.email ? userData.email : "--"}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-11/12 flex justify-between mx-auto mt-4 rounded-md py-2 px-2 text-light-black_color dark:text-light-black_color font-semibold bg-light-bg_white shadow-lg dark:bg-dark-text_color ">
                County
                <span className="capitalize font-medium">
                  {userData.county ? userData.county : "--"}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-11/12 flex justify-between mx-auto mt-4 rounded-md py-2 px-2 text-light-black_color dark:text-light-black_color font-semibold bg-light-bg_white shadow-lg dark:bg-dark-text_color ">
                Town
                <span className="capitalize font-medium">
                  {userData.town ? userData.town : "--"}
                </span>
              </p>
            </div>
            <div className="w-full ">
              <p className="w-11/12 flex justify-between mx-auto mt-4 rounded-md py-2 px-2 text-light-black_color dark:text-light-black_color font-semibold bg-light-bg_white shadow-lg dark:bg-dark-text_color ">
                Postal Address
                <span className="capitalize font-medium">
                  {userData.address ? userData.address : "--"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-auto h-auto py-2 px-6 my-3 ">
        <button
          onClick={handleUpdate}
          className="bg-light-secondary dark:bg-dark-secondary_3 py-2 px-4 text-light-text_color dark:text-dark-text_color font-semibold transition-all duration-500 hover:bg-light-secondary_2 hover:dark:bg-dark-secondary_2 dark:bg-dark-secondary_2 rounded-md"
        >
          Update Information
        </button>
      </div>
    </div>
  );
}

export default Content;
