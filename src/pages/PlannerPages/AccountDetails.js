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
    const plannerId = data.id;
    useEffect(() => {
        async function onMount() {
            if(!create) {
                    setMenuDisplay(false);
                    const result = await axios({
                        method: "get",
                        url: `http://localhost:8080/planners/${plannerId}`
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

    async function submitForm() {
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
                postalcode: data.postcode,
                city: data.city,
                employeeNumber: data['personeels nummer'],
                regularTruck: data['vaste wagen'],
                driverLicenseNumber: data['rijbewijs nummer'],
                phoneNumber: data['telefoon nummer']
            }
            {create &&
            (toSend.username = data.naam) &&
            (toSend.passWord = "$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K")
            }
            await axios({
                method: method,
                url: baseurl + url,
                header: {'Content-type': 'application/json'},
                data: toSend
            })
            if(create){
                history.push(`/planner/account`)
            }
        }
    }

    function setImage() {
        //TODO
    }

    return (
        <>
            <header className={styles.options}>
                <button type="button"
                        className={styles.button}
                        onClick={() => {
                            setShow(true)
                        }}
                > Change Password
                </button>
                <button type="submit"
                       className={styles.button}
                        onClick={handleSubmit(submitForm)}
                >Save</button>
            </header>
            <form className={styles.content} name="account-form" onSubmit={handleSubmit(submitForm)}>
                <div className={styles['image-container']}>
                    <div className={styles.image}>
                    </div>
                    <button type="button" className={styles['foto-wijzigen']} onClick={setImage}>foto wijzigen</button>
                </div>
                <LabeledInput errors={errors} title="naam" register={register}/>
                <LabeledInput errors={errors} register={register} title="adres">
                    <input {...register("huisnummer")} type="text" className={styles.housenumber} id="huisnummer"/>
                </LabeledInput>
                <LabeledInput errors={errors} register={register} title="postcode"/>
                <LabeledInput errors={errors} register={register} title="telefoon nummer"/>

                <ModalPassword show={show}
                               onClose={() => {
                                   setShow(false)
                               }}
                               id={plannerId}
                />
            </form>
        </>
    )
}