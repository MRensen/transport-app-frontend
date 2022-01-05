import {useHistory} from "react-router-dom";
import styles from "./DriverHomeButton.module.css";

export default function DriverHomeButton({text, disabled=false}){
    const history = useHistory();
    let classVariable;
    if(disabled){
        classVariable = "disabled-button";
    } else {
        classVariable = "abled-button";
    }
    return(
        <button className={styles[classVariable]} disabled={disabled} onClick={() => {history.push("/driver/"+text)}}>
            <p className={styles.p}>{text}</p>
        </button>
    )
}