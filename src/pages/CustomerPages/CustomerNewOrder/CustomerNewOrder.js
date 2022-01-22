import styles from "./CustomerNewOrder.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useForm} from "react-hook-form";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
import {useContext} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function CustomerNewOrder() {
    const {handleSubmit, register} = useForm()
    const {data} = useContext(AuthContext);
    const history = useHistory();
    const customerId = data.customer.id;

    async function saveFunction(data) {
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
            creator: {id: customerId},
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
            data: toSend
            // TODO axios headers
        })
        homeFunction();
    }

    function homeFunction() {
        history.push("/customer/home")
    }

    return (
        <>
            <HeaderHomeSave rightFunction={handleSubmit(saveFunction)}
                            leftFunction={homeFunction}
                            titleName="Nieuwe Order"
            />
            <form onSubmit={handleSubmit(saveFunction)} className={styles.main}>
                <main className={styles.top}>
                    <aside className={styles.aside}>
                        <h1>Laden</h1>
                        <LabeledInput register={register} title="laad-naam"/>
                        <LabeledInput register={register} title="laad-adres"/>
                        <LabeledInput register={register} title="laad-postcode">
                            <input {...register("laad-housenumber")} type="text" className={styles.housenumber}
                                   id="laad-housenumber"/>
                        </LabeledInput>
                        <LabeledInput register={register} title="laad-land"/>
                        <LabeledInput register={register} title="laad-datum"/>

                    </aside>
                    <aside className={styles.aside}>
                        <h1>Lossen</h1>
                        <LabeledInput register={register} title="los-naam"/>
                        <LabeledInput register={register} title="los-adres"/>
                        <LabeledInput register={register} title="los-postcode">
                            <input {...register("los-housenumber")} type="text" className={styles.small}
                                   id="los-housenumber"/>
                        </LabeledInput>
                        <LabeledInput register={register} title="los-land"/>
                        <LabeledInput register={register} title="los-datum"/>
                    </aside>
                </main>
                <footer className={styles.footer}>
                    <aside className={styles.footside}>
                        <LabeledInput register={register} title="aantal"/>
                        <LabeledInput register={register} title="gewicht"/>
                        <LabeledInput register={register} title="lading"/>
                        <label htmlFor="type" className={styles.label}> embalage
                            <select {...register("type")} id="type" className={styles.type}>
                                <option value="euro">euro</option>
                                <option value="blok">blok</option>
                                <option value="anders">anders</option>
                            </select>
                        </label>
                    </aside>
                    <aside className={styles.footside}>
                        <label htmlFor="opmerkingen" className={styles.label}>opmerkingen
                            <textarea rows="4"
                                      {...register("opmerkingen")}
                                      id="opmerkingen"
                                      className={styles.opmerkingen}/>
                        </label>
                        <div className={styles.afmetingen}>
                            <label className={styles.label}> lxbxh
                                <input type="text" placeholder="cm" maxLength="3" className={styles.small} {...register("lengte")}/>
                                <input type="text" placeholder="cm" maxLength="3" className={styles.small} {...register("breedte")}/>
                                <input type="text" placeholder="cm" maxLength="3" className={styles.small} {...register("hoogte")}/>
                            </label>
                        </div>
                        <div className={styles["laden-lossen"]}>
                            <label className={styles.label} htmlFor="laden">laden<input type="radio" id="laden" value="laden" {...register("laden/lossen")}/></label>
                            <label className={styles.label} htmlFor="lossen">lossen<input type="radio" id="lossen" value="lossen" {...register("laden/lossen")}/></label>
                        </div>
                    </aside>
                </footer>
            </form>
        </>
    )
}