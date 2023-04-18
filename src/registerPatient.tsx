import React,{useRef} from 'react'


export const RegisterPatient = () => {

const formRef=useRef<HTMLFormElement>(null)

async function registerPatient(e:React.FormEvent<HTMLFormElement>){
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

        const response = await fetch('http://localhost:3000/v1/patient/createPatient', {
        method: 'POST',
        body: JSON.stringify(formObj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    if(response.ok) alert("Patient Registered Successfully")
    else alert("Patient Registration failed")
}

  return (
    <form ref={formRef} onSubmit={registerPatient}>
        <label htmlFor='name'>Name</label>
        <input type="text"  name="name" id='name'/>
        <label htmlFor='disease'>Disease</label>
        <input type="text" id='disease' name="disease"/>
        <label htmlFor='disease'>Required Units of Blood</label>
        <input type='number' min='0' max='10' name="required_units"/>
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
        <button type='submit'>Register Patient</button>
    </form>
  )
}
