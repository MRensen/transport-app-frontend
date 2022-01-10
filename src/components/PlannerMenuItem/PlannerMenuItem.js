import styles from "./PlannerMenuItem.module.css"

export default function PlannerMenuItem({ naam, personeelsnummer, checked, setChecked, username}) {
    return (

        <div className={styles.container}>
            <input type="radio" className={styles.radio} name="menuitem" id={naam} checked={checked === username}
                   onChange={() => {
                       setChecked(username)
                   }}/>
            <label htmlFor={naam} className={styles.label}> <p>naam: {naam}</p> <p> personeelsnummer:</p> <p>{personeelsnummer}</p> </label>
        </div>
    )
}