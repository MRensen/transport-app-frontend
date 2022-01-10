import styles from "./DriverAccount.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useContext, useState} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
import ModalPassword from "../../../components/ModalPassword/ModalPassword";
import axios from "axios";

export default function DriverAccount() {
    const {data} = useContext(AuthContext);
    const username = data.username;
    const {register, handleSubmit} = useForm();
    const [password, setPassword] = useState(data.password);
    const history = useHistory();
    const [show, setShow] = useState(false);
    async function saveButton(data){
        const [firstName, lastName] = data.naam.split(" ");
        const toSend = {
            firstName,
            lastName,
            street : data.adres,
            houseNumber: data.housenumber,
            postcode : data.postcode,
            employeeNumber : data['personeels nummer'],
            regularTruck : data['vaste wagen'],
            driverLicenseNumber: data['rijbewijs nummer'],
            phoneNumber : data['telefoon nummer']
        }
        try{
            const result = await axios({
                method : "patch",
                data: toSend,
                url: `http://localhost:8080/drivers/${username}`
            })
        }catch(e){console.log(e.error)}

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
                rightFunction={handleSubmit(saveButton)}
                leftFunction={homeButton}
            />
            <form className={styles.form} name="account-form" onSubmit={handleSubmit(saveButton)}>
                <aside className={styles.aside}>
                    <div className={styles['image-container']}>
                        <div className={styles.image}>
                        </div>
                        <button type="button" className={styles['foto-wijzigen']} onClick={setImage}>foto wijzigen</button>
                    </div>
                    <LabeledInput title="naam" value={data.firstName + " " + data.lastName} register={register}/>
                    <LabeledInput register={register} title="adres" value={data.street}>
                        <input {...register("housenumber")} type="text" className={styles.housenumber} id="housenumber" value={data.houseNumber}/>
                    </LabeledInput>
                    <LabeledInput register={register} title="postcode" value={data.postcode} className="bottom-label"/>

                </aside>
                <aside className={styles.aside}>
                    <LabeledInput register={register} title="personeels nummer" value={data.employeeNumber}/>
                    <LabeledInput register={register} title="vaste wagen" value={data.regularTruck}/>
                    <LabeledInput register={register} title="rijbewijs nummer" value={data.driverLicenseNumber}/>
                    <LabeledInput register={register} title="telefoon nummer" value={data.phoneNumber}/>
                    <button type="button"
                            className={styles.button}
                            onClick={()=>{setShow(true)}}
                    > Change Password</button>
                </aside>
                <ModalPassword show={show}
                               setPassword={setPassword}
                               onClose={()=>{setShow(false)}}
                               currentPassword={password}
                />
            </form>
        </>
    )
}