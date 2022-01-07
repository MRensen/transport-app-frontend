import {createContext, useState} from 'react'

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){
    const[isAuth, toggleIsAuth] = useState(true);
    const[data, setData] = useState({"id":2002,"username":"driverusername","route":null,"firstName":"Mark","lastName":"Rensen","street":"Doesburgseweg","houseNumber":"26","city":"Wehl","employeeNumber":1000000,"driverLicenseNumber":"xxx111xxx","phoneNumber":"0612334566","regularTruck":"97bph8","password":"password","enabled":true});
    function login(){
        toggleIsAuth(true);
    }

    function logout(){
        toggleIsAuth(false);
    }
    const value = {
        loggedIn: isAuth,
        login,
        logout,
        data,
        setData
    }
    return(
        <AuthContext.Provider
            value={value}>
            {children}
        </AuthContext.Provider>
    )
}