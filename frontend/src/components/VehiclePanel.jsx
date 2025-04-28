import React from 'react';
import carImage from "../assets/carr.png";
import bikeImage from "../assets/bike.png";
import autoImage from "../assets/auto.png";

const VehiclePanel = (props) => {
    const handleIsEVToggle = (e) => {
        props.setIsEV(e.target.checked);
        props.fetchFare(props.pickup, props.destination, e.target.checked);
    };

    return (
        <div className='px-2'>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => props.setVehiclePanel(false)}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>

            {/* EV mode toggle */}
            <div className="flex items-center justify-between mb-5 px-2">
                <label htmlFor="ev-switch" className="text-white text-sm font-medium">EV Mode</label>
                <input
                    id="ev-switch"
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={props.isEV}
                    onChange={handleIsEVToggle}
                />
            </div>

            {/* Vehicles */}
            <div className='flex flex-col gap-2'>
                {/* Car */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('car');
                }} className='flex w-full p-3 border-2 bg-zinc-800 border-gray-50 active:border-black rounded-xl items-center justify-between mb-2'>
                    <img className='h-12' src={carImage} />
                    <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-base'>Cab <span><i className='ri-user-3-fill'></i>4</span></h4>
                        <h5>2 mins away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹{props.fare?.car}</h2>
                </div>

                {/* Motorcycle */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('motorcycle');
                }} className='flex w-full p-3 border-2 bg-zinc-800 border-gray-50 active:border-black rounded-xl items-center justify-between mb-2'>
                    <img className='h-12' src={bikeImage} />
                    <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
                        <h5>2 mins away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹{props.fare?.motorcycle}</h2>
                </div>

                {/* Auto */}
                <div onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.selectVehicle('auto');
                }} className='flex w-full p-3 border-2 bg-zinc-800 border-gray-50 active:border-black rounded-xl items-center justify-between mb-2'>
                    <img className='h-12' src={autoImage} />
                    <div className='ml-2 w-1/2'>
                        <h4 className='font-medium text-base'>Auto <span><i className='ri-user-3-fill'></i>3</span></h4>
                        <h5>2 mins away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable auto rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹{props.fare?.auto}</h2>
                </div>

            </div>

        </div>
    );
};

export default VehiclePanel;
