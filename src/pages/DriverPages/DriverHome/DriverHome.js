import HeaderPlain from "../../../components/Header/Header";
import {useContext} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import styles from "./DriverHome.module.css";
import DriverHomeButton from "../../../components/DriverHomeButton/DriverHomeButton";
import {RouteContext} from "../../../components/Context/RouteContextProvider";

export default function DriverHome(){
    const {data} = useContext(AuthContext);
    console.log(data)
    const {hasroute: hasRoute, routeData} = useContext(RouteContext);
    //const hasroute = true;
    console.log(routeData)



    return (
    <div className={styles.container}>
        <HeaderPlain/>
        <header className={styles.header}>
            <h2 className={styles.h2}><p>routenummer: </p><p>{hasRoute && routeData.id}</p></h2>
            <h1 className={styles.h1}>{data.username}</h1>
            <h2 className={styles.h2}><p>vrachtwagen: </p><p>{hasRoute && routeData.truck}</p></h2>
        </header>
        <ul className={styles.ul}>
            <li className={styles.li}><DriverHomeButton text="start route"/> </li>
            {/*<li className={styles.li}><DriverHomeButton text="lossen" disabled={!hasRoute}/></li>*/}
            <li className={styles.li}><DriverHomeButton text="planning" disabled={!hasRoute}/></li>
            <li className={styles.li}><DriverHomeButton text="stop route" disabled={!hasRoute}/></li>
            {/*<li className={styles.li}><DriverHomeButton text="laden" disabled={!hasRoute}/></li>*/}
            <li className={styles.li}><DriverHomeButton text="account"/></li>
        </ul>
    </div>
    )
}