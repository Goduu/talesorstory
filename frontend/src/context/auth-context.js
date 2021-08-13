
import React, { useContext, useState } from 'react'

const AuthContext = React.createContext()

function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [tokenExpiration, setTokenExpiration] = useState(null)
    const login = (token, userId, tokenExpiration) => {
        setToken(token)
        setUserId(userId)
        setTokenExpiration(tokenExpiration)
    }
    const logout = () => { 
        setToken(null)
        setUserId(null)
        setTokenExpiration(null)
    }

    const states = {
        token,
        userId,
        tokenExpiration,
        login,
        logout,
    }
    return <AuthContext.Provider value={states}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}

export { AuthProvider }