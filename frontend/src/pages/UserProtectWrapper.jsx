import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserProtectWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const {user, setUser} = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            if(response.status === 200){
                const data = response.data;
                setUser(data.user);
                setIsLoading(false);
            }
        }).catch((error) => {
            console.log(error);
            localStorage.removeItem('token');
            setIsLoading(false);
        })
    }, [token])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper