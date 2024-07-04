import React from "react";
import { Link, Outlet, redirect, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useEffect } from "react";

const EmpDashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
      let cookies = document.cookie
      if(cookies.length=='0'){
        navigate('/start')
      }
  }, [navigate]);
    axios.defaults.withCredentials = true
    const handleLogout = () => {
        axios.get('http://localhost:8000/emp/logout')
        .then(result =>{
            if(result.data.Status) {
                navigate('/start')
                window.location.reload()
            }
        })
    }
    return (
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link
                  to="/employee_dashboard"
                  className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                >
                  <span className="fs-5 fw-bolder d-none d-sm-inline compName"> 
                    Bac Giang Railway Company
                  </span>
                </Link>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="w-100">
                    <Link
                      to="/employee_dashboard/specSal/2"
                      className="nav-link text-white px-0 align-middle"
                    >
                      <i className="fs-4 bi-speedometer2 ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Salary</span>
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link
                      to="/employee_dashboard/viewShift"
                      className="nav-link px-0 align-middle text-white"
                    >
                      <i className="fs-4 bi-person ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Shift</span>
                    </Link>
                  </li>
                  <li className="w-100">
                    <Link
                      to="/employee_dashboard/registeredShift/1"
                      className="nav-link px-0 align-middle text-white"
                    >
                      <i className="fs-4 bi-person ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Registered Shift</span>
                    </Link>
                  </li>
                  <li className="w-100" onClick={handleLogout}>
                  <Link
                      className="nav-link px-0 align-middle text-white"
                    >
                      <i className="fs-4 bi-power ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col p-0 m-0">
                <div className="p-2 d-flex justify-content-center shadow">
                    <h1>Employee Management System</h1>
                </div>
                <Outlet />
            </div>
          </div>
        </div>
    );
  };
    export default EmpDashboard;