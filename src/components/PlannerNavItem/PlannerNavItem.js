import styles from "./PlannerNavItem.module.css";

export default function PlannerNavItem({title, checked, setChecked}) {
    return (
        <>
            <input type="radio" className={styles.radio} name="group" id={title} checked={checked === title}
                   onChange={() => {
                       setChecked(title)
                   }}/>
            <label htmlFor={title} className={styles.label}> {title}</label>
        </>
    )
}