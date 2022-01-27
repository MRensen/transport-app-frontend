import styles from "./PlannerHome/PlannerHome.module.css";
import {useContext, useEffect, useState} from "react";
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import ModalPassword from "../../components/ModalPassword/ModalPassword";
import axios from "axios";
import {AuthContext} from "../../components/Context/AuthContextProvider";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

export default function AccountDetails({setMenuDisplay, create, checkedMenu}) {
    const [show, setShow] = useState(false);
    const [photo, setPhoto] = useState("");
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const history = useHistory();
    const {data, refresh} = useContext(AuthContext);
    const plannerId = data.planner.id;
    useEffect(() => {
        async function onMount() {
            if (!create) {
                setMenuDisplay(false);
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/planners/${plannerId}`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                console.log(result.data)

                reset({
                    naam: `${result.data.firstName} ${result.data.lastName}`,
                    postcode: result.data.postalCode,
                    adres: result.data.street,
                    huisnummer: result.data.houseNumber,
                    city: result.data.city,
                    // 'personeels nummer': result.data.employeeNumber,
                    // 'vaste wagen': result.data.regularTruck,
                    // 'rijbewijs nummer': result.data.driverLicenseNumber,
                    'telefoon nummer': result.data.phoneNumber,
                    enabled: result.data.enabled
                });
            }
        }

        onMount();
        setImageDataInUseEffect();
        return function onDismount() {
            if (!create) {
                setMenuDisplay(true);
                console.log("unmounting");
            }
        }
    }, [])

    async function submitForm(data) {
        const check = window.confirm("Weet je zeker dat je deze wijziging wilt opslaan?");
        if (check) {
            const method = create ? "post" : "patch";
            const baseurl = "http://localhost:8080/planners";
            const url = create ? "" : `/${plannerId}`;
            const [firstName, lastName] = data.naam.split(" ");
            const toSend = {
                firstName,
                lastName,
                street: data.adres,
                houseNumber: data.huisnummer,
                postalCode: data.postcode,
                city: data.woonplaats,
                phoneNumber: data['telefoon nummer']
            }
            create &&
            (toSend.enabled = true) &&
            (toSend.username = data.naam) &&
            (toSend.password = "$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K")
            try {
                await axios({
                    method: method,
                    url: baseurl + url,
                    data: toSend,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                refresh();
                if (create) {
                    history.push(`/planner/account`)
                }
            } catch (e) {
                console.error(e.message)
            }
        }
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
            <header className={styles.options}>
                <button type="submit"
                        onClick={handleSubmit(submitForm)}
                >Save
                </button>
                {create ?
                    <button type="button"
                            onClick={() => {
                                reset()
                            }}
                    >Reset</button>
                    :
                    <button type="button"
                            onClick={() => {
                                setShow(true)
                            }}
                    > Change Password
                    </button>
                }
            </header>
            <form className={styles.content} name="account-form" onSubmit={handleSubmit(submitForm)}>
                <div className={styles['image-container']}>
                    {photo ?
                        <img src={`data:image/jpeg;base64,${photo}`} className={styles.image}/>
                        :
                        <img src={photo} className={styles.image}/>
                    }
                    <input type="file" accept="image/*" className={styles['foto-wijzigen']} onChange={(e) => {
                        setImage(e)
                    }}/>                </div>
                <LabeledInput errors={errors} register={register} title="naam"/>
                <LabeledInput errors={errors} register={register} title="adres">
                    <input {...register("huisnummer")} type="text" className={styles.housenumber} id="huisnummer"/>
                </LabeledInput>
                <LabeledInput errors={errors} register={register} title="woonplaats"/>
                <LabeledInput errors={errors} register={register} title="postcode"/>
                <LabeledInput errors={errors} register={register} title="telefoon nummer"/>
                <LabeledInput errors={errors} register={register} className="checked" checked title="enabled"/>


            </form>
            <ModalPassword show={show}
                           onClose={() => {
                               setShow(false)
                           }}
                           id={data.username}
            />
        </>
    )
}