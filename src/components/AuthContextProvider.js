import {createContext, useState} from 'react'

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){
    const[isAuth, toggleIsAuth] = useState(true);
    const[name, setName] = useState("driver");
    function login(){
        toggleIsAuth(true);
    }

    function logout(){
        toggleIsAuth(false);
    }
    const data = {
        loggedIn: isAuth,
        login,
        logout,
        name,
        setName
    }
    return(
        <AuthContext.Provider
            value={data}>
            {children}
        </AuthContext.Provider>
    )
}