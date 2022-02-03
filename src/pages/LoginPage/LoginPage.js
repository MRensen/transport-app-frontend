import styles from "./LoginPage.module.css";
import {useContext, useState} from "react";
import HeaderPlain from "../../components/Header/Header";
import {AuthContext} from "../../components/Context/AuthContextProvider";

export default function LoginPage() {

    const [passwordValue, setPasswordValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [error, setError] = useState("");
    const {login} = useContext(AuthContext);


    async function applyLogin() {
        setError("")
        if (passwordValue === "" || nameValue === "") {
            setError("Niet alle velden zijn ingevuld");
            console.log("you need to enter all values")
            console.log(`pass: ${passwordValue}| name: ${nameValue}`)
            return
        }
        setError("");
        try {
            if(! await login({username: nameValue, password: passwordValue})){
                setError("Deze inlog gegevens zijn niet bekend");
            }
        } catch(e){console.error(e.message);
        }

    }

    return (
        <div >
            <HeaderPlain/>
            <main className={styles.main}>
                <button type="button" className={styles.title} onClick={applyLogin}>inloggen</button>
                { error &&
                    <p className={styles.error}>{`${error}`} <br/> {`wachtwoord: ${passwordValue}| naam: ${nameValue}`}</p>
                }
                <section>
                    <label htmlFor="name" className={styles.label}>Naam </label>
                    <input id="name"
                           type="text"
                           value={nameValue}
                           className={styles.input}
                           onChange={(e) => {
                               setNameValue(e.target.value);
                               setError("");
                           }}
                           onKeyPress={(e)=>{if(e.key==="Enter"){applyLogin()}}}
                    />
                </section>
                <section>
                    <label htmlFor="password" className={styles.label}>Wachtwoord </label>
                    <input id="password"
                           type="password"
                           value={passwordValue}
                           className={styles.input}
                           onChange={(e) => {
                               setPasswordValue(e.target.value);
                               setError("");
                           }}
                           onKeyPress={(e)=>{if(e.key==="Enter"){applyLogin()}}}
                    />
                </section>
            </main>
        </div>
    )
}