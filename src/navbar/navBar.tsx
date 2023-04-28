import React, { useContext } from "react";
import "./navbar.css";
import { UserContext } from "../App";
import "../registerPatient.css";
import { log } from "console";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const NavBar = () => {
  const loginContext = useContext(UserContext);
  const navigate = useNavigate();
  function login() {
    navigate("/login");
  }
  function logOut() {
    loginContext?.setLogin(false);
    Swal.fire({
      title: "Logged Out Succesfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
    navigate("/login");
  }

  return (
    <nav className="navBar">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1297/1297136.png"
        width={"50px"}
        height={"50px"}
      />
      <h1>Blood bank donation System</h1>
      <div className="navBar__userLogin">
        {loginContext?.isUserLoggedIn === true ? (
          <button className="navBar__logout" onClick={logOut}>
            Logout
          </button>
        ) : (
          <button className="navBar__login" onClick={login}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
