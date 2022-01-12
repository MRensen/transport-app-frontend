import styles from "./CustomerAccount.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useHistory} from "react-router-dom";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
import ModalPassword from "../../../components/ModalPassword/ModalPassword";
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";

export default function CustomerAccount() {
    const {data} = useContext(AuthContext);
    const [password, setPassword] = useState(data.password);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const {handleSubmit, register} = useForm();

    function saveFunction() {
        console.log("save");
    }

    function homeFunction() {
        history.push("/customer/home")
    }

    function setImage(){

    }

    return (
        <>
            <HeaderHomeSave
                titleName="mijn account"
                rightFunction={saveFunction}
                leftFunction={homeFunction}
            />
            <form className={styles.form} name="account-form" onSubmit={handleSubmit(saveFunction)}>
                <aside className={styles.aside}>
                    <div className={styles['image-container']}>
                        <div className={styles.image}>
                        </div>
                        <button type="button" className={styles['foto-wijzigen']} onClick={setImage}>foto wijzigen</button>
                    </div>
                </aside>
                <aside className={styles.aside}>
                    <LabeledInput register={register} title="klantnummer" value={data.id}/>
                    <LabeledInput title="naam" value={data.firstName + " " + data.lastName} register={register}/>
                    <LabeledInput register={register} title="adres" value={data.street}>
                        <input {...register("housenumber")} type="text" className={styles.housenumber} id="housenumber" value={data.houseNumber}/>
                    </LabeledInput>
                    <LabeledInput register={register} title="postcode" value={data.postcode}/>
                    <LabeledInput register={register} title="plaats" value={data.city}/>
                    <LabeledInput register={register} title="land" value={data.country}/>
                    <LabeledInput register={register} title="telefoon nummer" value={data.phoneNumber} />
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