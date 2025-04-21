import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    console.log(captain);

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5 justify-start'>
                    <div className='h-10 w-10 rounded-full object-cover border-1 bg-amber-400'></div>
                    <h4 className='text-lg font-medium -ml-3'>
                        {`${captain?.fullname?.firstname} ${captain?.fullname?.lastname}`}
                    </h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>
                        Rs. {captain?.totalFare || 0}
                    </h4>
                    <p className='text-sm font-medium text-gray-400'>Earned</p>
                </div>
            </div>

            <div className='flex p-3 bg-gray-600 rounded-xl justify-between gap-5 items-start mt-12 flex-wrap'>
                <div className='text-center'>
                    <i className='text-3xl mb-2 font-thin ri-book-open-line'></i>
                    <h5 className='text-lg font-medium'>
                        {captain?.noOfRides || 0}
                    </h5>
                    <p className='text-sm text-gray-400'>Rides Taken</p>
                </div>

                <div className='text-center'>
                    <i className='text-3xl mb-2 font-thin ri-shield-user-line'></i>
                    <h5 className={`text-lg font-medium ${captain?.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        {captain?.status || 'Inactive'}
                    </h5>
                    <p className='text-sm text-gray-400'>Status</p>
                </div>

                <div className='text-center'>
                    <i className='text-3xl mb-2 font-thin ri-star-line'></i>
                    <h5 className='text-lg font-medium'>
                        {captain?.rating ? captain.rating.toFixed(1) : 'N/A'} ⭐
                    </h5>
                    <p className='text-sm text-gray-400'>Rating</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;