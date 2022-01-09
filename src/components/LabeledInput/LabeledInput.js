import styles from "./LabeledInput.module.css";
import {useForm} from "react-hook-form";

export default function LabeledInput({children, type = "text", title, value, className, register }){
    return(
        <label className={styles.label} htmlFor={`${title}`}>
            {title}: <input className={styles[className]} type={type} id={`${title}`} defaultValue={value} {...register(title)}/> {children}
        </label>
    )
}