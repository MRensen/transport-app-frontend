import styles from "./Lossen.module.css";
import {HeaderAcceptDecline} from "../../../components/Header/Header";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";

export default function Lossen() {
    const history = useHistory();
    const {register, handleSubmit, watch, getValues} = useForm();
    const watchGelost = watch("gelost");
    const watchEmbalageGeladen = watch("embalage-geladen");
    const watchEmbalageGelost = watch("embalage-gelost");

    function acceptFunction() {
        console.log("needs to communicate to backend OrderStatus=DELIVERED");
        history.push("/driver/home")
    }

    function declineFunction() {
        console.log("decline");
        history.push("/driver/home")
    }

    return (
        <>
            <HeaderAcceptDecline
                titleName="lossen"
                acceptFunction={() => {
                    handleSubmit(acceptFunction)();
                    console.log("accept");
                }}
                declineFunction={declineFunction}
            />
            <form className={styles.form} onSubmit={handleSubmit(acceptFunction)}>
                <label htmlFor="gelost" className={styles.label}>gelost?:
                    <input type="checkbox"
                           id="gelost"
                           className={styles.checkbox}
                           {...register("gelost")}
                    />
                </label>
                {watchGelost &&
                <label htmlFor="embalage-geladen" className={styles.label}>embalage geladen?:
                    <input type="checkbox"
                           id="embalage-geladen"
                           className={styles.checkbox}
                           {...register("embalage-geladen")}
                    />
                </label>
                }
                {watchEmbalageGeladen &&
                <label htmlFor="aantal-geladen" className={styles.label}>aantal:
                    <input type="number"
                           id="aantal-geladen"
                           min={0}
                           className={styles.number}
                           {...register("aantal-geladen")}
                    />
                </label>
                }
                {watchGelost &&
                <label htmlFor="embalage-gelost" className={styles.label}>embalage gelost?:
                    <input type="checkbox"
                           id="embalage-gelost"
                           className={styles.checkbox}
                           {...register("embalage-gelost")}
                    />
                </label>
                }
                {watchEmbalageGelost &&
                <label htmlFor="aantal-gelost" className={styles.label}>aantal:
                    <input type="number"
                           id="aantal-gelost"
                           min={0}
                           className={styles.number}
                           {...register("aantal-gelost")}
                    />
                </label>
                }

            </form>
        </>
    )
}