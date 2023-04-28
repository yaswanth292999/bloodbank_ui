import React, { useContext } from "react";
import { UserContext } from "../App";
import { NavLink } from "react-router-dom";

import "./sidebar.css";
export const Sidebar = () => {
  const login = useContext(UserContext);

  return (
    <aside className="sideBar">
      <ul>
        <li>
          {/* <i className="fa-solid fa-table-columns" style={{color: "#ffffff"}}></i> */}
          <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
            Dashboard
          </NavLink>
        </li>
        <li>
          {/* <i className="fa-solid fa-folder-medical" style={{color: "#ffffff"}}></i> */}

          <NavLink
            to="/patientlist"
            style={{ color: "white", textDecoration: "none" }}
          >
            Patient List
          </NavLink>
        </li>
        <li>
          {/* <i className="fa-solid fa-table-columns" style={{color: "#ffffff"}}></i> */}
          <NavLink
            to="/registerpatient"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register Patient
          </NavLink>
        </li>
        <li>
          {/* <i className="fa-solid fa-table-columns" style={{color: "#ffffff"}}></i> */}
          <NavLink
            to="registerdonor"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register Donor
          </NavLink>
        </li>
        <li>
          {/* <i className="fa-solid fa-table-columns" style={{color: "#ffffff"}}></i> */}
          <NavLink
            to="/registerBloodBank"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register Blood Bank
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={{ color: "white", textDecoration: "none" }}
          >
            About
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
