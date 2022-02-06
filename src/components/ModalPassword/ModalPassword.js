import styles from "./ModalPassword.module.css";
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContextProvider";
import {useForm} from "react-hook-form";
import axios from "axios";

export default function ModalPassword({ show, onClose, id: username}) {
    const { loggedIn} = useContext(AuthContext);
    const {register, handleSubmit} = useForm()

        async function changePassword(password){
            console.log(username)
            try {
                await axios({
                    method: "patch",
                    url: `http://localhost:8080/user/${username}/password`,
                    data: {password: password},
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                console.log("password changed")
            }catch (e){
                console.log(e.message)}
        }


    async function handlePassword(form){
        if(loggedIn){
            if(form.new === form.again){
                await changePassword(form.new);
            } else {window.alert("new passwords do not match")}
        } else {window.alert("current password is not correct")}
        onClose();
    }


    if(!show){
        return null;
    }
    if(true){
        return(
            <div className={styles.modal} onClick={onClose}>
                <main className={styles.main} onClick={e => e.stopPropagation()}>
                    <p>Soon to be implemented</p>
                </main>
            </div>
        )
    } else {
        return (
            <div className={styles.modal} onClick={onClose}>
                <main className={styles.main} onClick={e => e.stopPropagation()}>
                    <header>
                        <h3 className={styles.h3}> change password</h3>
                    </header>
                    <article className={styles.article}>
                        <form onSubmit={handleSubmit(handlePassword)}>
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
                        >Save
                        </button>
                    </footer>
                </main>
            </div>
        )
    }
}