import React,{useRef,useEffect} from 'react'
import './registerPatient.css'
import Swal from 'sweetalert2'



const RegisterBloodBank = () => {
    
    const formRef=useRef<HTMLFormElement>(null)


    async function registerBloodBank(e:React.FormEvent<HTMLFormElement>){
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
    
            const response = await fetch('http://localhost:3000/v1/blood_bank/createBloodBank', {
            method: 'POST',
            body: JSON.stringify(formObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        if(response.ok){
            Swal.fire({
                title: 'Blood Bank Registration Success',
                // text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'OK'
              })
        }
        else{
            Swal.fire({
                title: 'Blood Bank Registration Failed',
                // text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Try Again!'
              })
        }
    }
    
  return (
    // (name, blood_group,medical_report,address,contact_number,blood_bank,available_units)
    <section className='registerForm'>
         <header>
            <h1>Register Blood Bank</h1>
        </header>
    <form ref={formRef}
     onSubmit={registerBloodBank}
     >

        <label htmlFor='name'>Name</label>
        <input type="text"  name="name" id='name' placeholder='Enter Blood Bank Name'/>
    
       
        <label htmlFor='contact' >Phone Number</label>
        <input type="tel"  name="contact_number" id='contact' placeholder='Enter Contact No'/>
        <label htmlFor='address'>Address</label>
        <input type="text"  name="address" id='address' placeholder='Enter the address of blood bank'/>
        
        <button type='submit'>Register Blood Bank</button>
    </form>
    </section>
  )
}

export default RegisterBloodBank