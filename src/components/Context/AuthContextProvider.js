import {createContext, useState} from 'react'

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){
    const[isAuth, toggleIsAuth] = useState(true);
    const[data, setData] = useState({"id":4001,"role":"planner", "username":"plannerusername","name":"bedrijfsnaam","firstName":"Mark","lastName":"Rensen","street":"Doesburgseweg","postalCode": "7031jc", "houseNumber":"26","city":"Wehl","employeeNumber":1000000,"phoneNumber":"0612334566","password":"password","enabled":true});
    function login(){
        toggleIsAuth(true);
    }

    function logout(){
        toggleIsAuth(false);
    }
    const id = data.id;
    const value = {
        loggedIn: isAuth,
        login,
        logout,
        data,
        setData,
        id
    }
    return(
        <AuthContext.Provider
            value={value}>
            {children}
        </AuthContext.Provider>
    )
}