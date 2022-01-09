import styles from "./ModalPassword.module.css";
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContextProvider";
import {useForm} from "react-hook-form";

export default function ModalPassword({setPassword, show, onClose, currentPassword}) {
    const {data} = useContext(AuthContext);
    const {register, handleSubmit, getValues} = useForm()

    if(!show){
        return null;
    }

    function handlePassword(form){
        console.log(currentPassword)
        if(form.old === currentPassword){
            if(form.new === form.again){
                setPassword(form.new);
            } else {window.alert("new passwords do not match")}
        } else {window.alert("current password is not correct")}
        onClose();
    }

    return (
        <div className={styles.modal} onClick={onClose}>
            <main className={styles.main} onClick={e => e.stopPropagation()}>
                <header>
                    <h3 className={styles.h3}> change password</h3>
                </header>
                <article className={styles.article}>
                    <form onSubmit={handleSubmit(handlePassword)}>
                        <label htmlFor="old" className={styles.label}> enter current password:
                            <input type="password"
                                    id="old"
                                {...register("old")}
                            />
                        </label>
                        <label htmlFor="new" className={styles.label}> enter new password:
                            <input
                                type="password"
                                id="new"
                                {...register("new")}
                            />
                        </label>
                        <label htmlFor="again" className={styles.label}> repeat new password:
                            <input
                                type="password"
                                id="again"
                                {...register("again")}
                            />
                        </label>

                    </form>

                </article>
                <footer className={styles.footer}>
                    <button className={styles.button}
                            onClick={handleSubmit(handlePassword)}
                    >Close</button>
                </footer>
            </main>
        </div>
    )
}