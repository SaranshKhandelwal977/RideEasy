import React from 'react'
import bgImage from '../assets/home-bg.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgImage})` }}>
            <h2 className='w-16 ml-8 text-2xl tracking-tighter font-bold'>RideEasy</h2>
            <div className='bg-white p-5 pb-7'>
                <h2 className='text-2xl font-bold'>Get Started with RideEasy</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-2 '>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home