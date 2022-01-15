import styles from "./LabeledInput.module.css";
import {useForm} from "react-hook-form";
import {useState} from "react";

export default function LabeledInput({children, type = "text", title, value, className, register, checked, onChange }){
    if(checked){
        return (
            <label className={styles.label} htmlFor={`${title}: ${value}`}>
                {title}: <input className={styles[className]} type="checkbox" id={`${title}: ${value}`}
                                // checked={checked}
                                onChange={onchange}
                                {...register(title)}
            /> {children}
            </label>
        )
    }
    if(register) {
        return (
            <label key={value} className={styles.label} htmlFor={`${title}: ${value}`}>
                {title}: <input className={styles[className]} type={type} id={`${title}: ${value}`}
                                // defaultValue={value}
                                key={value}
                                {...register(title)}
            /> {children}
            </label>
        )
    } else {
        return (
            <label className={styles.label} htmlFor={`${title}`}>
                {title}: <input className={styles[className]} type={type} id={`${title}`}
                                value={value}
            /> {children}
            </label>
        )
    }
}