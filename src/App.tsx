import React from 'react';
import PatientTable from './table';
import { RegisterPatient } from './registerPatient';
import RegisterDonor from './registerDonor'
import NavBar from './navbar/navBar';
import { Sidebar } from './sidebar/sidebar';
import Dashboard from './Dashboard.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <main className='bloodBank'>
    <Sidebar/>
    <Routes>
    <Route path='/' element={<Dashboard/>}/>
      <Route path='/patientlist' element={<PatientTable/>}/>
      <Route path='/registerpatient' element={<RegisterPatient/>}/>
      <Route path='/registerdonor' element={<RegisterDonor/>}/>
      
      
   
      {/* <RegisterPatient/> */}
      {/* <RegisterDonor/> */}
    </Routes>
     
      </main>
    </BrowserRouter>
 
  );
}

export default App;
