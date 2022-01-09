import {HeaderAcceptDecline} from "../../../components/Header/Header";
import styles from "./Laden.module.css";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
export default function Laden(){
    const history = useHistory();
    const {register, handleSubmit, watch, getValues} = useForm();
    const watchGeladen = watch("geladen");
    const watchEmbalageGeladen = watch("embalage-geladen");
    const watchEmbalageGelost = watch("embalage-gelost");

    function acceptFunction() {
        console.log("needs to communicate to backend OrderStatus=LOADED(ofzoiets)");
        history.push("/driver/home")
    }

    function declineFunction() {
        console.log("decline");
        history.push("/driver/home")
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