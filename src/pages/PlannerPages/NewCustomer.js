import styles from "./PlannerHome/PlannerHome.module.css"
import {useForm} from "react-hook-form";
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import {useState} from "react";

export default function NewCustomer() {
    const {handleSubmit, register, reset, formState: {errors}} = useForm();
    const [photo, setPhoto] = useState("");

    function formSubmit(input) {
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
            password: "password"
        }
    }

    function resetFunction() {

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