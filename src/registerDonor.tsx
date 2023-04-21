import React,{useRef, useState,useEffect} from 'react'
import './registerPatient.css'

type bloodBank={
    name:string
}


const RegisterDonor = () => {


    const [bloodbanks,setBloodBank]=useState<bloodBank[]|undefined>()

    async function getALLBloodBanks(){
        const result=await fetch('http://localhost:3000/v1/blood_bank/getAllBloodBanks')
        const resultJSON:bloodBank[]=await result.json()
        setBloodBank(resultJSON)
        
    }

    useEffect(()=>{
        getALLBloodBanks()
        
    },[ ])


    
    const formRef=useRef<HTMLFormElement>(null)


    async function registerDonor(e:React.FormEvent<HTMLFormElement>){
        let formObj:any={}  // improve type
        e.preventDefault();
        console.log(formRef.current)
        if(formRef.current===null) return
        console.log(formRef.current)
            const formData=new FormData(formRef.current)
            const values = [...formData.entries()];
       
            values.forEach(([name,value])=>{
                
                formObj[name]=value
            })
    
            console.log(formObj)
    
            const response = await fetch('http://localhost:3000/v1/donor/createDonor', {
            method: 'POST',
            body: JSON.stringify(formObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        if(response.ok) alert("Donor Registered Successfully")
        else alert("Donor Registration failed")
    }
    
  return (
    // (name, blood_group,medical_report,address,contact_number,blood_bank,available_units)
    <section className='registerForm'>
         <header>
            <h1>Register Donor</h1>
        </header>
    <form ref={formRef} onSubmit={registerDonor}>

        <label htmlFor='name'>Name</label>
        <input type="text"  name="name" id='name' placeholder='Enter Donor Name'/>
        <label htmlFor='blood-group'>Blood Group</label>
        <select name="blood_group">
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
        </select>
       
        <label htmlFor='medical_report' >Medical Report</label>
        <textarea id='medical_report' name="medical_report"/>
        <label htmlFor='available_units'>No of Units to Donate</label>
        <input type='number' id="available_units" min='0' max='100' name="available_units" placeholder='Enter no of units you are willing to donate'/>
        <label htmlFor='contact' >Phone Number</label>
        <input type="tel"  name="contact_number" id='contact' placeholder='Enter Contact No'/>
        <label htmlFor='address'>Address</label>
        <input type="text"  name="address" id='address' placeholder='Enter present address of donor'/>
        <select name="blood_bank">
    <option selected={true} value="choose an option">Choose a Blood Bank</option>
   {bloodbanks&&bloodbanks.map((bloodbank)=>{
    return <option key={bloodbank.name} value={bloodbank.name}>{bloodbank.name}</option>
   })

   }
   </select>
        
        <button type='submit'>Register Donor</button>
    </form>
    </section>
  )
}

export default RegisterDonor