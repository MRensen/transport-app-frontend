import styles from "./CustomerAccount.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useHistory} from "react-router-dom";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
import ModalPassword from "../../../components/ModalPassword/ModalPassword";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import axios from "axios";
import {setImage, setImageDataInUseEffect} from "../../../components/Helpers/ImageFunctions";

export default function CustomerAccount() {
    const {data, refresh} = useContext(AuthContext);
    const [userData, setuserData] = useState({})
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [photo, setPhoto] = useState("");
    const {handleSubmit, register, formState: {errors}, reset} = useForm({ naam: data.customer.name,
        adres: data.customer.street,
        housenumber: data.customer.houseNumber,
        postcode: data.customer.postalCode,
        plaats: data.customer.city,
        gebruikersnaam: data.customer.username,
        "telefoon nummer": data.customer.phoneNumber,
        enabled: data.customer.enabled});

    useEffect(() => {
        async function getUser() {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/customers/${data.customer.id}`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                setuserData(result.data)
                reset({
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
        setImageDataInUseEffect(data.username, setPhoto);


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
                await axios({
                    method: "patch",
                    url: `http://localhost:8080/customers/${parseInt(userData.id)}`,
                    data: toSend,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                refresh();
                console.log(data);
                refresh();
            } catch (e) {
                console.error(e.message)
            }
        }
    }

    function homeFunction() {
        history.push("/customer/home")
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
                        {photo ?
                            <img src={`data:image/jpeg;base64,${photo}`} className={styles.image} alt="profile pic"/>
                            :
                            <img src={photo} className={styles.image} alt="profile pic"/>
                        }
                        <input type="file" accept="image/*" className={styles['foto-wijzigen']} onChange={(e) => {
                            setImage(e, setPhoto, data.username)
                        }}/>
                    </div>
                </aside>
                <aside className={styles.aside}>
                    <LabeledInput register={register} title="klantnummer" value={userData.id}/>
                    <LabeledInput errors={errors} register={register} title="gebruikersnaam"/>
                    <LabeledInput errors={errors} title="naam" register={register}/>
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