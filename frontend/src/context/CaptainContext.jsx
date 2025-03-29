import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext();

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [Error, setError] = useState(false)

    const updateCaptain = (captainData) => {
        setCaptain(captainData)
    }

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        Error,
        setError,
        updateCaptain
    }

  return (
    <div>
        <CaptainDataContext.Provider value={value}>
            {children}

        </CaptainDataContext.Provider>
    </div>
  )
}


export default CaptainContext