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
                // const inputFileReader = new FileReader();
                // inputFileReader.onload= (event)=>{
                //     const base64 = event.target.result
                //     setPhoto(base64)
                // }
                // inputFileReader.readAsDataURL(image.data)
                // setPhoto(image.data)
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
            //     const fileReader = new FileReader();
            //
            //     fileReader.onload = (fileLoadedEvent) => {
            //         const base64Data = fileLoadedEvent.target.result;
            //         setPhoto(base64Data)
            //         console.log(base64Data)
            //
            //     }
            //     fileReader.readAsDataURL(result.data.image);
            } catch (e) {
                console.error(e.message)
            }
        }
        getUser()
        setImageDataInUseEffect();


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

    async function sendImage(toSend) {
        try {
            await axios({
                method: "patch",
                url: `http://localhost:8080/user/${data.username}/photo`,
                data: toSend,
                params: toSend,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
        } catch (e) {
            console.error(e.message)
        }
    }

    function setImage(e) {
        // console.log(e.target.files[0])

        const formData = new FormData();
        formData.append("image", e.target.files[0])
        console.log(formData)
        sendImage(formData);

        let fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            let base64Data = fileLoadedEvent.target.result;
            const [header, data] = base64Data.split(",")
            setPhoto(data)
            console.log(fileLoadedEvent)
        }
        fileReader.readAsDataURL(e.target.files[0]);


    }

    async function setImageDataInUseEffect(){
        try {
            const image = await axios({
                method: "get",
                url: `http://localhost:8080/user/${data.username}/photo`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            setPhoto(image.data);
        } catch(e) {console.error(e.message)}
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
                            <img src={`data:image/jpeg;base64,${photo}`} className={styles.image}/>
                            :
                            <img src={photo} className={styles.image}/>
                        }
                        <input type="file" accept="image/*" className={styles['foto-wijzigen']} onChange={(e) => {
                            setImage(e)
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