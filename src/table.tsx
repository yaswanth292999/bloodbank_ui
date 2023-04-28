import React, { useEffect, useState } from "react";
import "./App.css";
import Swal from "sweetalert2";

type patientInfo = {
  name: string;
  blood_group: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  disease: string;
  donor_id: string | null;
  required_units: number;
  id: string;
  blood_bank: string | null;
  donor_name: string | null;
};

type donorInfo = {
  name: string;
  id: string;
};
type bloodBank = {
  name: string;
};

type bloodBankSelectProps = {
  blood_banks: bloodBank[] | undefined;
  setSelectedBloodBank: React.Dispatch<React.SetStateAction<string | null>>;
};

type PatientProps = {
  patient: patientInfo;
  bloodbanks: bloodBank[] | undefined;
};

const PatientTable = () => {
  const [patientData, setPatientData] = useState<patientInfo[] | undefined>();
  const [bloodbanks, setBloodBank] = useState<bloodBank[] | undefined>();

  async function getAllPatients() {
    const result = await fetch(
      "http://localhost:3000/v1/patient/getAllPatients"
    );
    const resultJSON: patientInfo[] = await result.json();
    setPatientData(resultJSON);
  }

  async function getALLBloodBanks() {
    const result = await fetch(
      "http://localhost:3000/v1/blood_bank/getAllBloodBanks"
    );
    const resultJSON: bloodBank[] = await result.json();
    setBloodBank(resultJSON);
  }

  useEffect(() => {
    getAllPatients();
    getALLBloodBanks();
  }, []);
  return (
    <section className="patientTable">
      <header>
        <h1>Patient List</h1>
      </header>
      {patientData && (
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th> Blood Group</th>
              <th>Disease</th>
              <th>Required Units</th>
              <th>Registered Blood Bank</th>
              <th>Registered Donor</th>
              <th>Register</th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient) => {
              return (
                <Patient
                  key={patient.id}
                  patient={patient}
                  bloodbanks={bloodbanks}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

function Patient({ patient, bloodbanks }: PatientProps) {
  const [patientData, setPatientData] = useState<patientInfo>();

  useEffect(() => {
    setPatientData(patient);
  }, [patient]);
  const [donors, setDonors] = useState<donorInfo[] | null>(null);
  const [selectedBloodBank, setSelectedBloodBank] = useState<string | null>(
    null
  );
  const [selectedDonor, setSelectedDonor] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedBloodBank) return;

    getDonorForBloodGroup(selectedBloodBank);
  }, [selectedBloodBank]);

  async function getDonorForBloodGroup(selectedBloodBank: string) {
    if (selectedBloodBank === null) return;

    const result = await fetch(
      "http://localhost:3000/v1/donor/getDonorForBloodGroup?" +
        new URLSearchParams({
          bloodbank: selectedBloodBank,
          blood_group: encodeURI(patient.blood_group),
          required_units: String(patient.required_units),
        })
    );
    const resultJSON: donorInfo[] = await result.json();
    setDonors(resultJSON);
  }

  async function registerPatient(
    donor_id: string | null,
    patient_id: string,
    required_units: number,
    blood_bank: string | null
  ) {
    if (!donor_id && blood_bank && patientData) return;

    const response = await fetch(
      "http://localhost:3000/v1/patient/registerDonorForPatient",
      {
        method: "POST",
        body: JSON.stringify({
          donor_id,
          patient_id,
          required_units,
          blood_bank,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (response.ok) {
      setPatientData((oldPatientData) => {
        if (!oldPatientData) return;
        return {
          ...oldPatientData,
          blood_bank,
          donor_id,
          donor_name: selectedDonor,
        };
      });
      Swal.fire({
        title: "Registration Succesful",
        // text: 'Do you want to continue',
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Registration failed",
        // text: 'Do you want to continue',
        icon: "error",
        confirmButtonText: "Try Again!",
      });
    }
  }

  return patientData ? (
    <tr>
      <td>{patientData.name}</td>
      <td>{patientData.blood_group}</td>
      <td>{patientData.disease}</td>
      <td>{patientData.required_units}</td>
      <td>
        {patientData.blood_bank ?? (
          <BloodbankSelect
            blood_banks={bloodbanks}
            setSelectedBloodBank={setSelectedBloodBank}
          />
        )}
      </td>
      <td>
        {patientData.donor_name ?? (
          <select onChange={(e) => setSelectedDonor(e.target.value)}>
            <option>Choose donor</option>
            {donors &&
              donors.map((donor) => {
                return (
                  <option key={donor.id} value={donor.id}>
                    {donor.name}
                  </option>
                );
              })}
          </select>
        )}
      </td>
      <td>
        {patientData.donor_id ? (
          <span style={{ color: "green", fontWeight: "bold" }}>Registered</span>
        ) : (
          <button
            disabled={selectedBloodBank && selectedDonor ? false : true}
            onClick={() =>
              registerPatient(
                selectedDonor,
                patientData.id,
                patientData.required_units,
                selectedBloodBank
              )
            }
          >
            Register
          </button>
        )}
      </td>
    </tr>
  ) : null;
}

function BloodbankSelect({
  blood_banks,
  setSelectedBloodBank,
}: bloodBankSelectProps) {
  return (
    <select
      onChange={(e) => {
        if (e.target.value === "choose an option") setSelectedBloodBank(null);
        else setSelectedBloodBank(e.target.value);
      }}
    >
      <option selected={true} value="choose an option">
        Choose a Blood Bank
      </option>
      {blood_banks &&
        blood_banks.map((bloodbank) => {
          return (
            <option key={bloodbank.name} value={bloodbank.name}>
              {bloodbank.name}
            </option>
          );
        })}
    </select>
  );
}

export default PatientTable;
