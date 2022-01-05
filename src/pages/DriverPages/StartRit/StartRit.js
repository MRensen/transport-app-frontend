import styles from "./StartRit.module.css";
import {HeaderAcceptDecline} from "../../../components/Header/Header";
import acceptLogo from "../../../resources/acceptbutton.png"
import cancelLogo from "../../../resources/cancelbutton.png"
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

export default function StartRit() {
    const {register, handleSubmit} = useForm()
    const history = useHistory();

    function submitFunction(data) {
        console.log(data)
    }

    return (
        <>
            <HeaderAcceptDecline
                titleName="start rit"
                acceptFunction={() => {
                    console.log("accept");
                    handleSubmit(submitFunction)();
                    history.push("/driver/home")
                }}
                declineFunction={() => {
                    console.log("decline");
                    history.push("/driver/home");
                }}
            />

            <form onSubmit={handleSubmit(submitFunction)} className={styles["startstop-form"]}>
                <label htmlFor="ritnummer" className="startstop-label">Ritnummer
                    <select id="ritnummer"
                            className={styles["startstop-select"]}
                            {...register("ritnummer")}
                    >
                        <option value="test1">test1</option>
                        <option value="test2">test2</option>
                    </select>
                </label>
                <label htmlFor="vrachtwagen" className={styles["startstop-label"]}>vrachtwagen </label>
                <select id="vrachtwagen"
                        className={styles["startstop-select"]}
                        {...register("vrachtwagen")}
                >
                    <option value="97-bph-8">97-bph-8</option>
                    <option value="br-tt-22">br-tt-22</option>
                </select>
            </form>
        </>
    )
}