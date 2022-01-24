import {createContext, useEffect, useState} from 'react'
import axios from "axios";
import jwtDecode from "jwt-decode";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){
    const history = useHistory();
    const accounts = {
        planner: {"id":4001,"role":"planner","firstName":"piet","lastName":"pieterson","street":"steenstraat","houseNumber":"33","postalCode":"8909ie","city":"arnhem","phoneNumber":"0689493832","routes":[{"id":5003},{"id":5001},{"id":5002}],"password":"$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K","enabled":true,"username":"plannerusername"},
        driver: {"role":"driver","id":2001,"username":"driverusername","route":[{"id":5001},{"id":5002}],"firstName":"Mark","lastName":"Rensen","street":"Doesburgseweg","houseNumber":"26","city":"Wehl","employeeNumber":1000001,"driverLicenseNumber":"xxx111xxx","postalcode":"7031jd","phoneNumber":"0612334566","regularTruck":"97bph8","password":"$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K","enabled":true},
        customer: {"id":1001,"username":"customerusername","role":"customer","myOrders":[{"id":3001},{"id":3003},{"id":3002}],"name":"jansen","street":"kalverstraat","houseNumber":"22","postalCode":"1001ab","city":"Amsterdam","phoneNumber":"010-894839","password":"$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K","enabled":true}
    }
    const[isAuth, toggleIsAuth] = useState(false);
    const[data, setData] = useState({});
    const[status, setStatus] = useState("pending");

    useEffect(()=>{
        const token = localStorage.getItem("logitoken");
        if(token){
            const decoded = jwtDecode(token);
            getUser(decoded.sub);
        } else {
            setStatus("done");
            toggleIsAuth(false);
            setData({})
        }
    }, [])

    async function getUser(sub){
        try{
            console.log(localStorage.getItem("logitoken"))
            const result = await axios({
                method : "get",
                url : `http://localhost:8080/user/${sub}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            setData(result.data);
            setStatus("done");
            toggleIsAuth(true);
            history.push(`/${result.data.role}/home`)
            if(isAuth){
                console.log("succes " + data.role)
                console.log(`/${data.role}/home`)
                history.push(`/${data.role}/home`)
            } else {
                console.log("not succes")
            }

        } catch(e){
            console.error(e.message);
            setData({});
            toggleIsAuth(false);
            setStatus("done");
        }

    }

    async function login(loginDetails){
        toggleIsAuth(true);
        setData(loginDetails);
            try{
                const result = await axios({
                    method: "post",
                    url:"http://localhost:8080/authenticate",
                    data:{username: loginDetails.username,
                    password: loginDetails.password}
                })
                const token = result.data.jwt;
                localStorage.setItem("logitoken", token)
                console.log(result.data.jwt)
                const decodedJWT = jwtDecode(token);
                console.log(decodedJWT)
                toggleIsAuth(true);


                await getUser(decodedJWT.sub);

                console.log(data)

            } catch(e){
                console.error(e.message);
                setData({});
                toggleIsAuth(false);
                setStatus("done");
            }

    }

    function logout(){
        toggleIsAuth(false);
        setData({});
        setStatus("done");
        localStorage.removeItem("logitoken");
        history.push("/")
    }
    const id = data.id;
    const value = {
        loggedIn: isAuth,
        login,
        logout,
        data,
        id
    }
    return(
        <AuthContext.Provider
            value={value}>
            {status === "done" ?
                children
                :
                <p>loading...</p>
            }
        </AuthContext.Provider>
    )
}