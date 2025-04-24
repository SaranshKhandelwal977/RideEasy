import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { user, setUser } = useContext(UserDataContext);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [phone, setPhone] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordMsg, setPasswordMsg] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFirstname(user.fullname.firstname);
            setLastname(user.fullname.lastname || '');
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [user]);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/update-profile`, {
                firstname,
                lastname,
                email,
                phone
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data.user);
            setMessage('Profile updated successfully');
        } catch (err) {
            setError('Error updating profile');
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/change-password`, {
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPasswordMsg('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            setPasswordMsg('Wrong current password');
        }
    };

    return (
        <div className='p-6 h-screen flex flex-col bg-gray-800 text-white'>
            <button
                onClick={() => navigate('/home')}
                className='mb-6 flex items-center gap-2 text-black text-sm bg-white font-bold px-4 py-2 rounded-lg'
            >
                <i className="ri-arrow-left-line text-lg"></i> Back to Home
            </button>
            <h2 className='text-2xl font-semibold mb-4'>Your Profile</h2>

            <form onSubmit={updateProfile} className='space-y-4 mb-8'>
                <input
                    type='text'
                    className='w-full p-2 rounded bg-gray-700 text-white'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder='First Name'
                />
                <input
                    type='text'
                    className='w-full p-2 rounded bg-gray-700 text-white'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder='Last Name'
                />
                <input
                    type='email'
                    className='w-full p-2 rounded bg-gray-700 text-white'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
                <input
                    type='text'
                    className='w-full p-2 rounded bg-gray-700 text-white'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='Email'
                />
                <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded'>Update Profile</button>
                {message && <p className='text-green-400'>{message}</p>}
                {error && <p className='text-red-400'>{error}</p>}
            </form>

            <h3 className='text-xl font-medium mb-2'>Change Password</h3>
            <form onSubmit={changePassword} className='space-y-4'>
                <input
                    type='password'
                    className='w-full p-2 rounded bg-gray-700 text-white'
                    placeholder='Current Password'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type='password'
                    className='w-full p-2 rounded bg-gray-700 text-white'
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type='submit' className='w-full bg-green-600 text-white p-2 rounded'>Change Password</button>
                {passwordMsg && <p className='text-yellow-400'>{passwordMsg}</p>}
            </form>
        </div>
    );
};

export default UserProfile;
