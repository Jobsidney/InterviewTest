import axios from 'axios';
import React, { useState } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
// type Props = {}


function Login() {
  
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '', 
        password: '',
    })
    const navigate=useNavigate();

    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
       }

       const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('https://mlight.nanesoft-lab.com/api-token-auth/login/',formData)
        .then((res) => res.data)
        .then((res) => {
          setLoading(false);
          if (res.error) {
            toast.error(res.error, {
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          } else if (res.token && res.user.role === "student") {
            localStorage.setItem(
              "userData",
              JSON.stringify({
                userData: res.user,
                time: new Date(),
              })
            );
            // signIn({
            //     auth: {
            //         token: res.token,
            //         type: 'Bearer',
            //     },
            //     userState: {
            //         userData:res.user
            //     }
            // })
            localStorage.setItem("token", JSON.stringify(res.token));
            navigate("/dashboard", { replace: true });
            setLoading(false);
            toast.success("Login success", {
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          } else if (res.token && res.user.role === "admin") {
            localStorage.setItem(
              "adminData",
              JSON.stringify({
                adminData: res.user,
                time: new Date(),
              })
            );
          //   signIn({
          //     auth: {
          //         token: res.token,
          //         type: 'Bearer',
          //     },
          //     userState: {
          //         userData:res.user
          //     }
          // })
            localStorage.setItem("tokenAdmin", JSON.stringify(res.token));
            navigate("/admin", { replace: true });
            toast.success("Login success", {
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error) {
            toast.error("Check Your Internet Connection and Try again.", {
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          }
        })
        .finally((error) => {
          setLoading(false);
          if (error) {
            toast.error("Something Went Wrong!", {
              style: {
                backgroundColor: "#22272c",
                color: "white",
              },
            });
          }
        });
        
      }
        

    
  return (
    <div className="account-pages my-5 pt-sm-5">
      
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card overflow-hidden">
                            <div className="bg-primary-subtle">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="text-primary p-4">
                                            <h5 className="text-primary">Welcome Back!</h5>
                                            <p>Sign in to Moringa School</p>
                                        </div>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <img src="assets/images/profile-img.png" alt="" className="img-fluid"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0"> 
                                <div className="auth-logo">
                                    <a href="index.html" className="auth-logo-light">
                                        <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ0mzMNrvCYOAOts7eKAIQNC10xCqzYUtGQ&s" alt="" className="rounded-circle" height="34"/>
                                            </span>
                                        </div>
                                    </a>

                                    <a href="index.html" className="auth-logo-dark">
                                        <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ0mzMNrvCYOAOts7eKAIQNC10xCqzYUtGQ&s" alt="" className="rounded-circle" height="34"/>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                                <div className="p-2">
                                    <form className="form-horizontal" onSubmit={handleSubmit}>
        
                                        <div className="mb-3">
                                            <label  className="form-label">Email/username</label>
                                            <input type="text" className="form-control" id="email" name='email_or_phone_or_username' placeholder="Enter Email"  onChange={onChange}/>
                                        </div>
                
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <div className="input-group auth-pass-inputgroup">
                                                <input type="password" className="form-control"  onChange={onChange} name='password' id='password' placeholder="Enter password" aria-label="Password" aria-describedby="password-addon"/>
                                                <button className="btn btn-light " type="button" id="password-addon"><i className="mdi mdi-eye-outline"></i></button>
                                            </div>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" required type="checkbox" name='remember-check' id="remember-check"/>
                                            <label className="form-check-label" >
                                                Remember me
                                            </label>
                                        </div>
                                        
                                        <div className="mt-3 d-grid">
                                        {isLoading?
                                                 <LoadingButton loading  className="btn btn-primary waves-effect waves-light"   >
                                                 <button type="submit" className="btn btn-primary waves-effect waves-light"></button> 
                                                 </LoadingButton>
                                                : 
                                                <button className="btn btn-primary waves-effect waves-light" type="submit">Log In</button>
                                                }
                                            
                                        </div>
            
                                        <div className="mt-4 text-center">
                                            <h5 className="font-size-14 mb-3">Sign in with</h5>
            
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <a href="" className="social-list-item bg-primary text-white border-primary">
                                                        <i className="mdi mdi-facebook"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="" className="social-list-item bg-info text-white border-info">
                                                        <i className="mdi mdi-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="" className="social-list-item bg-danger text-white border-danger">
                                                        <i className="mdi mdi-google"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <a href="" className="text-muted"><i className="mdi mdi-lock me-1"></i> Forgot your password?</a>
                                        </div>
                                    </form>
                                </div>
            
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            
                            <div>
                                <p>Don't have an account ? <a href="auth-register.html" className="fw-medium text-primary"> Signup now </a> </p>
                                {/* <p>© <script>document.write(new Date().getFullYear())</script> Skote. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login