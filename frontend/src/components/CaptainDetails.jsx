import React, {useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
    const {captain} = useContext(CaptainDataContext);

  return (
    <div>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-5 justify-start'>
                <div className='h-10 w-10 rounded-full object-cover border-1 bg-amber-400' ></div>
                <h4 className='text-lg font-medium -ml-3'>{`${captain.fullname.firstname} ${captain.fullname.lastname}`}</h4>
            </div>
            <div>
                <h4 className='text-xl font-semibold'>Rs. 280</h4>
                <p className='text-sm font-medium text-gray-400'>Earned</p>
            </div>
        </div>
        <div className='flex p-3 bg-gray-600 rounded-xl justify-between gap-5 items-start mt-12'>
            <div className='text-center'>
                <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-400'>Hours Online</p>
            </div>
            <div className='text-center'>
                <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-400'>Hours Online</p>
            </div>
            <div className='text-center'>
                <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-400'>Hours Online</p>
            </div>
        </div>
    </div>
  )
}

export default CaptainDetails