import styles from "./CustomerAccount.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useHistory} from "react-router-dom";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
import ModalPassword from "../../../components/ModalPassword/ModalPassword";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import axios from "axios";

export default function CustomerAccount() {
    const {data} = useContext(AuthContext);
    const [userData, setuserData] = useState({})
    const [password, setPassword] = useState(userData.password);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const {handleSubmit, register, formState: {error}, reset} = useForm();

    useEffect(() => {
        async function getUser() {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/customers/${data.customer.id}`
                })
                console.log(result.data)
                setuserData(result.data)
                reset({
                    klantnummer: result.data.id,
                    naam: result.data.name,
                    adres: result.data.street,
                    housenumber: result.data.houseNumber,
                    postcode: result.data.postalCode,
                    plaats: result.data.city,
                    gebruikersnaam: result.data.username,
                    "telefoon nummer": result.data.phoneNumber,
                    enabled: result.data.enabled

                })
            } catch (e) {
                console.error(e.message)
            }
        }

        getUser()

    }, [])

    async function saveFunction(data) {
        const confirm = window.confirm("Weet je zeker dat je deze wijzigingen wilt opslaan?")
        const toSend = {
            id: data.klantnummer,
            name: data.naam,
            street: data.adres,
            houseNumber: data.housenumber,
            postalCode: data.postcode,
            city: data.plaats,
            username: data.gebruikersnaam,
            phoneNumber: data["telefoon nummer"],
            enabled: data.enabled
        }
        if (confirm) {
            try {
                const result = await axios({
                    method: "patch",
                    url: `http://localhost:8080/customers/${parseInt(userData.id)}`,
                    // headers: {'Content-Type': 'application/json'},
                    data: toSend
                })
                console.log(data);
            } catch(e){console.error(e.message)}
        }
    }

    function homeFunction() {
        history.push("/customer/home")
    }

    function setImage() {

    }

    return (
        <>
            <HeaderHomeSave
                titleName="mijn account"
                rightFunction={handleSubmit(saveFunction)}
                leftFunction={homeFunction}
            />
            <form className={styles.form} name="account-form" onSubmit={handleSubmit(saveFunction)}>
                <aside className={styles.aside}>
                    <div className={styles['image-container']}>
                        <div className={styles.image}>
                        </div>
                        <button type="button" className={styles['foto-wijzigen']} onClick={setImage}>foto wijzigen
                        </button>
                    </div>
                </aside>
                <aside className={styles.aside}>
                    <LabeledInput register={register} title="klantnummer"/>
                    <LabeledInput register={register} title="gebruikersnaam"/>
                    <LabeledInput title="naam" register={register}/>
                    <LabeledInput register={register} title="adres">
                        <input {...register("housenumber")} type="text" className={styles.housenumber}
                               id="housenumber"/>
                    </LabeledInput>
                    <LabeledInput register={register} title="postcode"/>
                    <LabeledInput register={register} title="plaats"/>
                    <LabeledInput register={register} title="telefoon nummer"/>
                    <LabeledInput register={register} title="enabled" checked className="checked"/>
                    <button type="button"
                            className={styles.button}
                            onClick={() => {
                                setShow(true)
                            }}
                    > Change Password
                    </button>
                </aside>
                <ModalPassword show={show}
                               onClose={() => {
                                   setShow(false)
                               }}
                               id={userData.username}
                />
            </form>
        </>
    )
}