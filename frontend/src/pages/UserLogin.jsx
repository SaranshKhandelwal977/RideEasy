import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { setUser } = useContext(UserDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        setError('') // Reset error state before making a request

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password })

            if (response.status === 200) {
                const data = response.data
                setUser(data.user)
                localStorage.setItem('token', data.token)
                navigate('/home')
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message) // Display error from backend
            } else {
                setError('Something went wrong. Please try again.')
            }
        }

        setEmail('')
        setPassword('')
    }

    return (
        <div className="p-7 h-screen flex flex-col w-full justify-between">
            <div>
                <h2 className="w-16 mb-5 text-2xl tracking-tighter font-bold">RideEasy</h2>
                <form onSubmit={submitHandler}>
                    <h3 className="text-lg font-medium mb-2">What's your Email</h3>
                    <input
                        type="email"
                        value={email}
                        required
                        placeholder="email@example.com"
                        className="bg-gray-700 mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className="text-lg font-medium mb-2">What's your Password</h3>
                    <input
                        type="password"
                        value={password}
                        required
                        placeholder="password"
                        className="bg-gray-700 mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                    <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg">
                        Login
                    </button>
                </form>
                <p className="text-center">
                    New here? <Link to="/signup" className="text-blue-600">Create new Account</Link>
                </p>
            </div>
            <div>
                <Link
                    to="/captain-login"
                    className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin
