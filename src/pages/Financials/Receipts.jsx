import React, { useEffect, useState } from "react";
import statement from "../../Images/statement.svg";
import baseUrl from "../../BaseUrl";
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Receipts() {
  const navigate = useNavigate("");
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const student_id = JSON.parse(localStorage.getItem("userData")).userData.id;
  const fetchReceipts = () => {
    fetch(`${baseUrl}/transactions/?search=${student_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setReceipts(res);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchReceipts();
  }, []);
  const handlePrint = (id) => {
    localStorage.setItem("receiptId", JSON.stringify(id));
    navigate("./download");
  };

  return (
    <div className="w-full h-full flex flex-col mt-2 px-4 py-2">
      <div className="w-full flex items-center px-4 bg-light-secondary dark:bg-dark-secondary rounded-t-md py-2 gap-3">
        <img className="w-[35px]" src={statement} alt="" />
        <p>Fee Statement</p>
      </div>
      {loading ? (
        <div className="w-full py-10 grid place-content-center text-[25px]">
          <CgSpinnerTwo className="spin" />
        </div>
      ) : (
        <div className="w-full flex-1 px-4 py-2 shadow-lg rounded-b-md overflow-y-auto bg-light-secondary_2 dark:bg-dark-secondary_2">
          <table class="rwd-table mt-3 mb-3">
            <tr className="w-full">
              <th className="w-8" id="bold">
                No.
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Date Paid
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Transaction Code
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
              <th className="whitespace-nowrap text-left" id="bold">
                Action
              </th>
            </tr>
            {receipts.length > 0 ? (
              receipts.map(
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
                        {new Date(date_paid).toDateString()}
                      </span>
                    </td>
                    <td data-th="Transaction Code" className="uppercase">
                      {reff_code}{" "}
                    </td>
                    <td data-th="Mode of Payment" className="capitalize">
                      {" "}
                      {mode_of_payment}{" "}
                    </td>
                    <td data-th="Total Billed">Kshs. {total_amount}</td>
                    <td data-th="Paid">Kshs. {amount}</td>
                    <td data-th="Balance Due">Kshs. {balance}</td>
                    <td
                      data-th="Action"
                      className="grid place-content-center w-auto h-auto"
                    >
                      <button
                        onClick={() => handlePrint(id)}
                        type="button"
                        className="py-2 my-1 px-5 bg-light-bg_white dark:bg-dark-secondary_2 text-dark-secondary_2 dark:text-light-secondary_2 font-semibold uppercase text-sm hover:bg-gray-100 rounded-md "
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <p className="text-white w-full whitespace-nowrap py-6 text-center">
                No Receipts Found
              </p>
            )}
          </table>
        </div>
      )}
    </div>
  );
}

export default Receipts;
