import styles from "./StartRit.module.css";
import {HeaderAcceptDecline} from "../../../components/Header/Header";
import acceptLogo from "../../../resources/acceptbutton.png"
import cancelLogo from "../../../resources/cancelbutton.png"
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {useContext, useEffect} from "react";
import {RitContext} from "../../../components/Context/RitContextProvider";
import {AuthContext} from "../../../components/Context/AuthContextProvider";

export default function StartRit() {

    const {register, handleSubmit} = useForm()
    const {unregisterRit, registerRit} = useContext(RitContext);
    const {id} = useContext(AuthContext);
    const history = useHistory();


    function acceptFunction(data) {
        console.log(data)
        registerRit(data);
    }

    function declineFunction(data) {
        console.log("rit not registered")
    }

    return (
        <>
            <HeaderAcceptDecline
                titleName="start rit"
                acceptFunction={() => {
                    console.log("accept");
                    handleSubmit(acceptFunction)();
                    history.push("/driver/home")
                }}
                declineFunction={() => {
                    console.log("decline");
                    declineFunction();
                    history.push("/driver/home");
                }}
            />

            <form onSubmit={handleSubmit(acceptFunction)} className={styles["startstop-form"]}>
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