import styles from "./Lossen.module.css";
import {HeaderAcceptDecline} from "../../../components/Header/Header";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

export default function Lossen() {
    const history = useHistory();
    const {id: orderId} = useParams();
    const {register, handleSubmit, watch} = useForm();
    const watchGelost = watch("gelost");
    const watchEmbalageGeladen = watch("embalage-geladen");
    const watchEmbalageGelost = watch("embalage-gelost");

    function acceptFunction(input) {
        async function patch() {
            const orderStatus = input.gelost? "delivered" : "not delivered";
            try {
                const result = await axios({
                    method: 'patch',
                    url: `http://localhost:8080/orders/${orderId}`,
                    data: {orderStatus: orderStatus},
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                history.push("/driver/planning")
            } catch (e) {
                console.log(e.message())
            }
        }

        patch();
    }

    function declineFunction() {
        console.log("decline");
        history.push("/driver/planning")
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