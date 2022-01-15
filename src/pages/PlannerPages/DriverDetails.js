import styles from "./PlannerHome/PlannerHome.module.css"
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from "react";

export default function DriverDetails({checkedMenu, setCheckedMenu, create}) {

    const [driverData, setDriverData] = useState(null);
    const [unmount, setUnmount] = useState("");
    const {register, handleSubmit, reset, setValues} = useForm();

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
                        housenumber: result.data.houseNumber,
                        city: result.data.city,
                        'personeels nummer': result.data.employeeNumber,
                        'vaste wagen': result.data.regularTruck,
                        'rijbewijs nummer': result.data.driverLicenseNumber,
                        'telefoon nummer': result.data.phoneNumber,
                        enabled: result.data.enabled
                    });
                    console.log("test1: ");
                    console.log(driverData);
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
        const check = window.confirm("Weet je zeker dat je deze wijziging wilt opslaan?");
        if (check) {
            const [firstName, lastName] = data.naam.split(" ");
            const toSend = {
                firstName,
                lastName,
                street: data.adres,
                houseNumber: data.huisnummer,
                postalcode: data.postcode,
                employeeNumber: data['personeels nummer'],
                regularTruck: data['vaste wagen'],
                driverLicenseNumber: data['rijbewijs nummer'],
                phoneNumber: data['telefoon nummer']
            }
            await axios({
                method: "patch",
                url: `http://localhost:8080/drivers/${checkedMenu}`,
                header: {'Content-type': 'application/json'},
                data: toSend
            })
        }
        cancelFunction("saved")
    }

    function cancelFunction(value = "cancel") {
        setCheckedMenu(null);
        setDriverData(null);
        reset();
        console.log(`value-in-clacel-function ${value}`)
        setUnmount(value);
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

    if (driverData) {
        return (
            <>
                <header className={styles.options}>
                    <button type="button" onClick={deleteFunction}>delete</button>
                    <button type="button" onClick={handleSubmit(formSubmit)}>save</button>
                    <button type="button" onClick={() => {
                        cancelFunction()
                    }}>cancel
                    </button>
                </header>
                <main key={checkedMenu} className={styles.content}>
                    <img src="" className={styles.image}/>
                    <form onSubmit={handleSubmit(formSubmit)} onChange={console.log("form changed")}>
                        <LabeledInput register={register} title="naam"
                                      // value={`${driverData.firstName}  ${driverData.lastName}`}
                            // onChange={(e) => setDriverData({firstName : e.target.value.split(" ")[0], lastName: e.target.value.split(" ")[0]})}
                        />
                        <LabeledInput register={register} title="adres"
                                      // value={driverData.street}
                        >
                            <input type="text" className={styles.housenumber} id="huisnummer"
                                   // value={driverData.houseNumber}
                                   {...register('huisnummer')}/>
                        </LabeledInput>
                        <LabeledInput register={register} title="postcode" //value={driverData.postcode}
                        />
                        <LabeledInput register={register} title="city" //value={driverData.city}
                        />
                        <LabeledInput register={register} title="personeels nummer"
                                      value={driverData.employeeNumber}/>
                        <LabeledInput register={register} title="vaste wagen" value={driverData.regularTruck}/>
                        <LabeledInput register={register} title="rijbewijs nummer"
                                      value={driverData.driverLicenseNumber}/>
                        <LabeledInput register={register} title="telefoon nummer" value={driverData.phoneNumber}
                                      className="bottom-label"/>
                        <LabeledInput register={register} title="enabled" checked={driverData.enabled}/>
                        {/*<button type="submit">submit</button>*/}
                    </form>
                </main>
            </>
        )
    } else return (
        <>
            {console.log(unmount)}
            {unmount === "delete" ? <p>deleted...</p> : unmount === "saved" ? <p>saved...</p> : <p></p>}
            <p>Please select a driver</p>
        </>
    );
}