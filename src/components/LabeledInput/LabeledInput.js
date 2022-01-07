import styles from "./LabeledInput.module.css";

export default function LabeledInput({children, type = "text", title, value, className}){
    return(
        <label className={styles.label} htmlFor={`${title}`}>
            {title}: <input className={styles[className]} type={type} id={`${title}`} value={value}/> {children}
        </label>
    )
}