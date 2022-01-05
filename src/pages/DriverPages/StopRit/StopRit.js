import {HeaderAcceptDecline} from "../../../components/Header/Header";
import {useHistory} from "react-router-dom";
import styles from "./StopRit.module.css";

export default function StopRit() {
    const history = useHistory();
    return (
        <>
            <HeaderAcceptDecline
                titleName="stop rit"
                declineFunction={() => {
                    history.push("/driver/home")
                }}
                acceptFunction={() => {
                    console.log("accept: nog niks geimplementeerd (mischien de context leeg maken?)")
                    history.push("/driver/home")
                }}
            />
            <p className={styles.text}>Wilt u de rit beeindigen?</p>
        </>
    )
}