import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import PatientTable from "./table";
import { RegisterPatient } from "./registerPatient";
import RegisterBloodBank from "./bloodBankRegistration";
import RegisterDonor from "./registerDonor";
import { UserContext } from "./App";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const login = useContext(UserContext);
  useEffect(() => {
    // if (login?.isUserLoggedIn === false) {
    //   navigate("/login");
    // }
  }, []);

  return (
    <Routes>
      <Route path="/patientlist" element={<PatientTable />} />
      <Route path="/registerpatient" element={<RegisterPatient />} />
      <Route path="/registerdonor" element={<RegisterDonor />} />
      <Route path="/registerBloodBank" element={<RegisterBloodBank />} />
    </Routes>
  );
};

export default PrivateRoutes;
