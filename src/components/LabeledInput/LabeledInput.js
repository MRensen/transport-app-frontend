import styles from "./LabeledInput.module.css";
import {useForm} from "react-hook-form";
import {useState} from "react";

export default function LabeledInput({children, type = "text", title, value, className, register, errors, checked, onChange }){
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
        const options = {required: true};
        if(title === "personeels nummer"){options.pattern = /^[0-9]*$/}
        return (
            <label key={title} className={styles.label} htmlFor={`${title}: ${value}`}>
                {title}: <input className={styles[className]} type={type} id={`${title}: ${value}`}
                                // defaultValue={value}
                                key={title}
                                {...register(title, options)}
            /> {children}
                <p style={{color:'#FF0000'}}>{errors[title]?.type === "required" && "required"}</p>
                <p style={{color:'#FF0000'}}>{errors[title]?.type === "pattern" && "only digits"}</p>
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