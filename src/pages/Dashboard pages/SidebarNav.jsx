import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import NavMenuItem from '../../components/NavMenuItem';

function SidebarNav({ setShowSidebar, userData, courseData }) {
  if (!userData || userData === null) {
    navigate("../", { replace: true });
  }
  const navigate = useNavigate("");
  const [showAcademics, setShowAcademics] = useState(false);
  const [showFinancials, setShowFinancials] = useState(false);
  const location = useLocation('');
  const handleFinancials = () => {
    setShowFinancials((prev) => !prev);
    setShowAcademics(false);
  };

  const logOut = () => {
    var itemToKeep = localStorage.getItem("darkMode");
    var itemToKeep2 = localStorage.getItem("lastReminderTimestamp");
    localStorage.clear();
    localStorage.setItem("darkMode", itemToKeep);
    localStorage.setItem("lastReminderTimestamp", itemToKeep2);

    navigate("../", { replace: true });
  };
  const handleAcademics = () => {
    setShowAcademics((prev) => !prev);
    setShowFinancials(false);
  };

  const handleDashboardClick = () => {
    setShowSidebar(false);

    if (showAcademics) {
      setShowAcademics(false);
    }
    if (showFinancials) {
      setShowFinancials(false);
    }
  };
  const handlePasswordResetClick = () => {
    setShowSidebar(false);
    if (showAcademics) {
      setShowAcademics(false);
    }
    if (showFinancials) {
      setShowFinancials(false);
    }
  };
  const [darkMode, setDarkMode] = useState("");
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      body.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      body.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    if (
      location.pathname.includes("course_registration") ||
      location.pathname.includes("results")
    ) {
      setShowAcademics(true);
    }
    if (
      location.pathname.includes("fee_structure") ||
      location.pathname.includes("receipts") ||
      location.pathname.includes("fee_payment") ||
      location.pathname.includes("fee_statement")
    ) {
      setShowFinancials(true);
    }
  }, []);
  return (
    <div data-sidebar="dark" className="" >

    <div id="layout-wrapper"> 
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                  
                    <div className="navbar-brand-box">
                        <a href="index.html" className="logo logo-dark">
                            <span className="logo-sm">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ0mzMNrvCYOAOts7eKAIQNC10xCqzYUtGQ&s" alt="" height="80%"/>
                            </span>
                            <span className="logo-lg">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ0mzMNrvCYOAOts7eKAIQNC10xCqzYUtGQ&s" alt="" height="80%"/>
                            </span>
                        </a>

                        <a href="index.html" className="logo logo-light">
                            <span className="logo-sm">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ0mzMNrvCYOAOts7eKAIQNC10xCqzYUtGQ&s" alt="" height="80%"/>
                            </span>
                            <span className="logo-lg">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ0mzMNrvCYOAOts7eKAIQNC10xCqzYUtGQ&s" alt="" height="80%"/>
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
                    <Menu>
                    <div className="menu-title" key="t-menu">Menu</div>
                    <MenuItem component={<Link to="/dashboard" />}> 
                    <div className="">
                                <a href="" className=" waves-effect mm-active">
                                    <i className="bx bx-home-circle"></i>
                                    <span key="t-dashboards">Dashboards</span>
                                </a>
                            
                            </div>
                    </MenuItem>
                    <div className="menu-title" key="t-pages">Programmes</div>
                    <SubMenu  label={<a href="" className="text-primary fw-bold">
                                    <i className="bx bx-pen"></i>
                                    <span key="t-utility">Academics</span>
                                </a>}>
                        <NavMenuItem primaryText={false} title={'Course Registration '} cssIcon={''} link={'/dashboard/course_registration'}/>
                        <NavMenuItem primaryText={false} title={'Provision Results '} cssIcon={''} link={'/dashboard/results'}/>
                  
                    </SubMenu>
                    <SubMenu  label={<a href="" className="text-primary fw-bold">
                                    <i className="bx bx-wallet"></i>
                                    <span key="t-utility">Financials</span>
                                </a>}>
                                <NavMenuItem primaryText={false} title={'Fee Structure '} cssIcon={''} link={'/dashboard/fee_structure'}/>
                                <NavMenuItem primaryText={false} title={'Fee Statement '} cssIcon={''} link={'/dashboard/fee_statement'}/>
                                <NavMenuItem primaryText={false} title={'Receipts '} cssIcon={''} link={'/dashboard/receipts'}/>
                                <NavMenuItem primaryText={false} title={'Fee Payment '} cssIcon={''} link={'/dashboard/fee_payment'}/>
                    </SubMenu>
                    <NavMenuItem primaryText={true} title={'My Mentor'} cssIcon={'bx-male'} link={'/dashboard/mentors'}/>
                    <NavMenuItem primaryText={true} title={'Reset Password'} cssIcon={'bx-wrench'} link={'/dashboard/reset_password'}/>
                    <NavMenuItem primaryText={true} title={'Feedback form'} cssIcon={'bx-file'} link={'https://docs.google.com/forms/d/e/1FAIpQLScdmsmHvkZoEM_qwlkJjlINJe-6xOxhHcx8ZvhMYjGcgJKa5g/viewform'}/>
                    
                    
                    <div className="menu-title" key="t-apps">Apps</div>
                     <NavMenuItem primaryText={false} title={'Calendars'} cssIcon={'bx-calendar'} link={'/dashboard/'}/>
                     <NavMenuItem primaryText={false} title={'Chat'} cssIcon={'bx-chat'} link={'/dashboard/'}/>
                     
                     <SubMenu label={<a href="" className="waves-effect">
                                    <i className="bx bx-envelope"></i>
                                    <span key="t-email">Email</span>
                                </a>}>
                                <NavMenuItem primaryText={false} title={'Inbox'} cssIcon={''} link={'/dashboard/'}/>
                                <NavMenuItem primaryText={false} title={'Read'} cssIcon={''} link={'/dashboard/'}/>
                    </SubMenu>
                    
                  </Menu> </div>

                </div></div></div></div><div className="simplebar-placeholder" ></div></div><div className="simplebar-track simplebar-horizontal" ><div className="simplebar-scrollbar" ></div></div><div className="simplebar-track simplebar-vertical" >
                    <div className="simplebar-scrollbar" ></div></div></div>
            </div>
            </Sidebar>

</div>
    </div>
  );
}

export default SidebarNav;
