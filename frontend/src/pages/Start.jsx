import React from 'react'
import bgImage from '../assets/home-bg.jpg'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen pt-8 flex justify-between flex-col bg-cover bg-center bg-no-repeat w-screen' style={{ backgroundImage: `url(${bgImage})` }}>
        <h2 className='w-16 ml-8 text-2xl tracking-tighter font-bold text-black'>RideEasy</h2>
        <div className='bg-white p-5 pb-7'>

          <h2 className='text-2xl font-bold mb-5'>Get Started with RideEasy</h2>

          {/* WhatsApp Booking Button */}
          <a
            href="https://docs.google.com/document/d/1Oi0brOzL7cZlERKAfp_Uts-JRtSBikeLZE9OT19Gufw/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className='flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded mb-3 font-semibold'
          >
            Book via WhatsApp 📱
          </a>

          {/* Continue Button */}
          <Link
            to='/login'
            className='flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white py-3 rounded font-semibold'
          >
            Continue
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Start
