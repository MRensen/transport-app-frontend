import styles from "./CustomerHome.module.css";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import HeaderPlain from "../../../components/Header/Header";

export default function CustomerHome() {
    const {data} = useContext(AuthContext);
    return (
        <>
            <HeaderPlain/>
            <main className={styles.main}>
                <h1 className={styles.title}>{data.name}</h1>
                <div className={styles['button-container']}>
                <div className={styles['button']}>
                    <button type="button" id="nieuwe order" onClick={()=>{console.log("mijnorders")}}>
                        <img src="../../../resources/mijnOrdersLogo.png"/>
                    </button>
                </div>
                </div>
            </main>
        </>
    )
}