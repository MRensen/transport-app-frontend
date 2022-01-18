import styles from "./CustomerHome.module.css";
import {useContext} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import HeaderPlain from "../../../components/Header/Header";
import ordersLogo from "../../../resources/mijnOrdersLogo.png";
import nieuwOrderLogo from "../../../resources/nieuweOrderLogo.png";
import accountLogo from "../../../resources/mijnAccountLogo.png";
import CustomerHomeButton from "../../../components/CustomerHomeButton/CustomerHomeButton";

export default function CustomerHome() {
    const {data} = useContext(AuthContext);
    console.log(data)
    return (
        <>
            <HeaderPlain/>
            <main className={styles.main}>
                <h1 className={styles.title}>{data.name}</h1>
                <div className={styles['button-container']}>
                    <CustomerHomeButton path="/customer/account" name="mijn account" logo={accountLogo}/>
                    <CustomerHomeButton path="/customer/new" name="nieuwe order" logo={nieuwOrderLogo}/>
                    <CustomerHomeButton path="/customer/orders" name="mijn orders" logo={ordersLogo}/>
                </div>
            </main>
        </>
    )
}