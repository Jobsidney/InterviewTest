import React, { useState } from "react";
import { BsTelephoneInboundFill } from "react-icons/bs";
import baseUrl from "../../BaseUrl";
import { toast } from "react-toastify";
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);
  const [resetpasswordPage, setResetPasswordPage] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState(null);
  const [phonePage, setPhonePage] = useState(true);
  const [otpPage, setOtpPage] = useState(false);
  const [otpCodeReceived, setOtpCodeReceived] = useState("");
  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const pickPassword = (e) => {
    const { name, value } = e.target;

    setPassword((password) => ({
      ...password,
      [name]: value,
    }));
  };

  // const checkPassword = (e) =>{
  //   const value = e.target.value;
  //   if(value != password.new_password)return false
  //   return true;
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = {
      phone: phone,
    };
    // setLoading(false);
    // toast.success("Otp sent", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 3000,
    //   style: {
    //     backgroundColor: "#22272c",
    //     color: "white",
    //   },
    // });

    
   

    // setTimeout(() => {
    //   setPhonePage(false);
    //   setOtpPage(true);
    // }, 2000);
    fetch(`https://mlight.nanesoft-lab.com/send-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if(res.message === "No user matching the phone"){
          toast.error('No user matching the phone', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }else{
          setOtpCodeReceived(res.otp);
          toast.success(res.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
          setOtpPage(true);
          setPhonePage(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error) {
          toast.error("Error occurred while Sending OTP! Try Again", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            style: {
              backgroundColor: "#22272c",
              color: "white",
            },
          });
        }
      });
  };

  const handleSubmitOtp = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = {
      otp: otpCode,
    };
    
    if (parseInt(otpCode) === otpCodeReceived) {
      setResetPasswordPage(true);
      setOtpPage(false)
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("The OTP Code Entered is not matching!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        style: {
          backgroundColor: "#22272c",
          color: "white",
        },
      });
    }

  }
  const handlePasswordReset = (event) => {
    event.preventDefault();   
    setLoading(true);
      if (password.new_password && password.confirm_password) {
        if (password.new_password === password.confirm_password) {
          const updatedPassword = {
            ...password,
            phone: phone,
            otp: otpCode,
          };
          setLoading(false);
          fetch(`https://mlight.nanesoft-lab.com/reset-password/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPassword),
          })
            .then((res) => res.json())
            .then((res) => {
              if(res.message){
                toast.success("Password was reset Successfully", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                  style: {
                    backgroundColor: "#22272c",
                    color: "white",
                  },
                });
                setTimeout(()=>{
                  navigate('../')
                }, 2000);
              }else{
                toast.success("Somett Wrong! Couldn't reset Password!", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                  style: {
                    backgroundColor: "#22272c",
                    color: "white",
                  },
                });
              }
          })
          .catch(error =>{
            if(error){
              toast.error("Something Went Wrong!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                style: {
                  backgroundColor: "#22272c",
                  color: "white",
                },
              });
            }
          })
        }else{
          toast.error('Password Do not Match', {
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

  return (
    <div className="w-full h-full grid place-content-center px-2">
      {phonePage && (
        <div className="min-w-3/5 mx-auto  h-max md:top-[-10px] md:right-64 p-2 z-10 rounded-xl shadow-lg bg-light-secondary_2 dark:bg-dark-secondary_2">
          <div className="w-full">
            <div className="text-center w-full p-1 grid place-content-center">
              <BsTelephoneInboundFill className="mx-auto text-[35px] text-light-secondary dark:text-dark-secondary " />
              <p className="text-medium mx-auto py-4 text-light-text_color dark:text-dark-text_color">
                Enter Phone Number to Receive the OTP Code
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="tel"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2 px-2 text-light-text_color dark:text-dark-text_color rounded-md bg-light-secondary dark:bg-dark-secondary  outline-none"
                  required
                />
                {loading ? (
                  <button
                    type="submit"
                    className="w-1/2 bg-light-secondary dark:bg-dark-secondary mt-3 rounded-md py-2 px-2 font-semibold"
                  >
                    <CgSpinnerTwo className="spin text-[24px] mx-auto" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-1/2 bg-light-secondary dark:bg-dark-secondary mt-3 rounded-md py-2 px-2 font-semibold"
                  >
                    Send OTP
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      {otpPage && (
        <div className="min-w-3/5 mx-auto  h-max md:top-[-10px] md:right-64 p-2 z-10 rounded-xl shadow-lg bg-light-secondary_2 dark:bg-dark-secondary_2">
          <div className="w-full">
            <div className="text-center w-full p-1 grid place-content-center">
              <BsTelephoneInboundFill className="mx-auto text-[35px] text-light-secondary dark:text-dark-secondary " />
              <p className="text-medium mx-auto py-4 text-light-text_color dark:text-dark-text_color">
                Enter The OTP Code Sent To Your Phone
              </p>
              <form onSubmit={handleSubmitOtp}>
                <input
                  type="number"
                  name="otp"
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full py-2 px-2 text-light-text_color dark:text-dark-text_color rounded-md bg-light-secondary dark:bg-dark-secondary  outline-none"
                  required
                />
                {loading ? (
                  <button
                    type="submit"
                    className="w-1/2 bg-light-secondary dark:bg-dark-secondary mt-3 rounded-md py-2 px-2 font-semibold"
                  >
                    <CgSpinnerTwo className="spin text-[24px] mx-auto" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-1/2 bg-light-secondary dark:bg-dark-secondary mt-3 rounded-md py-2 px-2 font-semibold"
                  >
                    Ok
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {resetpasswordPage && (
        <div className="min-w-3/5 mx-auto  h-max md:top-[-10px] md:right-64 p-2 z-10 rounded-xl shadow-lg bg-light-secondary_2 dark:bg-dark-secondary_2">
          <div className="w-full">
            <div className="text-center w-full p-1 grid place-content-center">
              <form onSubmit={handlePasswordReset}>
                <input
                  type="password"
                  onChange={(e) => pickPassword(e)}
                  name="new_password"
                  placeholder="Enter Your new password"
                  className="w-full py-2 px-2 text-light-text_color dark:text-dark-text_color rounded-md bg-light-secondary dark:bg-dark-secondary  outline-none"
                  required
                />
                <input
                  type="password"
                  onKeyUp={(e) => pickPassword(e)}
                  name="confirm_password"
                  placeholder="Confirm Your new password"
                  className="w-full py-2 px-2 mt-3 text-light-text_color dark:text-dark-text_color rounded-md bg-light-secondary dark:bg-dark-secondary  outline-none"
                  required
                />
                {loading ? (
                  <button
                    type="submit"
                    className="w-1/2 bg-light-secondary dark:bg-dark-secondary mt-3 rounded-md py-2 px-2 font-semibold"
                  >
                    <CgSpinnerTwo className="spin text-[24px] mx-auto" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-1/2 bg-light-secondary dark:bg-dark-secondary mt-3 rounded-md py-2 px-2 font-semibold"
                  >
                    Reset Password
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
