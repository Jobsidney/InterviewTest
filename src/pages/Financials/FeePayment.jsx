import React, { useState } from "react";
import { BiSolidPhone } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineCheck } from "react-icons/ai";
import { CgSpinnerTwo } from "react-icons/cg";
import { toast } from "react-toastify";
import baseUrl from "../../BaseUrl";
import CardHeader from "../../components/CardHeader";

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
    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">Pay tuition Fee</h4>

                          
                

                </div>
            </div>
        </div>
    <div className="row">
      <div className="col-xl-12">
       <div className="card ">
       <CardHeader title={'Mpesa Fee Payment'}/>
      <form
        onSubmit={(e) => handleFeePayment(e)}
        className="text-start col-lg-8 mx-auto  mb-md-5"
        action=""
      >
        
        <div className="w-full h-auto flex  flex-col md:flex-row items-center justify-center gap-3"></div>
        <div className="w-full h-auto my-2 ">
          <div className="mb-4 w-full flex items-center justify-center flex-col gap-4">
            <div
              className='mb-4'
            >
              <label  className="form-label">M-Pesa Number</label>
              <input
                className=" form-control"
                type="tel"
                id="phone"
                name="mpesa_phone"
                required
                placeholder="Enter Mpesa Number eg 0710****30"
              />
            </div>
            <div className=" mb-4">
            <label  className="form-label">Amount</label>
              <input
                className=" form-control"
                type="number"
                name="amount"
                id="amount"
                required
                placeholder="Enter Amount (in Kshs) eg 20,000"
              />
            </div>
            {loading ? (
              <div className="col-lg-4 mx-auto ">
                <button
                  type="submit"
                  className="btn btn-primary w-md outline"
                >
                  <CgSpinnerTwo className="spin" />
                </button>
              </div>
            ) : (
              <div className="col-lg-4 mx-auto text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-md outline"
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
    </div> </div> </div> </div> </div> 
  );
}

export default FeePayment;
