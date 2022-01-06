import HeaderPlain from "../../../components/Header/HeaderPlain";
import {useContext} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import styles from "./DriverHome.module.css";
import DriverHomeButton from "../../../components/DriverHomeButton/DriverHomeButton";
import {RitContext} from "../../../components/Context/RitContextProvider";

export default function DriverHome(){
    const {data} = useContext(AuthContext);
    console.log(data)
    const {hasRit} = useContext(RitContext);
    //const hasRit = true;
    console.log("drivertest")
    return (
    <div className={styles.container}>
        <HeaderPlain/>
        <header className={styles.header}>
            <h2>ritnummer: </h2>
            <h1 className={styles.h1}>{data.username}</h1>
            <h2>vrachtwagen: </h2>
        </header>
        <ul className={styles.ul}>
            <li className={styles.li}><DriverHomeButton text="start rit"/> </li>
            <li className={styles.li}><DriverHomeButton text="lossen" disabled={!hasRit}/></li>
            <li className={styles.li}><DriverHomeButton text="planning" disabled={!hasRit}/></li>
            <li className={styles.li}><DriverHomeButton text="stop rit" disabled={!hasRit}/></li>
            <li className={styles.li}><DriverHomeButton text="laden" disabled={!hasRit}/></li>
            <li className={styles.li}><DriverHomeButton text="account"/></li>
        </ul>
    </div>
    )
}