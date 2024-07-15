import React, { useEffect, useState } from "react";
import statement from "../../Images/statement.svg";
import baseUrl from "../../BaseUrl";
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AllTransactions() {
  const navigate = useNavigate();
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [fetchedUserDetails, setFetchedUserDetails] = useState({});

  const filteredData =
    statements.length > 0 ? (
      statements.filter((statement) => {
        if (
          statement.first_name.toLowerCase().includes(search.toLowerCase()) ||
          statement.last_name.toLowerCase().includes(search.toLowerCase()) ||
          statement.registration_number
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          statement.email.toLowerCase().includes(search.toLowerCase())
        ) {
          return statement;
        }
      })
    ) : (
      <p className="text-white w-full whitespace-nowrap py-6 text-center">
        No statements Found
      </p>
    );

  const fetchStudentDetails = async (studentId) => {
    if (fetchedUserDetails[studentId]) {
      return fetchedUserDetails[studentId];
    }

    try {
      const response = await fetch(`https://mlight.nanesoft-lab.com/users/${studentId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const studentData = await response.json();
        setFetchedUserDetails((prevState) => ({
          ...prevState,
          [studentId]: studentData,
        }));
        return studentData;
      } else {
        console.error("Error fetching student details");
        return null;
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      return null;
    }
  };

  const fetchFeeStatements = async () => {
    try {
      const response = await fetch(`https://mlight.nanesoft-lab.com/transactions/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const transactionData = await response.json();

        const uniqueStudentIds = [
          ...new Set(
            transactionData.map((transaction) => transaction.student_id)
          ),
        ];

        const studentDetailsPromises =
          uniqueStudentIds.map(fetchStudentDetails);
        const studentDetailsArray = await Promise.all(studentDetailsPromises);

        const statementsWithStudentDetails = transactionData.map(
          (transaction) => ({
            ...transaction,
            studentDetails: studentDetailsArray.find(
              (student) => student.id === transaction.student_id
            ),
          })
        );

        setStatements(studentDetailsArray);
        setLoading(false);
      } else {
        console.error("Error fetching transactions");
      }
    } catch (error) {
      setLoading(false);
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
    }
  };

  useEffect(() => {
    fetchFeeStatements();
  }, []);

  useEffect(() => {
    let paidTotal = 0;
    let balanceTotal = 0;
    statements.forEach(({ amount, balance }) => {
      paidTotal += amount;
      balanceTotal += balance;
    });
    setTotalPaid(paidTotal);
    setTotalBalance(balanceTotal);
  }, [statements]);

  const handleViewDetails = (
    id,
    first_name,
    last_name,
    registration_number
  ) => {
    localStorage.setItem(
      "studentId",
      JSON.stringify({
        id: id,
        first_name: first_name,
        last_name: last_name,
        registration_number: registration_number,
      })
    );
    navigate("./details");
  };
  return (
    <div className="w-full h-full flex flex-col mt-2 px-4 py-2">
      <div className="w-full flex items-center flex-col sm:flex-row px-4 bg-light-secondary dark:bg-dark-secondary rounded-t-md py-2 gap-3">
        <div className="flex items-center gap-2">
          <img className="w-[35px]" src={statement} alt="" />
          <p>Fee Statement</p>
        </div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="w-[40%] ml-2 py-2 px-4 outline-none rounded-3xl"
          placeholder="Search by name/regNo/email"
          type="search"
          name="search"
        />
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
                Registration Number
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Student Name
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Student Email
              </th>
              <th className="whitespace-nowrap text-left" id="bold">
                Action
              </th>
            </tr>
            {filteredData.length > 0 ? (
              filteredData.map(
                (
                  { id, first_name, last_name, email, registration_number },
                  index
                ) => (
                  <tr key={id} className="py-3">
                    <td data-th="No." className="md:text-center w-8">
                      {index + 1}.
                    </td>
                    <td data-th="Registration Number" className="uppercase">
                      {registration_number}{" "}
                    </td>
                    <td data-th="Name" className="capitalize">
                      {first_name} {last_name}
                    </td>
                    <td data-th="Email" className="">
                      <a
                        href={`mailto:${email}`}
                        rel="noreferer"
                        target="_blank"
                        className="lowercase text-blue-600"
                      >
                        {email ? email : "--"}
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleViewDetails(
                            id,
                            first_name,
                            last_name,
                            registration_number
                          )
                        }
                        type="button"
                        className="w-auto h-auto py-1 px-4 my-1 bg-light-primary rounded-md"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <p className="text-white w-full whitespace-nowrap py-6 px-4 text-center">
                No student Found
              </p>
            )}
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTransactions;
