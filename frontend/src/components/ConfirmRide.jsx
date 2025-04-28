import React from 'react';
import carImage from "../assets/carr.png";
import bikeImage from "../assets/bike.png";
import autoImage from "../assets/auto.png";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setConfirmRidePanel(false)}}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-3'>Confirm your Ride</h3>
      
      {props.isEV && !props.isRental && (  // ✅ Only show EV mode for normal rides
        <p className="text-green-400 font-medium text-sm mt-1 mb-3">EV Mode Applied</p>
      )}

      {/* ✅ Only show route dropdown if NOT rental */}
      {!props.isRental && props.routes?.length > 1 && (
        <div className="mb-4">
          <label className="text-gray-300 text-sm mb-1 block">Select Route:</label>
          <select
            value={props.selectedRouteIndex}
            onChange={(e) => props.setSelectedRouteIndex(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          >
            {props.routes.map((route, idx) => (
              <option key={idx} value={idx}>
                {route.summary || 'Route'} - {Math.round(route.distance)} km, {Math.round(route.duration)} mins
              </option>
            ))}
          </select>
        </div>
      )}

      <div className='flex gap-2 justify-between flex-col items-center'> 
        <img className='h-20' src={ 
          props.vehicleType === 'car' ? carImage : 
          props.vehicleType === 'motorcycle' ? bikeImage : 
          autoImage
        } />
        
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-md font-normal'>{props.pickup}</h3>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400'>
            <i className="text-md ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-md font-normal'>
                {props.isRental ? `Rental for ${props.rentalDuration} hour(s)` : props.destination}
              </h3>
            </div>
          </div>

          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-currency-line"></i>
            <div>
                <h3 className='text-md font-normal'>
                    ₹{props.routes && props.routes.length > 0 
                        ? props.routes[props.selectedRouteIndex]?.fare?.[props.vehicleType] 
                        : props.fare?.[props.vehicleType]
                    }
                </h3>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.isRental 
              ? props.createRide() 
              : props.createRide(props.routes[props.selectedRouteIndex]); 
          }}
          className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ConfirmRide;
