import styles from "./PlannerHome/PlannerHome.module.css"
import {useForm} from "react-hook-form";
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import {useContext, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../components/Context/AuthContextProvider";

export default function NewCustomer() {
    const {handleSubmit, register, reset, formState: {errors}} = useForm();
    const [photo, setPhoto] = useState("");
    const history = useHistory();
    const {refresh} = useContext(AuthContext);

    async function formSubmit(input) {
        const [firstName, lastName] = input.naam.split(" ");
        const toSend = {
            firstName,
            lastName,
            street: input.adres,
            houseNumber: input.huisnummer,
            postalCode: input.postcode,
            city: input.woonplaats,
            phoneNumber: input['telefoon nummer'],
            username: input.naam,
            password: "$2a$12$5usMMaD9hathHXMKNMjlseunXe.QEQbRBtFiBycc.V/teqa0c4v6K",
            enabled: true
        }
        try {
            await axios({
                method: "post",
                url: `http://localhost:8080/customers`,
                data: toSend,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            refresh();
            history.push(`/planner/home`)
        } catch (e) {
            console.error(e.message)
        }
    }

    function resetFunction() {
        reset();
    }



    return (
        <>
            <header className={styles.options}>
                <button type="button" onClick={handleSubmit(formSubmit)}>Save</button>
                <button type="button" onClick={() => {
                    resetFunction()
                }}>Reset
                </button>
            </header>

            <form className={styles.content} name="account-form" onSubmit={handleSubmit(formSubmit)}>
                {/*<div className={styles['image-container']}>*/}
                {/*    <img src={photo} className={styles.image}>*/}
                {/*    </img>*/}
                {/*    <input type="file" className={styles['foto-wijzigen']} onChange={(e) => {setImage(e)}}/>*/}
                {/*</div>*/}
                <LabeledInput errors={errors} register={register} title="naam"/>
                <LabeledInput errors={errors} register={register} title="adres">
                    <input {...register("huisnummer")} type="text" className={styles.housenumber} id="huisnummer"/>
                </LabeledInput>
                <LabeledInput errors={errors} register={register} title="woonplaats"/>
                <LabeledInput errors={errors} register={register} title="postcode"/>
                <LabeledInput errors={errors} register={register} title="telefoon nummer"/>
                <LabeledInput errors={errors} register={register} className="checked" checked title="enabled"/>


            </form>
        </>
    )
}