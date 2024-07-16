import React, { useState } from "react";
import logo from "../Images/logo.png";
import { HiOutlineMail } from "react-icons/hi";
import { BiImages } from "react-icons/bi";
import { CgSpinnerTwo } from "react-icons/cg";
import { BiSolidPhone } from "react-icons/bi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import baseUrl from "../BaseUrl";
import { document } from "postcss";

function UpdateStudentDetails() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const data = JSON.parse(localStorage.getItem("userData")).userData;
  const [phone, setPhone] = useState(data.phone);
  const token = JSON.parse(localStorage.getItem("token"));
  const [binaryImage, setBinaryImage] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setBinaryImage(file);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (binaryImage) {
      formData.append("image", binaryImage);
    }
    formData.append("user_id", data.id);
    formData.append("phone", phone);

    console.log(formData, "ll");
    fetch(`https://mlight.nanesoft-lab.com/update-profile/`, {
      method: "PUT",
      headers: {
        // 'Content-Type': 'form-data',
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.message) {
          toast.success(res.message +' Kindly re-login to View your Updated details', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });          
        }else{
          setLoading(false)
          toast.error('Kindly Upload Your Profile Image', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          }); 
        }
      })
      .then(error =>{
        if(error){
          toast.error('Could NOT Update Your Details', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          }); 
        }
      })
  };
  return (
    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="card-title mb-4">Update  Info</h4>

                          
                

                </div>
            </div>
        </div>
    <div className="row">
      <div className="col-xl-12">
       <div className="card ">
       <div className="col-lg-8 mx-auto text-center mb-md-5">
       <img
              className=" object-cover" width={"80px"}
              src={'/src/Images/logo.png'}
              alt="logo"
            />
            <h4 className="card-title mb-4">Update my  Infomation</h4>
       </div>
         
        {data ? (
          <form onSubmit={handleSubmit} className="col-lg-8 mx-auto text-start">
            <div className="mb-4 ">
              <div className="">
              <label  className="form-label">PhoneNumber</label>
                <input
                  className=" form-control "
                  type="tel"
                  name="phone"
                  onChange={handlePhoneChange}
                  defaultValue={data.phone}
                  placeholder="Enter Your Phone Number (+254***90)"
                />
              </div>
            </div>
            <div className="mb-4 ">
              <div className="">
                <BiImages className="text-[18px]" />
                <p className="">
                  Upload Image
                </p>
                <input
                  onChange={handleImageUpload}
                  className=" form-control "
                  type="file"
                  name="image"
                  accept="image/*"
                />
              </div>
            </div>
            {loading ? (
              <div className="mt-4 flex justify-center text-lg">
                <button
                  type="submit"
                  className="btn btn-primary w-md outline"
                >
                  <CgSpinnerTwo className="spin" />
                </button>
              </div>
            ) : (
              <div className="mt-4 flex justify-center text-lg">
                <button
                  type="submit"
                  className="btn btn-primary w-md outline"
                >
                  Update
                </button>
              </div>
            )}
          </form>
        ) : (
          "Loading..."
        )}
      </div>
    </div> </div>  </div> </div> </div> 
  );
}

export default UpdateStudentDetails;
