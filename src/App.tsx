import React from 'react';
import PatientTable from './table';
import { RegisterPatient } from './registerPatient';
import RegisterBloodBank from './bloodBankRegistration';
import RegisterDonor from './registerDonor'
import LoginPage from './login';
import NavBar from './navbar/navBar';
import { Sidebar } from './sidebar/sidebar';
import Dashboard from './Dashboard'
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
      <Route path='/registerBloodBank' element={<RegisterBloodBank/>}/>
      <Route path='login' element={<LoginPage/>}/>
    </Routes>
     
      </main>
    </BrowserRouter>
 
  );
}

export default App;
