import styles from "./PlannerMenuItem.module.css"
import {useHistory} from "react-router-dom";

export default function PlannerMenuItem({newItem, firstline, secondline, thirdline, key, checked, setChecked, id}) {
    const history = useHistory();
    console.log("printing planner item")
    // if(newItem){
    //     return(
    //         <button className={styles.label} onClick={()=>{history.push(`planner/${newItem}`)}}>Nieuw</button>
    //     )
    // }else {
        return (

            <div className={styles.container} key={key}>
                <input type="radio" className={styles.radio} name="menuitem" id={firstline}
                       checked={checked === id}
                       onChange={() => {
                           setChecked(id)
                       }}/>
                <label htmlFor={firstline} className={styles.label}><p> {firstline}</p> <p> {secondline}</p>
                    <p>{thirdline}</p></label>
            </div>
        )
    // }
}