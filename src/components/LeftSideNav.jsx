import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import '../assets/css/app.min.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/icons.min.css'

function LeftSideNav({  userData }) {

    const [isCollapsed,setIsCollapsed] =useState(false);
    const [selected,setSelected] =useState("Dashboard");
    const navigate=useNavigate();
    // const signOut = useSignOut()
    const logOut = () => {
        localStorage.removeItem("adminData");
        localStorage.removeItem("courseData");
        localStorage.removeItem("tokenAdmin");
        navigate("../", { replace: true });
      };
      if (!userData || userData === null) {
        navigate("../", { replace: true });
      }
  return (
    <div data-sidebar="dark" className="" >

        <div id="layout-wrapper"> 
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                      
                        <div className="navbar-brand-box">
                            <a href="index.html" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src="/assets/images/logo.svg" alt="" height="80%"/>
                                </span>
                                <span className="logo-lg">
                                    <img src="/assets/images/logo-dark.png" alt="" height="80%"/>
                                </span>
                            </a>

                            <a href="index.html" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src="/assets/images/logo-light.svg" alt="" height="80%"/>
                                </span>
                                <span className="logo-lg">
                                    <img src="/assets/images/logo-light.png" alt="" height="80%"/>
                                </span>
                            </a>
                        </div>

                        <button type="button" className="d-md-none btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                            <i className="fa fa-fw fa-bars"></i>
                        </button>

                     

                        
                    </div>

                    <div className="d-flex">
                        <div className="dropdown d-none d-lg-inline-block ms-1">
                            <button type="button" className="btn header-item noti-icon waves-effect" data-bs-toggle="fullscreen">
                                <i className="bx bx-fullscreen"></i>
                            </button>
                        </div>

                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bx bx-bell bx-tada"></i>
                                <span className="badge bg-danger rounded-pill">3</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                                <div className="p-3">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0" key="t-notifications"> Notifications </h6>
                                        </div>
                                        <div className="col-auto">
                                            <a href="#!" className="small" key="t-view-all"> View All</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 border-top d-grid">
                                    <a className="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                        <i className="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">View More..</span> 
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle header-profile-user" src="/assets/images/users/avatar-1.jpg" alt="Header Avatar"/>
                                <span className="d-none d-xl-inline-block ms-1" key="t-henry">{userData.first_name && userData.first_name}{" "}
              {userData.last_name && userData.last_name}
              {userData.username && userData.username}</span>
                                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                               
                                <a className="dropdown-item" href="#"><i className="bx bx-user font-size-16 align-middle me-1"></i> <span key="t-profile">Profile</span></a>
                                <a className="dropdown-item" href="#"><i className="bx bx-wallet font-size-16 align-middle me-1"></i> <span key="t-my-wallet">My Wallet</span></a>
                                <a className="dropdown-item d-block" href="#"><span className="badge bg-success float-end">11</span><i className="bx bx-wrench font-size-16 align-middle me-1"></i> <span key="t-settings">Settings</span></a>
                                <a className="dropdown-item" href="#"><i className="bx bx-lock-open font-size-16 align-middle me-1"></i> <span key="t-lock-screen">Lock screen</span></a>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item text-danger" type='button' onClick={() => logOut()}><i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></button>
                            </div>
                        </div>

                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item noti-icon right-bar-toggle waves-effect">
                                <i className="bx bx-cog bx-spin"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            <Sidebar>
            <div className="vertical-menu">

                <div data-simplebar="init" className="h-100 simplebar-scrollable-y">
                    <div className="simplebar-wrapper" >
                        <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer">
                                </div></div>
                                <div className="simplebar-mask"><div className="simplebar-offset" >
                                    <div className="simplebar-content-wrapper"  role="region" aria-label="scrollable content" >
                                        <div className="simplebar-content" >

                    
                    <div id="sidebar-menu" className="text-start mm-active">
                    <Menu
                    
                    >
                    <div className="menu-title" key="t-menu">Menu</div>
                    
    
                    <MenuItem component={<Link to="/" />}> 
                    <div className="">
                                <a href="" className=" waves-effect mm-active">
                                    <i className="bx bx-home-circle"></i>
                                    <span key="t-dashboards">Dashboards</span>
                                </a>
                            
                            </div>
                    </MenuItem>


                    <div className="menu-title" key="t-pages">Programmes</div>

                    <MenuItem component={<Link to="/admin/students" />}> 
                    <a href="" className="text-primary fw-bold">
                                    <i className="bx bx-file"></i>
                                    <span key="t-utility">Students</span>
                                </a>
                    </MenuItem>
                    <SubMenu  label={<a href="" className="text-primary fw-bold">
                                    <i className="bx bx-file"></i>
                                    <span key="t-utility">Scholarships</span>
                                </a>}>
                    <MenuItem  component={<Link to="/studentsTableF1" />} > Form 1 </MenuItem>
                    <MenuItem component={<Link to="/studentsTableF2" />} > Form 2 </MenuItem>
                    <MenuItem component={<Link to="/studentsTableF3" />} > Form 3 </MenuItem>
                    <MenuItem component={<Link to="/studentsTableF4" />} > Form 4 </MenuItem>
                    <div className="menu-title" key="t-pages">University</div>
                    <MenuItem component={<Link to="/studentsTableY1" />} > Year One</MenuItem>
                    <MenuItem component={<Link to="/studentsTableY2" />} > Year Two</MenuItem>
                    <MenuItem component={<Link to="/studentsTableY3" />} > Year Three</MenuItem>
                    <MenuItem component={<Link to="/studentsTableY4" />} > Year Four</MenuItem>
                    <div className="menu-title" key="t-pages">Alumni</div>
                    <MenuItem component={<Link to="/Alumni" />} > Alumni</MenuItem>
                    <div className="menu-title" key="t-pages">Others</div>
                    <MenuItem component={<Link to="/studentsExpelled" />} > Expelled Students </MenuItem>
                    <MenuItem component={<Link to="/scholars" />} > All Students</MenuItem>
                    </SubMenu>
                    <SubMenu label={<a href="" className="">
                                    <i className="bx bx-file"></i>
                                    <span key="t-utility">Inuka</span>
                                </a>}>
                    <MenuItem> Form 1 </MenuItem>
                    <MenuItem> Form 2 </MenuItem>
                    </SubMenu>
                    <SubMenu label={<a href="" className="">
                                    <i className="bx bx-file"></i>
                                    <span key="t-utility">Tuungane</span>
                                </a>}>
                    <MenuItem> Form 1 </MenuItem>
                    <MenuItem> Form 2 </MenuItem>
                    </SubMenu>

                    <SubMenu label={<a href="" className="waves-effect">
                                    <i className="bx bx-file"></i>
                                    <span key="t-utility">Janjaruka</span>
                                </a>}>
                    <MenuItem> Form 1 </MenuItem>
                    <MenuItem> Form 2 </MenuItem>
                    </SubMenu>
                    
                    <div className="menu-title" key="t-apps">Apps</div>
                    <MenuItem> <a href="" className=" waves-effect">
                                    <i className="bx bx-calendar"></i>
                                    <span key="t-dashboards">Calendars</span>
                                </a>
                     </MenuItem>
                     <MenuItem> 
                         <a href="chat.html" className="waves-effect">
                                    <i className="bx bx-chat"></i>
                                    <span key="t-chat">Chat</span>
                                </a>
                     </MenuItem>
                     <SubMenu label={<a href="" className="waves-effect">
                                    <i className="bx bx-envelope"></i>
                                    <span key="t-email">Email</span>
                                </a>}>
                    <MenuItem> Inbox</MenuItem>
                    <MenuItem> Read </MenuItem>
                    </SubMenu>

  </Menu>
                     
            
                    </div>

                </div></div></div></div><div className="simplebar-placeholder" ></div></div><div className="simplebar-track simplebar-horizontal" ><div className="simplebar-scrollbar" ></div></div><div className="simplebar-track simplebar-vertical" >
                    <div className="simplebar-scrollbar" ></div></div></div>
            </div>
            </Sidebar>
  
</div>
        </div>
       
  )
}

export default LeftSideNav