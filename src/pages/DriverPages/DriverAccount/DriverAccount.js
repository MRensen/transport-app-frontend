import styles from "./DriverAccount.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
import ModalPassword from "../../../components/ModalPassword/ModalPassword";
import axios from "axios";

export default function DriverAccount() {
    const {refresh, data} = useContext(AuthContext);
    const id = data.driver.id;
    const username = data.username;
    const {register, handleSubmit, reset} = useForm();
    const history = useHistory();
    const [driverData, setDriverdata] = useState({});
    const [show, setShow] = useState(false);
    const [photo, setPhoto] = useState("");


    useEffect(()=>{
        // async function getUser(){
        console.log(data)
        reset({
            naam: data.driver.firstName + " " + data.driver.lastName,
            adres : data.driver.street,
            huisnummer: data.driver.houseNumber,
            postcode : data.driver.postalcode,
            'personeels nummer': data.driver.employeeNumber,
            'vaste wagen': data.driver.regularTruck,
            'rijbewijs nummer': data.driver.driverLicenseNumber,
            'telefoon nummer': data.driver.phoneNumber,
        })
        setImageDataInUseEffect();
    },[])

    async function saveButton(data){
        const [firstName, lastName] = data.naam.split(" ");
        const toSend = {
            firstName,
            lastName,
            street : data.adres,
            houseNumber: data.huisnummer,
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
                url: `http://localhost:8080/drivers/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            refresh()
            history.push("/driver/home")
        }catch(e){console.log(e.error)}

    }

    const homeButton = () => {
        console.log("home");
        history.push("/driver/home")
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
                titleName="account"
                rightFunction={handleSubmit(saveButton)}
                leftFunction={homeButton}
            />
            <form className={styles.form} name="account-form" onSubmit={handleSubmit(saveButton)}>
                <aside className={styles.aside}>
                    <div className={styles['image-container']}>
                        {photo ?
                            <img src={`data:image/jpeg;base64,${photo}`} className={styles.image}/>
                            :
                            <img src={photo} className={styles.image}/>
                        }
                        <input type="file" accept="image/*" className={styles['foto-wijzigen']} onChange={(e) => {
                            setImage(e)
                        }}/>                    </div>
                    <LabeledInput title="naam" register={register}/>
                    <LabeledInput register={register} title="adres">
                        <input {...register("huisnummer")} type="text" className={styles.housenumber} id="huisnummer"/>
                    </LabeledInput>
                    <LabeledInput register={register} title="postcode" className="bottom-label"/>

                </aside>
                <aside className={styles.aside}>
                    <LabeledInput register={register} title="personeels nummer"/>
                    <LabeledInput register={register} title="vaste wagen"/>
                    <LabeledInput register={register} title="rijbewijs nummer"/>
                    <LabeledInput register={register} title="telefoon nummer" />
                    <button type="button"
                            className={styles.button}
                            onClick={()=>{setShow(true)}}
                    > Change Password</button>
                </aside>
                <ModalPassword show={show}
                               onClose={()=>{setShow(false)}}
                               id={data.username}
                />
            </form>
        </>
    )
}