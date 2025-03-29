import React from 'react'
import carImage from "../assets/carr.png";

const WaitForDriver = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setWaitingForDriver(false)}}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
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
                    <i className="text-lg  ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11A</h3>
                        <p className='text-sm -mt-1 text-gray-500'>Address line 2</p>
                    </div>
                </div>
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
    </div>
  )
}

export default WaitForDriver