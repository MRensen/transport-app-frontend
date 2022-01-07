import styles from "./LoginPage.module.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import HeaderPlain from "../../components/Header/Header";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../components/Context/AuthContextProvider";

export default function LoginPage() {

    const [passwordValue, setPasswordValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const history = useHistory();
    const {setData, data, login} = useContext(AuthContext);

    async function getData() {
        try {
            const result = await axios.get(`http://localhost:8080/drivers/${nameValue}`);
            setData(result.data);
            console.log(result.data.username);
        } catch (e){
            console.log(e.error);
        }
    }

    function applyLogin(){
        console.log("logging in")
        if(nameValue === "driverusername" && passwordValue === "password"){
            getData()
            //setData(nameValue);
            login();
            history.push("/driver/home")
        }
    }
    return (
        <div>
            <HeaderPlain/>
            <main className={styles.main}>
                <button type="button" className={styles.title} onClick={applyLogin}>inloggen</button>
                <section>
                    <label htmlFor="name" className={styles.label}>Naam  </label>
                    <input id="name"
                           type="text"
                           value={nameValue}
                           className={styles.input}
                           onChange={(e) => {
                               setNameValue(e.target.value)
                           }}
                    />
                </section>
                <section>
                    <label htmlFor="password" className={styles.label}>Wachtwoord  </label>
                    <input id="password"
                           type="password"
                           value={passwordValue}
                           className={styles.input}
                           onChange={(e) => {
                               setPasswordValue(e.target.value)
                           }}
                    />
                </section>
            </main>
        </div>
    )
}