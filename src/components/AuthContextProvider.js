import {createContext, useState} from 'react'

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){
    const[isAuth, toggleIsAuth] = useState(false);
    const[name, setName] = useState();
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