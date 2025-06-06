import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const {captain, setCaptain} = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response) => {
            if(response.status === 200){
                const data = response.data;
                setCaptain(data);
                setIsLoading(false);
            }
        }).catch((error) => {
            console.log(error);
            localStorage.removeItem('token');
            setIsLoading(false);
        })
    },[token])

    if(isLoading){
        return <div>Loading...</div>
    }

  return (
    <>{children}</>
  )
}

export default CaptainProtectWrapper