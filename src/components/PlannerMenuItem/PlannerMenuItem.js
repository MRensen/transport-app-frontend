import styles from "./PlannerMenuItem.module.css"
import {useEffect, useState} from "react";

export default function PlannerMenuItem({newItem, firstline, secondline, thirdline, checked, setChecked, id}) {
    const[update, setUpdate] = useState(true);
    useEffect(()=>{
        setUpdate(!update);
        },[checked])
        return (

            <div className={styles.container} key={firstline}>
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