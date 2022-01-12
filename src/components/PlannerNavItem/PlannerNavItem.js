import styles from "./PlannerNavItem.module.css";
import {Redirect, useHistory, useRouteMatch} from "react-router-dom";

export default function PlannerNavItem({title, checked, setChecked}) {
    const {path} = useRouteMatch()
    const history = useHistory();
    return (
        <>
            <input type="radio" className={styles.radio} name="navitem" id={title} checked={checked === title}
                   onChange={() => {
                       setChecked(title)
                       history.push(`/planner/${title}`)
                   }}/>
            <label htmlFor={title} className={styles.label}> {title}</label>
        </>
    )
}