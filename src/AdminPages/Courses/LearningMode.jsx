import React, { useState, useEffect } from "react";
import { GiLaptop } from "react-icons/gi";
import { CgSpinnerTwo } from "react-icons/cg";
import { toast } from "react-toastify";
import baseUrl from "../../BaseUrl";
import { useNavigate } from "react-router-dom";

function LearningMode() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    fetch(`${baseUrl}/learning-mode/`, {
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
          toast.success("Learning Mode Was Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }        
      })
      .catch(error => {
        if(error){
          toast.error('Something Went Wrong!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 6000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }
      })
      .finally(error => {
        if(error){
          toast.error('Something Went Wrong!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 6000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }
      })
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl w-11/12 sm:w-9/12 md:w-4/6 scroll max-h-full overflow-y-auto bg-light-secondary dark:bg-dark-secondary  px-2 md:px-10 py-4 md:py-10 shadow-lg backdrop-blur-md flex items-center justify-center flex-col"
        action=""
      >
        <p className="text-light-secondary_2 dark:text-dark-secondary_2 text-2xl font-semibold">
          Add Learning Mode
        </p>
        <div className="w-full flex rounded-3xl items-center border-none bg-light-primary dark:bg-dark-primary  px-2 py-3  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2 text-light-secondary_2 dark:text-dark-secondary_2  placeholder:text-sm shadow-lg outline-none backdrop-blur-md text-[16px]">
          <GiLaptop className="text-[16px]" />
          <input
            className=" flex-1 bg-transparent h-full pl-2  placeholder:text-light-secondary_2 placeholder:dark:text-dark-secondary_2  placeholder:text-sm outline-none "
            type="text"
            name="name"
            id=""
            required
            placeholder="Add Learning Mode eg remote"
          />
        </div>
        {loading ? (
          <div className="mt-8 flex justify-center text-lg">
            <button
              type="submit"
              className="rounded-3xl bg-light-primary dark:bg-dark-primary text-[27px]  px-16 py-3 capitalize font-bold shadow-xl backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300  hover:bg-light-secondary dark:bg-dark-secondary"
            >
              <CgSpinnerTwo className="spin" />
            </button>
          </div>
        ) : (
          <div className="mt-8 flex justify-center text-lg">
            <button
              type="submit"
              className="rounded-3xl bg-light-primary dark:bg-dark-primary  px-10 py-3 capitalize font-bold shadow-xl backdrop-blur-md text-light-secondary_2 dark:text-dark-secondary_2 transition-colors duration-300 hover:text-white hover:bg-light-secondary dark:bg-dark-secondary"
            >
              Add Mode
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default LearningMode;
