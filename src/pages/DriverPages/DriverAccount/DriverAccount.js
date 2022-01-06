import styles from "./DriverAccount.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useContext} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

export default function DriverAccount() {
    const {data} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const history = useHistory();
    const saveButton = () => {
        console.log("save");
    }

    const homeButton = () => {
        console.log("home");
        history.push("/driver/home")
    }

    const setImage = () => {
        console.log("set image");
    }
    return (
        <>
            <HeaderHomeSave
                titleName="account"
                rightFunction={saveButton}
                leftFunction={homeButton}
            />
            <form className={styles.form}>
                <aside className={styles.aside}>
                    <div className={styles['image-container']}>
                        <image className={styles.image}>
                        </image>
                        <button type="button" className={styles['foto-wijzigen']} onClick={setImage}>foto wijzigen</button>
                    </div>
                    <label className={styles.label} htmlFor="naam">
                        naam: <input type="text" id="naam" value={data.firstName + " " + data.lastName}/>
                    </label>
                    <label className={styles.label} htmlFor="adres">
                        adres: <input type="text" id="adres" value={data.street }/> <input type="text" className={styles.housenumber} id="housenumber" value={data.houseNumber}/>
                    </label>
                    <label className={styles.label} htmlFor="postcode">
                        postcode: <input className={styles['bottom-label']} type="text" id="postcode" value={data.postcode}/>
                    </label>
                </aside>
                <aside className={styles.aside}>
                    <label className={styles.label} htmlFor="personeelsnummer">
                        personeels nummer: <input type="text" id="personeelsnummer" value={data.employeeNumber}/>
                    </label>
                    <label className={styles.label} htmlFor="vastewagen">
                        vaste wagen: <input type="text" id="vastewagen" value={data.regularTruck}/>
                    </label>
                    <label className={styles.label} htmlFor="rijbewijsnummer">
                        rijbewijs nummer:  <input type="text" id="rijbewijsnummer" value={data.driverLicenseNumber}/>
                    </label>
                    <label className={styles.label} htmlFor="telefoonnummer">
                        telefoon nummer:  <input type="text" id="telefoonnummer" value={data.phoneNumber}/>
                    </label>
                </aside>
            </form>
        </>
    )
}