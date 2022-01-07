import styles from "./DriverAccount.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useContext} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";

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
                    <LabeledInput title="naam" value={data.firstName + " " + data.lastName}/>
                    <LabeledInput title="adres" value={data.street}>
                        <input type="text" className={styles.housenumber} id="housenumber" value={data.houseNumber}/>
                    </LabeledInput>
                    <LabeledInput title="postcode" value={data.postcode} className="bottom-label"/>

                </aside>
                <aside className={styles.aside}>
                    <LabeledInput title="personeels nummer" value={data.employeeNumber}/>
                    <LabeledInput title="vaste wagen" value={data.regularTruck}/>
                    <LabeledInput title={"rijbewijs nummer"} value={data.driverLicenseNumber}/>
                    <LabeledInput title="telefoon nummer" value={data.phoneNumber}/>
                </aside>
            </form>
        </>
    )
}