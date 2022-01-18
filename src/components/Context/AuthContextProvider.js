import {createContext, useState} from 'react'

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){
    const accounts = {
        planner: {"id":4001,"role":"planner","firstName":"piet","lastName":"pieterson","street":"steenstraat","houseNumber":"33","postalCode":"8909ie","city":"arnhem","phoneNumber":"0689493832","routes":[{"id":5003},{"id":5001},{"id":5002}],"password":"$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K","enabled":true,"username":"plannerusername"},
        driver: {"role":"driver","id":2001,"username":"driverusername","route":[{"id":5001},{"id":5002}],"firstName":"Mark","lastName":"Rensen","street":"Doesburgseweg","houseNumber":"26","city":"Wehl","employeeNumber":1000001,"driverLicenseNumber":"xxx111xxx","postalcode":"7031jd","phoneNumber":"0612334566","regularTruck":"97bph8","password":"$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K","enabled":true},
        customer: {"id":1001,"username":"customerusername","role":"customer","myOrders":[{"id":3001},{"id":3003},{"id":3002}],"name":"jansen","street":"kalverstraat","houseNumber":"22","postalCode":"1001ab","city":"Amsterdam","phoneNumber":"010-894839","password":"$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K","enabled":true}
    }
    const[isAuth, toggleIsAuth] = useState(true);
    const[data, setData] = useState(accounts.customer);
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