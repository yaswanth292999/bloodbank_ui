import React from 'react';
import PatientTable from './table';
import { RegisterPatient } from './registerPatient';
import RegisterDonor from './registerDonor'

function App() {
  return (
    <>
      <PatientTable/>
      <RegisterPatient/>
      <RegisterDonor/>
    </>
 
  );
}

export default App;
