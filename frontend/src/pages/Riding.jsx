import React from 'react'
import carImage from "../assets/carr.png";
import { useNavigate } from 'react-router-dom';

const Riding = () => {
    const navigate = useNavigate();
  return (
    <div className='h-screen'>
        <div onClick={() => {navigate('/home')}} className='fixed cursor-pointer bg-white h-10 w-10 flex items-center justify-center rounded-full shadow-md mt-4 ml-3'>
            <i className="text-lg text-black font-bold ri-home-5-line"></i>
        </div>
        <div className='h-1/2'>
            <img className='w-full h-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'/>
        </div>
        <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
                <img className='h-12' src={carImage}/>
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Saransh</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>DL11CC9263</h4>
                    <p className='text-sm text-gray-400'>Maruti Suzuki WagonR</p>
                </div>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'> 
                <div className='w-full mt-5'>
                    
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11A</h3>
                            <p className='text-sm -mt-1 text-gray-500'>Address line 2</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Rs. 193.20</h3>
                            <p className='text-sm -mt-1 text-gray-500'>Currency option</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding