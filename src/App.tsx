import React, { createContext, useContext, useState } from "react";

import PatientTable from "./table";
import { RegisterPatient } from "./registerPatient";
import RegisterBloodBank from "./bloodBankRegistration";
import RegisterDonor from "./registerDonor";
import LoginPage from "./login";
import NavBar from "./navbar/navBar";
import { Sidebar } from "./sidebar/sidebar";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import About from "./About";

type UserContextType = {
  isUserLoggedIn: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType | null>(null);

function App() {
  const [isUserLoggedIn, setLogin] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ isUserLoggedIn, setLogin }}>
        <NavBar />
        <main className="bloodBank">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/patientlist"
              element={
                isUserLoggedIn ? <PatientTable /> : <Navigate to={"/login"} />
              }
            />
            <Route
              path="/registerpatient"
              element={
                isUserLoggedIn ? (
                  <RegisterPatient />
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            />
            <Route
              path="/registerdonor"
              element={
                isUserLoggedIn ? <RegisterDonor /> : <Navigate to={"/login"} />
              }
            />
            <Route
              path="/registerBloodBank"
              element={
                isUserLoggedIn ? (
                  <RegisterBloodBank />
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="about" element={<About />} />
          </Routes>
        </main>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
