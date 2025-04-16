import { createContext, useEffect, useState } from 'react'

export const CaptainDataContext = createContext();

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(() => {
        const storedCaptain = localStorage.getItem('captain');
        return storedCaptain ? JSON.parse(storedCaptain) : null;
    });

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateCaptain = (captainData) => {
        setCaptain(captainData)
    }

    useEffect(() => {
        const storedCaptain = localStorage.getItem('captain');
        if (storedCaptain && !captain) {
          setCaptain(JSON.parse(storedCaptain));
        }
    }, []);

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

  return (
    <CaptainDataContext.Provider value={value}>
        {children}
    </CaptainDataContext.Provider>
  )
}


export default CaptainContext