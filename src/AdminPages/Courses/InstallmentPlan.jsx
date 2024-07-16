import React, { useState, useEffect } from "react";
import { GiLaptop } from "react-icons/gi";
import { CgSpinnerTwo } from "react-icons/cg";
import { toast } from "react-toastify";
import baseUrl from "../../BaseUrl";
import { Toaster } from "react-hot-toast";
import CardHeader from "../../components/CardHeader";

function InstallmentPlan() {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.target);
  
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      fetch(`https://mlight.nanesoft-lab.com/installement-plans/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          if (res.id) {
            toast.success("Installment Plan Was Added Successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          }
        })
        .catch((error) => {
          if (error) {
            toast.error("Something Went Wrong!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 6000,
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          }
        })
        .finally((error) => {
          if (error) {
            toast.error("Something Went Wrong!", {
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

    <>
    <Toaster />
    <div className="main-content">
    <div className="page-content">
    <div className="container-fluid">
    <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">Installment Plan</h4>

                          
                

                </div>
            </div>
        </div>
        <div className="row">
      <div className="col-xl-12">
                  <div className="card ">
                      <div className="card-body ">
                      <div className="row col-xl-6 mx-auto">
                      <div className='mb-5'>
                      <CardHeader title={"Add Installment plans"} />
                      <form
        onSubmit={handleSubmit}
        className="text-start"
        action=""
      >
        
        <div className="row">
        <div className="mb-3 col-12">
        <label className="form-label">Installment Plan Name</label>
          <input
            className=" form-control "
            type="text"
            name="name"
            required
            placeholder="Enter installment plan name eg Last"
          />
           </div>
        </div>
        <div className="row">
        <div className="mb-3 col-12">
        <label className="form-label">Interest amount</label>
          <input
            className=" form-control "
            type="number"
            name="intrest"
            placeholder="Enter the Interest Amount (in Kshs) eg 1,000"
            required
          />
           </div>
        </div>
        <div className="row">
        <div className="mb-3 col-12">
        <label className="form-label">Installments</label>
          <input
            className=" form-control "
            type="number"
            name="installements"
            placeholder="Enter the number of installments eg 4"
            required
          />
           </div>
        </div>
        {loading ? (
          <div className="mt-8 flex justify-center text-lg">
            <button
              type="submit"
              className="btn btn-primary w-md outline "
            >
              <CgSpinnerTwo className="spin" />
            </button>
          </div>
        ) : (
          <div className="mt-8 flex justify-center text-lg">
            <button
              type="submit"
              className="btn btn-primary w-md outline "
            >
              Add Plan
            </button>
          </div>
        )}
      </form>
      
      </div>
      </div>
      </div>
      </div>
    </div>
    </div>
    </div>
      </div>
    </div>
    </>
    
  )
}

export default InstallmentPlan