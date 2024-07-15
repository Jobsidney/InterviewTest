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
    fetch(`${baseUrl}/update-profile/`, {
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
    <div className="rounded-xl h-auto w-11/12 md:w-4/6 bg-light-secondary dark:bg-dark-secondary bg-opacity-50 px-2 md:px-10 py-4 md:py-10 shadow-lg backdrop-blur-md ">
      <div className="text-light-secondary_2 dark:text-dark-secondary_2 overflow-y-auto">
        <div className="flex flex-col items-center">
          <h1 className="mb-2 text-2xl text-light-secondary_2 text-center dark:text-dark-secondary_2 uppercase font-semibold">
            Update Your Details
          </h1>
          <img
            className="w-[120px] h-[120px] object-cover"
            src={logo}
            alt="logo"
          />
        </div>
        {data ? (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4 w-full flex">
              <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary bg-opacity-50 px-2 py-3  text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                <BiSolidPhone className="text-[18px]" />
                <input
                  className=" flex-1 bg-transparent h-full pl-2 placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 placeholder:text-sm outline-none "
                  type="tel"
                  name="phone"
                  onChange={handlePhoneChange}
                  defaultValue={data.phone}
                  placeholder="Enter Your Phone Number (+254***90)"
                />
              </div>
            </div>
            <div className="mb-4 w-full flex">
              <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary bg-opacity-50 px-2 py-3  text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
                <BiImages className="text-[18px]" />
                <p className="text-light-secondary_2 pl-2 dark:text-dark-secondary_2 text-sm outline-none">
                  Upload Image
                </p>
                <input
                  onChange={handleImageUpload}
                  className=" flex-1 bg-transparent h-full pl-2 placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 placeholder:text-sm outline-none "
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
                  className="rounded-3xl bg-light-primary mb-2 dark:bg-dark-primary text-[27px] bg-opacity-50 px-16 py-3 capitalize font-bold shadow-xl backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300  hover:bg-light-secondary dark:bg-dark-secondary"
                >
                  <CgSpinnerTwo className="spin" />
                </button>
              </div>
            ) : (
              <div className="mt-4 flex justify-center text-lg">
                <button
                  type="submit"
                  className="rounded-3xl bg-light-primary mb-2 dark:bg-dark-primary bg-opacity-50 px-10 py-3 capitalize font-bold shadow-md backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300 hover:text-white hover:bg-light-secondary dark:bg-dark-secondary"
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
    </div>
  );
}

export default UpdateStudentDetails;
