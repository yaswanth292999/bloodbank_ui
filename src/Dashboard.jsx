import React from 'react'
import './App.css'

const Dashboard = () => {
  return (
    <section className='dashboard'>
        <header className='dashboard__header'>
            <h1>Dashboard</h1>
        </header>
        <article className='card__container'>
        <div className='patient__card card'>
            <div>
            <h1 className='card__header'>8</h1>
            <p className='card__count'>Patients Registered</p>
            </div>
            </div>
              
        <div className='donor__card card'>
            <div>
        <div>11</div>
        <p>Donors Registered</p>
        </div>

            </div>

            <div className='bloodbank__card card'>
            <div>
        <div>11</div>
        <p>Blood Banks</p>
        </div>

            </div>



        </article>
       
        </section>
  )
}

export default Dashboard