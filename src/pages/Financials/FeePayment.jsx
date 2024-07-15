import React, { useState } from "react";
import { BiSolidPhone } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineCheck } from "react-icons/ai";
import { CgSpinnerTwo } from "react-icons/cg";
import { toast } from "react-toastify";
import baseUrl from "../../BaseUrl";

function FeePayment() {
  const [loading, setLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(true);
  const [hide, setHide] = useState(true);
  const [showForm, setShowForm] = useState(false);
  // const [number, setNumber] = useState('');
  const token = JSON.parse(localStorage.getItem("token"));
  const student_id = JSON.parse(localStorage.getItem("userData")).userData.id;
  // const handleUseMyNumber = () => {
  //   let myNumber = JSON.parse(localStorage.getItem("userData")).userData.phone;
  //   setNumber(myNumber);
  //   setShowNumber(false);
  //   setShowForm(true);
  //   setHide(false);
  // };
  // const handleUseOtherNumber = () => {
  //   setShowNumber(true);
  //   setShowForm(true);
  //   setHide(false);
  // };

  const handleFeePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    const mpesaNumber = document.getElementById("phone").value;
    const amount = document.getElementById("amount").value;
    const paymentData = {
      mpesa_phone: mpesaNumber,
      amount: amount,
      student_id: student_id,
    };
    fetch(`https://mlight.nanesoft-lab.com/fee-payment/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        toast.success(res + " To complete fee Payment", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 20000,
          style: {
            backgroundColor: "#22272c",
            color: "white",
          },
        });
      })
      .catch((error) => {
        if (error) {
          toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }
      })
      .finally((error) => {
        if (error) {
          toast.error(error, {
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

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={(e) => handleFeePayment(e)}
        className="rounded-xl w-11/12 sm:w-9/12 md:w-5/6 lg:w-4/6 scroll max-h-full overflow-y-auto bg-light-secondary dark:bg-dark-secondary  px-2 md:px-10 py-4 md:py-6 shadow-lg backdrop-blur-md flex items-center flex-col"
        action=""
      >
        <p>Mpesa Fee Payment</p>
        <div className="w-full h-auto flex  flex-col md:flex-row items-center justify-center gap-3"></div>
        <div className="w-full h-auto my-2 ">
          <div className="mb-4 w-full flex items-center justify-center flex-col gap-4">
            <div
              className={`w-full ${
                showNumber ? "flex" : "hidden"
              } rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]`}
            >
              <BiSolidPhone className="text-[18px]" />
              <input
                className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none"
                type="tel"
                id="phone"
                name="mpesa_phone"
                required
                placeholder="Enter Mpesa Number eg 0710****30"
              />
            </div>
            <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
              <GiMoneyStack className="text-[18px]" />
              <input
                className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none"
                type="number"
                name="amount"
                id="amount"
                required
                placeholder="Enter Amount (in Kshs) eg 20,000"
              />
            </div>
            {loading ? (
              <div className="mt-2 flex justify-center text-lg">
                <button
                  type="submit"
                  className="rounded-3xl bg-light-primary dark:bg-dark-primary text-[27px] bg-opacity-50 px-16 py-2 capitalize font-bold shadow-xl backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300  hover:bg-light-secondary dark:bg-dark-secondary"
                >
                  <CgSpinnerTwo className="spin" />
                </button>
              </div>
            ) : (
              <div className="mt-2 flex justify-center text-lg">
                <button
                  type="submit"
                  className="rounded-3xl bg-light-primary dark:bg-dark-primary bg-opacity-50 px-10 py-2 capitalize font-bold shadow-md backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300 hover:text-white hover:bg-light-secondary dark:bg-dark-secondary"
                >
                  Pay
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default FeePayment;
