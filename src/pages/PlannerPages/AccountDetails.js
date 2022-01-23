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
    const {register, handleSubmit, reset, formState:{errors}} = useForm();
    const history = useHistory();
    const {data} = useContext(AuthContext);
    const plannerId = data.planner.id;
    useEffect(() => {
        async function onMount() {
            if(!create) {
                    setMenuDisplay(false);
                    const result = await axios({
                        method: "get",
                        url: `http://localhost:8080/planners/${plannerId}`
                        //TODO axios headers
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
        return function onDismount() {
            if(!create) {
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
            (toSend.username = data.naam) &&
            (toSend.password = "password")

            await axios({
                method: method,
                url: baseurl + url,
                headers: {'Content-Type': 'application/json'},
                data: toSend
                //TODO axios headers
            })
            if(create){
                history.push(`/planner/account`)
            }
        }
    }

    function setImage() {
        //TODO add image
    }

    return (
        <>
            <header className={styles.options}>
                <button type="submit"
                        onClick={handleSubmit(submitForm)}
                >Save</button>
                {create ?
                    <button type="button"
                            onClick={()=>{reset()}} //TODO
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
                    <img src="" className={styles.image}>
                    </img>
                    <button type="button" className={styles['foto-wijzigen']} onClick={setImage}>foto wijzigen</button>
                </div>
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