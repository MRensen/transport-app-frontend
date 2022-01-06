import {HeaderAcceptDecline} from "../../../components/Header/Header";
import {useHistory} from "react-router-dom";
import styles from "./StopRit.module.css";
import {useContext} from "react";
import {RitContext} from "../../../components/Context/RitContextProvider";

export default function StopRit() {
    const history = useHistory();
    const {unregisterRit} = useContext(RitContext);
    return (
        <>
            <HeaderAcceptDecline
                titleName="stop rit"
                declineFunction={() => {
                    history.push("/driver/home")
                }}
                acceptFunction={() => {
                    unregisterRit();
                    history.push("/driver/home")
                }}
            />
            <p className={styles.text}>Wilt u de rit beeindigen?</p>
        </>
    )
}