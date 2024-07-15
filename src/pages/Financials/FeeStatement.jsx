import React, { useEffect, useState } from "react";
import statement from "../../Images/statement.svg";
import baseUrl from "../../BaseUrl";
import { CgSpinnerTwo } from "react-icons/cg";
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function StudentTransaction() {
  const navigate = useNavigate('')
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amountFilter, setAmountFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const studentDetails = JSON.parse(localStorage.getItem("userData")).userData;
  const student_id = studentDetails.id;

  const filteredData =
    statements.length > 0 ? (
      statements.filter((statement) => {
        const amountMatch =
          amountFilter === "" || statement.amount === parseInt(amountFilter);
        const dayMatch =
          dayFilter === "" ||
          new Date(statement.date_paid).getDate() === parseInt(dayFilter);
        const monthMatch =
          monthFilter === "" ||
          new Date(statement.date_paid).getMonth() === parseInt(monthFilter);
        const yearMatch =
          yearFilter === "" ||
          new Date(statement.date_paid).getFullYear() === parseInt(yearFilter);

        return amountMatch && dayMatch && monthMatch && yearMatch;
      })
    ) : (
      <p className="text-white w-full whitespace-nowrap py-6 text-center">
        No statements Found
      </p>
    );

  const fetchFeeStatements = () => {
    fetch(`${baseUrl}/transactions/?search=${student_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setStatements(res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error) {
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
  };
  useEffect(() => {
    fetchFeeStatements();
  }, []);
    const handlePrintStatement = () => {
      navigate("./download");
    };
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2017 },
    (_, index) => 2018 + index
  );
  return (
    <div className="w-full h-full flex flex-col mt-2 px-4 py-2">
      <div className="w-full flex flex-wrap items-center px-4 bg-light-secondary dark:bg-dark-secondary rounded-t-md py-2 gap-3">
        <IoIosArrowRoundBack
          onClick={() => window.history.back()}
          className="text-[24px] cursor-pointer mr-3"
        />
        <img className="w-[35px]" src={statement} alt="" />
        <p>Fee Statement</p>
        <button
          onClick={handlePrintStatement}
          className="py-2 my-1 px-5 bg-light-bg_white dark:bg-dark-secondary_2 text-dark-secondary_2 dark:text-light-secondary_2 font-semibold uppercase text-sm hover:bg-gray-100 rounded-md "
          type="button"
        >
          Print Statement
        </button>
        <input
          onChange={(e) => setAmountFilter(e.target.value)}
          value={amountFilter}
          className="ml-2 py-2 px-4 outline-none rounded-3xl"
          placeholder="Search by amount"
          type="number"
          name="searchAmount"
        />
        <select
          onChange={(e) => setDayFilter(e.target.value)}
          value={dayFilter}
          className="ml-2 py-2 px-4 outline-none rounded-3xl bg-white"
          placeholder="Filter by day"
          type="number"
          name="filterDay"
        >
          <option value="" selected>
            Filter by day
          </option>
          {Array.from({ length: 31 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <select
          name="monthFilter"
          id="monthFilter"
          className="ml-2 py-2 px-4 outline-none rounded-3xl bg-white"
          onChange={(e) => setMonthFilter(e.target.value)}
        >
          <option selected value="">
            Filter by Month
          </option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>

        <select
          name="yearFilter"
          id="yearFilter"
          className="ml-2 py-2 px-4 outline-none rounded-3xl bg-white"
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="" selected>
            Filter by Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="w-full py-10 grid place-content-center text-[25px]">
          <CgSpinnerTwo className="spin" />
        </div>
      ) : (
        <div className="w-full flex-1  px-1 md:px-4 py-2 shadow-lg rounded-b-md overflow-y-auto bg-light-secondary_2 dark:bg-dark-secondary_2">
          <p className="w-full h-auto py-2 px-4 text-center">
            {" "}
            {studentDetails.first_name} {studentDetails.last_name} Reg No.{" "}
            {studentDetails.registration_number}
          </p>
          <table class="rwd-table mt-3 mb-3">
            <tr className="w-full">
              <th className="w-8" id="bold">
                No.
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Date Paid
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Ref Number
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Mode of Payment
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Total Billed
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Paid
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Balance Due
              </th>
            </tr>
            {filteredData.length > 0 ? (
              filteredData.map(
                (
                  {
                    id,
                    amount,
                    date_paid,
                    balance,
                    reff_code,
                    total_amount,
                    mode_of_payment,
                  },
                  index
                ) => (
                  <tr key={id} className="py-3">
                    <td data-th="No." className="md:text-center w-8">
                      {index + 1}
                    </td>
                    <td data-th="Date Paid">
                      <span className="uppercase">
                        {new Date(date_paid).toDateString()}{" "}
                        {/* {new Date(date_paid).toLocaleTimeString()} */}
                      </span>
                    </td>
                    <td data-th="Ref Number" className="uppercase">
                      {reff_code}{" "}
                    </td>
                    <td data-th="Mode of Payment" className="capitalize">
                      {" "}
                      {mode_of_payment}{" "}
                    </td>
                    <td data-th="Total Billed">Kshs. {total_amount}</td>
                    <td data-th="Paid">Kshs. {amount}</td>
                    <td data-th="Balance Due">Kshs. {balance}</td>
                  </tr>
                )
              )
            ) : (
              <p className="text-white w-full whitespace-nowrap py-6 text-center">
                No statements Found
              </p>
            )}
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentTransaction;
