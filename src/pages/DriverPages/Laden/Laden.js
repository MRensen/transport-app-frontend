import {HeaderAcceptDecline} from "../../../components/Header/Header";
import styles from "./Laden.module.css";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

export default function Laden() {
    const history = useHistory();
    const {register, handleSubmit, watch} = useForm();
    const watchGeladen = watch("geladen");
    const watchEmbalageGeladen = watch("embalage-geladen");
    const watchEmbalageGelost = watch("embalage-gelost");
    const {id: orderId} = useParams();

    function acceptFunction(formData) {
        async function patch() {
            try {
                const result = await axios({
                    method: 'patch',
                    url: `http://localhost:8080/orders/${orderId}`,
                    data: {orderStatus: "delivered"}
                    //TODO axios headers
                })
                history.push("/driver/planning")
            } catch (e) {
                console.log(e.message())
            }
        }

        patch();
    }

    function declineFunction() {
        history.push("/driver/planning")
    }

    return (
        <>
            <HeaderAcceptDecline
                titleName="laden"
                acceptFunction={() => {
                    handleSubmit(acceptFunction)();
                    console.log("accept");
                }}
                declineFunction={declineFunction}
            />
            <form className={styles.form} onSubmit={handleSubmit(acceptFunction)}>
                <label htmlFor="geladen" className={styles.label}>geladen?:
                    <input type="checkbox"
                           id="geladen"
                           className={styles.checkbox}
                           {...register("geladen")}
                    />
                </label>
                {watchGeladen &&
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
                {watchGeladen &&
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

            </form>
        </>
    )
}