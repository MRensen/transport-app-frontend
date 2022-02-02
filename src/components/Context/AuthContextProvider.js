import {createContext, useEffect, useState} from 'react'
import axios from "axios";
import jwtDecode from "jwt-decode";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({})

export default function AuthContextProvider({children}){
    const history = useHistory();
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

    async function getUserData() {
        try {
            const result = await axios({
                method: "get",
                url: `http://localhost:8080/user/${data.username}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            setData(result.data);
        } catch (e) {
            console.error(e.message)
        }
    }

    async function getUser(sub){
        try{
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
            console.log("auth-succes " + result.data.role)
            history.push(`/${result.data.role}/home`)
            return true;

        } catch(e){
            console.error(e.message);
            setData({});
            toggleIsAuth(false);
            setStatus("done");
            return false;
        }


    }

    async function login(loginDetails){
            try{
                const result = await axios({
                    method: "post",
                    url:"http://localhost:8080/authenticate",
                    data:{username: loginDetails.username,
                    password: loginDetails.password}
                })
                const token = result.data.jwt;
                localStorage.setItem("logitoken", token)
                const decodedJWT = jwtDecode(token);
                toggleIsAuth(true);

                console.log("auth wel login")
                return await getUser(decodedJWT.sub);


            } catch(e){
                console.error(e.message);
                setData({});
                toggleIsAuth(false);
                setStatus("done");
                return false
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
        refresh: getUserData,
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