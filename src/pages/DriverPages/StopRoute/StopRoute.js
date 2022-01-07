import {HeaderAcceptDecline} from "../../../components/Header/Header";
import {useHistory} from "react-router-dom";
import styles from "./StopRoute.module.css";
import {useContext} from "react";
import {RouteContext} from "../../../components/Context/RouteContextProvider";

export default function StopRoute() {
    const history = useHistory();
    const {unregisterroute} = useContext(RouteContext);
    return (
        <>
            <HeaderAcceptDecline
                titleName="stop route"
                declineFunction={() => {
                    history.push("/driver/home")
                }}
                acceptFunction={() => {
                    unregisterroute();
                    history.push("/driver/home")
                }}
            />
            <p className={styles.text}>Wilt u de route beeindigen?</p>
        </>
    )
}