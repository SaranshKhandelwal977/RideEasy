import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const CaptainLogin = () => {

    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');
    const [captainData, setCaptainData] =  useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({email: email, password: password});
        console.log(captainData);
        setEmail('');
        setPassword('');
    }

  return (
    <div className='p-7 7 h-screen flex flex-col justify-between'>
        <div>
            <h2 className='w-16 mb-5 text-2xl tracking-tighter font-bold'>RideEasy</h2>
            <form onSubmit={(e) => submitHandler(e)}>
                <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    required 
                    placeholder='email@example.com' 
                    className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h3 className='text-lg font-medium mb-2'>What's your Password</h3>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    required 
                    placeholder='password'
                    className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base' >Login</button>
            </form>
            <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
        </div>
        <div>
            <Link
            to='/login'
            className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin