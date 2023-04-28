import React,{useRef,useEffect} from 'react'
import './registerPatient.css'




const LoginPage = () => {
    
    const formRef=useRef<HTMLFormElement>(null)


    async function loginUser(e:React.FormEvent<HTMLFormElement>){
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
    
            const response = await fetch('http://localhost:3000/v1/login/loginUser', {
            method: 'POST',
            body: JSON.stringify(formObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        if(response.ok) alert("Login Succesful")
        else alert("Login Failed")
    }
    
  return (
  
    <section className='registerForm'>
         <header>
            <h1>Login</h1>
        </header>
    <form ref={formRef}
     onSubmit={loginUser}
     >

        <label htmlFor='username'>Username</label>
        <input type="text"  name="username" id='username' placeholder='Enter Username'/>
    
       
        <label htmlFor='password' >Password</label>
        <input type="password"  name="password" id='password' placeholder='Enter Password'/>
        
        <button type='submit'>Login</button>
    </form>
    </section>
  )
}

export default LoginPage