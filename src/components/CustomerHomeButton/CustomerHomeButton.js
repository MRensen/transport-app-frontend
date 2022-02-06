import styles from "./CustomerHomeButton.module.css";
import {useHistory} from "react-router-dom";
export default function CustomerHomeButton({path, name, logo}){
    const history = useHistory();
    return(
    <div className={styles.button}>
        <input type="image" src={logo} id={name} alt={name} onClick={() => {
            history.push(path);
        }}/>
        <label htmlFor={name} className={styles.label}> {name} </label>
    </div>
    )
}