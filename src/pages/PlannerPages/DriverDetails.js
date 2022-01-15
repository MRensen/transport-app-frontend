import styles from "./PlannerHome/PlannerHome.module.css"
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

export default function DriverDetails({checkedMenu, setCheckedMenu, create}) {
    const history = useHistory();
    const [driverData, setDriverData] = useState(null);
    const [unmount, setUnmount] = useState("");
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    useEffect(() => {
        async function getDriver() {
            if (!create) {
                try {
                    const result = await axios({
                        method: 'get',
                        url: `http://localhost:8080/drivers/${checkedMenu}`
                    })
                    setDriverData(result.data);
                    reset({
                        naam: `${result.data.firstName} ${result.data.lastName}`,
                        postcode: result.data.postalcode,
                        adres: result.data.street,
                        huisnummer: result.data.houseNumber,
                        city: result.data.city,
                        'personeels nummer': result.data.employeeNumber,
                        'vaste wagen': result.data.regularTruck,
                        'rijbewijs nummer': result.data.driverLicenseNumber,
                        'telefoon nummer': result.data.phoneNumber,
                        enabled: result.data.enabled
                    });
                } catch (e) {
                    console.log(e.message)
                    return null;
                }
            }
        }

        function unmount() {
            setDriverData(null);
            checkedMenu = null;
            reset();
        }

        getDriver();
    }, [checkedMenu])

    useEffect(() => {
        reset();
    }, [unmount])


    async function formSubmit(data) {
        console.log("saveing....")
        const check = window.confirm("Weet je zeker dat je deze wijziging wilt opslaan?");
        if (check) {
            const method = create ? "post" : "patch";
            const baseurl = "http://localhost:8080/drivers";
            const url = create ? "" : `/${checkedMenu}`;
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
        }
        cancelFunction("saved")
    }

    function cancelFunction(value = "cancel") {
        if(create){
            history.push(`/planner/${checkedMenu}s`)
        } else {
            setCheckedMenu(null);
            setDriverData(null);
            reset();
            setUnmount(value);
        }
    }

    async function deleteFunction() {
        if (window.confirm("Weet je zeker dat je deze gebruiker wilt verwijderen?")) {
            await axios({
                method: "delete",
                url: `http://localhost:8080/drivers/${checkedMenu}`
            })
            cancelFunction("delete")
        }

    }

    function resetFunction(){
        console.log("reset")
        reset()
    }

    if (driverData || create) {
        return (
            <>
                <header className={styles.options}>
                    <button type="button" onClick={deleteFunction} className={create && styles.invisible} >delete</button>
                    <button type="button" onClick={handleSubmit(formSubmit)}>save</button>
                    {console.log(`create : ${create}`)}
                    {create?
                        <button type="button" onClick={() => {
                            resetFunction()
                        }}>reset</button>
                        :
                        <button type="button" onClick={() => {
                            cancelFunction()
                        }}>cancel</button>
                    }
                </header>
                <main key={checkedMenu} className={styles.content}>

                    <form onSubmit={handleSubmit(formSubmit)} onChange={console.log("form changed")} className={styles.form}>
                        <img src="" className={styles.image}/>
                        <LabeledInput errors={errors} register={register} title="naam"/>
                        <LabeledInput errors={errors} register={register} title="adres">
                            <input type="text" className={styles.housenumber} id="adres"
                                   {...register('huisnummer')}/>
                        </LabeledInput>
                        <LabeledInput errors={errors} register={register} title="postcode"/>
                        <LabeledInput errors={errors} register={register} title="city" />
                        <LabeledInput errors={errors} register={register} title="personeels nummer"/>
                        <LabeledInput errors={errors} register={register} title="vaste wagen"/>
                        <LabeledInput errors={errors} register={register} title="rijbewijs nummer"/>
                        <LabeledInput errors={errors} register={register} title="telefoon nummer" className="bottom-label"/>
                        <LabeledInput errors={errors} register={register} className="checked" checked title="enabled" />
                    </form>
                </main>
            </>
        )
    } else return (
        <>
            {unmount === "delete" ? <p>deleted...</p> : unmount === "saved" ? <p>saved...</p> : <p></p>}
            <p>Please select a driver</p>
        </>
    );
}