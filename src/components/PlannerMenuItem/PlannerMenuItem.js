import styles from "./PlannerMenuItem.module.css"
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

export default function PlannerMenuItem({newItem, firstline, secondline, thirdline, key, checked, setChecked, id}) {
    const history = useHistory();
    const[update, setUpdate] = useState(true);
    useEffect(()=>{
        setUpdate(!update);
        },[checked])
        return (

            <div className={styles.container} key={key}>
                <input type="radio" className={styles.radio} name="menuitem" id={id}
                       checked={checked === id}
                       onChange={() => {
                           setChecked(id)
                       }}/>
                <label htmlFor={id} className={styles.label}><p> {firstline}</p> <p> {secondline}</p>
                    <p>{thirdline}</p></label>
            </div>
        )
    // }
}