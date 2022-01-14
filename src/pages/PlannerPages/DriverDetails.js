import styles from "./PlannerHome/PlannerHome.module.css"
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from "react";

export default function DriverDetails({ checkedMenu}) {

    const [driverData, setDriverData] = useState(null);
    const {register, handleSubmit} = useForm();
    useEffect(() => {
        async function getDriver() {
            try {
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:8080/drivers/${checkedMenu}`
                })
                setDriverData(result.data);
                console.log("test1: ");
                console.log(driverData);
            } catch (e) {
                console.log(e.message)
                return null;
            }
        }
        function unmount(){
            setDriverData(null);
            checkedMenu = null;
        }

        getDriver();
    },[checkedMenu])

    function formSubmit(){

    }

    if (driverData) {
        console.log("test2: ")
        console.log(driverData)
        return (
            <>
                <header className={styles.options}>
                    <button type="button">delete</button>
                    <button type="button">save</button>
                    <button type="button">cancel</button>
                </header>
                <main key={checkedMenu} className={styles.content}>
                    <img src="" className={styles.image}/>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <LabeledInput register={register} title="naam"
                                      value={`${driverData.firstName}  ${driverData.lastName}`}
                                      // onChange={(e) => setDriverData({firstName : e.target.value.split(" ")[0], lastName: e.target.value.split(" ")[0]})}
                                        />
                        <LabeledInput register={register} title="adres" value={driverData.street}>
                            <input type="text" className={styles.housenumber} id="housenumber"
                                   value={driverData.houseNumber}
                                   {...register('housenumber')}/>
                        </LabeledInput>
                        <LabeledInput register={register} title="postcode" value={driverData.postcode}/>
                        <LabeledInput register={register} title="city" value={driverData.city}/>
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
    } else return null;
}