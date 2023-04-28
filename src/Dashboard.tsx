import React,{useEffect,useState} from 'react'
import './App.css'

type dashboardStats={
    blood_banks:number
    patients:number
    donors:number
}



const Dashboard = () => {
    const[stats,setStats]=useState<dashboardStats>({
        blood_banks:0,
        patients:0,
        donors:0
    })

    async function getStats(){
        const result=await fetch('http://localhost:3000/v1/stats/getCount')
        const resultJSON:dashboardStats=await result.json()
        setStats(resultJSON)        
    }

    useEffect(()=>{

       getStats()

    },[])

  return (
    <section className='dashboard'>
        <header className='dashboard__header'>
            <h1>Dashboard</h1>
        </header>
        <article className='card__container'>
        <div className='patient__card card'>
            <div>
            <h1 className='card__header'>{stats.patients}</h1>
            <p className='card__count'>Patients Registered</p>
            </div>
            </div>
              
        <div className='donor__card card'>
            <div>
        <div>{stats.donors}</div>
        <p>Donors Registered</p>
        </div>

            </div>

            <div className='bloodbank__card card'>
            <div>
        <div>{stats.blood_banks}</div>
        <p>Blood Banks</p>
        </div>

            </div>



        </article>
       
        </section>
  )
}

export default Dashboard