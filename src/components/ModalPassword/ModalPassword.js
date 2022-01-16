import styles from "./ModalPassword.module.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Context/AuthContextProvider";
import {useForm} from "react-hook-form";
import axios from "axios";

export default function ModalPassword({ show, onClose, id}) {
    const {data} = useContext(AuthContext);
    const {register, handleSubmit, getValues} = useForm()
    const [password, setPassword] = useState("")

    useEffect(()=>{
        if(show) {
            async function getPassword() {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/drivers/${id}/password`
                })
                setPassword(result.data)
                console.log(`just set password: ${result.data}`)
            }
            getPassword()
        }
    },[show])

     useEffect(()=>{
        async function changePassword(){
            try {
                await axios({
                    method: "patch",
                    url: `http://localhost:8080/drivers/${id}`,
                    data: {password: password}
                })
            }catch (e){
                console.log(e.message)}
        }
        changePassword();
    },[password])

    async function compareCurrentPassword(old){
        console.log(`requesting old: ${old}`)
        try {
            const result = await axios({
                url: `http://localhost:8080/authenticate/compare`,
                method: "get",
                header: {'Content-type': 'application/json'},
                data: {password: password, oldPassword: old}
            })
            console.log(result.data)
            return result.data;
        }catch(e){
            console.log(e.message)}
    }

    async function encryptPassword(newPass){
        try {
            const result = await axios({
                url: `http://localhost:8080/authenticate/encrypt`,
                method: "get",
                data: {password: newPass}
            })
            return result.data;
        }catch(e){console.log(e.message())}
    }

    async function handlePassword(form){
        console.log(`modal password old: ${await compareCurrentPassword(form.old)}`)
        if(await compareCurrentPassword(form.old)){
            if(form.new === form.again){
                setPassword(await encryptPassword);
            } else {window.alert("new passwords do not match")}
        } else {window.alert("current password is not correct")}
        onClose();
    }


    if(!show){
        return null;
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
                    >Save</button>
                </footer>
            </main>
        </div>
    )
}