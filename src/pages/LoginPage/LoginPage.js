import "./LoginPage.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import svgLogo from "../../resources/logistiekapplogo.svg"
import pngLogo from "../../resources/logistiekapplogo.png"
import Header from "../../components/Header/Header";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../components/AuthContextProvider";

export default function LoginPage() {
    // const [data, setData] = useState();
    // useEffect(() => {
    //     async function getData(){
    //         try {
    //             const result = await axios.post(
    //                 "http://localhost:8080/authenticateuser",
    //
    //                 )
    //             setData(result);
    //             console.log(data);
    //         } catch (e) {
    //             console.log(e.getMessage)
    //         }
    //     }
    //     getData();
    // },[])
    const [passwordValue, setPasswordValue] = useState();
    const [nameValue, setNameValue] = useState();
    const history = useHistory();
    const {setName, login} = useContext(AuthContext);
    function applyLogin(){
        console.log("logging in")
        if(nameValue === "driver" && passwordValue === "password"){
            setName(nameValue);
            login();
            history.push("/driver/home")
        }
    }
    return (
        <div id="body">
            <Header ismenu={false}/>
            <main>
                <button type="button" className="title" onClick={applyLogin}>inloggen</button>
                <section>
                    <label htmlFor="name">Naam  </label>
                    <input id="name"
                           type="text"
                           value={nameValue}
                           onChange={(e) => {
                               setNameValue(e.target.value)
                           }}
                    />
                </section>
                <section>
                    <label htmlFor="password">Wachtwoord  </label>
                    <input id="password"
                           type="password"
                           value={passwordValue}
                           onChange={(e) => {
                               setPasswordValue(e.target.value)
                           }}
                    />
                </section>
            </main>
        </div>
    )
}