import React from 'react'
import carImage from "../assets/carr.png";
import bikeImage from "../assets/bike.png";
import autoImage from "../assets/auto.png";

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setVehiclePanel(false)}}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>
        <div onClick={() => {
            props.setConfirmRidePanel(true)
        }} className='flex w-full p-3 border-2 border-gray-50 active:border-black rounded-xl items-center justify-between mb-2'>
            <img className='h-12' src={carImage}/>
            <div className='ml-2 w-1/2'>
                <h4 className='font-medium text-base'>Cab <span><i className='ri-user-3-fill'></i>4</span></h4>
                <h5>2 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
            </div>
            <h2 className='text-lg font-semibold'>Rs. 193.20</h2>
        </div>
        <div onClick={() => {
            props.setConfirmRidePanel(true)
        }} className='flex w-full p-3 border-2 border-gray-50 active:border-black rounded-xl items-center justify-between mb-2'>
            <img className='h-12' src={bikeImage}/>
            <div className='ml-2 w-1/2'>
                <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
                <h5>2 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
            </div>
            <h2 className='text-lg font-semibold'>Rs. 93.20</h2>
        </div>
        <div onClick={() => {
            props.setConfirmRidePanel(true)
        }} className='flex w-full p-3 border-2 border-gray-50 active:border-black rounded-xl items-center justify-between mb-2'>
            <img className='h-12' src={autoImage}/>
            <div className='ml-2 w-1/2'>
                <h4 className='font-medium text-base'>Auto <span><i className='ri-user-3-fill'></i>3</span></h4>
                <h5>2 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable auto rides</p>
            </div>
            <h2 className='text-lg font-semibold'>Rs. 153.20</h2>
        </div>
            
    </div>
  )
}

export default VehiclePanel