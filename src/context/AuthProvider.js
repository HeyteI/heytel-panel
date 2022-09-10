import { createContext, useState } from "react";

const AuthContext = createContext({});
export const ShiftContext = createContext({})
export const SocketsContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const ShiftProvider = ({ children }) => {
    const [shift, setShift] = useState({});
    
    return (
        <ShiftContext.Provider value={[ shift, setShift ]}>
            {children}
        </ShiftContext.Provider>
    )
}

export const SocketsProvider = ({ children }) => {
    const [socket, setSocket] = useState({});

    return (
        <SocketsContext.Provider value={[ socket, setSocket ]}>
            {children}
        </SocketsContext.Provider>
    )
}

export default AuthContext;