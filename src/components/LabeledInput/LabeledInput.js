import styles from "./LabeledInput.module.css";

export default function LabeledInput({children, type = "text", title, value, className, register, errors, checked, onChange }){
    if(checked){
        return (
            <label className={styles.label} htmlFor={`${title}: ${value}`}>
                {title}: <input className={styles[className]} type="checkbox" id={`${title}: ${value}`}
                                onChange={onchange}
                                {...register(title)}
            /> {children}
            </label>
        )
    }
    if(errors) {
        const options = {required: true};
        if(title === "personeels nummer"){options.pattern = /^[0-9]*$/}
        return (
            <label key={title} className={styles.label} htmlFor={`${title}: ${value}`}>
                {title}: <input className={styles[className]} type={type} id={`${title}: ${value}`}
                                key={title}
                                {...register(title, options)}
            /> {children}
                {(Object.keys(errors).length !== 0) &&
                <p style={{color: '#FF0000'}}>
                    {errors[title]?.type === "required" && "required"} <br/>
                    {errors[title]?.type === "pattern" && "only digits"}
                </p>
                }
            </label>
        )
    } else {
        return (
            <label key={title} className={styles.label} htmlFor={`${title}: ${value}`}>
                {title}: <input className={styles[className]} type={type} id={`${title}: ${value}`}
                                key={title}
                                value={value}
                                {...register(title)}
            /> {children}
            </label>
        )
    }
}