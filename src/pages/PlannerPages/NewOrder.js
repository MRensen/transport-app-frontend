import styles from "./PlannerHome/PlannerHome.module.css";
import {useForm} from "react-hook-form";
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import axios from "axios";

export default function NewOrder({checkedMenu}) {
    const {register, handleSubmit, reset} = useForm();

    async function formSubmit(data) {
        const toSend = {
            loadingName : data["laad-naam"],
            loadingStreet : data["laad-adres"],
            loadingPostal : data["laad-postcode"],
            loadingHouseNumber: data["laad-housenumber"],
            loadingCountry : data["laad-land"],
            loadingDate : data["laad-datum"],
            deliveryName : data["los-naam"],
            deliveryStreet: data["los-adres"],
            deliveryPostal: data["los-postcode"],
            deliveryHouseNumber : data["los-housenumber"],
            deliveryCountry : data["los-land"],
            deliveryDate: data["los-datum"],
            description: data["opmerkingen"],
            orderStatus: "processing",
            type: data.type,
            isPickup: data["laden/lossen"] === "laden",
            pallets:[]
        }
        for(let i = parseInt(data.aantal); i > 0; i--){
            toSend.pallets.push({
                height: data.hoogte,
                width: data.breedte,
                length: data.lengte,
                type: data.type,
                load: data.lading,
                weight: data.gewicht
            })
        }
        console.log(toSend)
        await axios({
            method: "post",
            url: `http://localhost:8080/orders`,
            data: toSend,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
            }
        })
    }

    function resetFunction() {
        reset()
    }

    return (
        <>
            <header className={styles.options}>
                <button type="button" onClick={handleSubmit(formSubmit)}>Save</button>
                <button type="button" onClick={()=>{resetFunction()}}>Reset
                </button>

            </header>

            <form className={styles.content} name="order-form" onSubmit={handleSubmit(formSubmit)}>

                <h1>Laden</h1>
                <LabeledInput register={register} title="laad-naam"/>
                <LabeledInput register={register} title="laad-adres"/>
                <LabeledInput register={register} title="laad-postcode">
                    <input {...register("laad-housenumber")} type="text" className={styles.housenumber}
                           id="laad-housenumber"/>
                </LabeledInput>
                <LabeledInput register={register} title="laad-land"/>
                <LabeledInput register={register} title="laad-datum"/>

                <h1>Lossen</h1>
                <LabeledInput register={register} title="los-naam"/>
                <LabeledInput register={register} title="los-adres"/>
                <LabeledInput register={register} title="los-postcode">
                    <input {...register("los-housenumber")} type="text" className={styles.housenumber}
                           id="los-housenumber"/>
                </LabeledInput>
                <LabeledInput register={register} title="los-land"/>
                <LabeledInput register={register} title="los-datum"/>
                <LabeledInput register={register} title="aantal"/>
                <LabeledInput register={register} title="gewicht"/>
                <LabeledInput register={register} title="lading"/>

                <h1>pallets</h1>
                <label htmlFor="type" className={styles['new-label']}> embalage
                    <select {...register("type")} id="type" className={styles.type}>
                        <option value="euro">euro</option>
                        <option value="blok">blok</option>
                        <option value="anders">anders</option>
                    </select>
                </label>
                <br/>
                <section className={styles.opmerkingen}>
                    <label htmlFor="opmerkingen" className={styles['new-label']}>opmerkingen
                        <textarea rows="4"
                                  {...register("opmerkingen")}
                                  id="opmerkingen"
                                  className={styles.opmerkingen}/>
                    </label>
                </section>
                <br/>
                <div className={styles.afmetingen}>
                    <label className={styles['new-label']}> lxbxh
                        <input type="text" placeholder="cm" maxLength="3"
                               className={styles.small} {...register("lengte")}/>
                        <input type="text" placeholder="cm" maxLength="3"
                               className={styles.small} {...register("breedte")}/>
                        <input type="text" placeholder="cm" maxLength="3"
                               className={styles.small} {...register("hoogte")}/>
                    </label>
                </div>
                <br/>
                <div className={styles["laden-lossen"]}>
                    <label className={styles['new-label']} htmlFor="laden">laden<input type="radio" id="laden"
                                                                                       value="laden" {...register("laden/lossen")}/></label>
                    <label className={styles['new-label']} htmlFor="lossen">lossen<input type="radio" id="lossen"
                                                                                         value="lossen" {...register("laden/lossen")}/></label>
                </div>
            </form>
        </>
    )
}