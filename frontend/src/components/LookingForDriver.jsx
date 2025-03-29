import React from 'react'
import carImage from "../assets/carr.png";

const LookingForDriver = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setVehicleFound(false)}}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>
        <div className='flex gap-2 justify-between flex-col items-center'> 
            <img className='h-20' src={carImage}/>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg  ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Address line 2</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
                    <i className="text-lg ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Address line 2</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <i className="text-lg ri-currency-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Rs. 193.20</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Currency option</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LookingForDriver