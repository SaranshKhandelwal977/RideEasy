import React from 'react';

const rentalPackages = [
  { duration: 1, fare: 200 },
  { duration: 2, fare: 350 },
  { duration: 4, fare: 600 },
  { duration: 6, fare: 850 },
  { duration: 8, fare: 1100 },
];

const RentalVehiclePanel = ({
  selectedPackage,
  setSelectedPackage,
  setConfirmRidePanel,
  setVehiclePanel,
  setRentalDuration
}) => {
  const selectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setVehiclePanel(false);
    setConfirmRidePanel(true);
    setRentalDuration(pkg.duration);
  };

  return (
    <div className='text-white'>
      <h2 className='text-xl font-semibold mb-4'>Choose a Rental Package</h2>
      <div className='grid grid-cols-2 gap-4'>
        {rentalPackages.map((pkg, idx) => (
          <div
            key={idx}
            onClick={() => selectPackage(pkg)}
            className='bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600'
          >
            <h4 className='text-lg font-medium'>{pkg.duration} Hour(s)</h4>
            <p className='text-green-400 font-semibold'>₹{pkg.fare}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalVehiclePanel;
