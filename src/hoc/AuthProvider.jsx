import { createContext, useState } from "react";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);

    const signIn = (token, role, cb) => {
        setToken(token);
        setIsAuth(true);
        setRole(role);
        localStorage.setItem('token', token);
        cb();
    }
    
    const signOut = (cb) => {
        setToken(null);
        setIsAuth(false);
        setRole(null);
        localStorage.removeItem('token');
        cb();
    }

    const value = {role, isAuth, token, signIn, signOut}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;