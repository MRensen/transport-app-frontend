import styles from "./DriverAccount.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
import ModalPassword from "../../../components/ModalPassword/ModalPassword";
import axios from "axios";
import {setImage, setImageDataInUseEffect} from "../../../components/Helpers/ImageFunctions";

export default function DriverAccount() {
    const {refresh, data} = useContext(AuthContext);
    const id = data.driver.id;
    const {register, handleSubmit, reset} = useForm();
    const history = useHistory();
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
        setImageDataInUseEffect(data.username, setPhoto);
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
            await axios({
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
                            <img src={`data:image/jpeg;base64,${photo}`} className={styles.image} alt="profile pic"/>
                            :
                            <img src={photo} className={styles.image} alt="profile pic"/>
                        }
                        <input type="file" accept="image/*" className={styles['foto-wijzigen']} onChange={(e) => {
                            setImage(e, setPhoto, data.username)
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