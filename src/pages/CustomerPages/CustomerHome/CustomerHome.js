import styles from "./CustomerHome.module.css";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import HeaderPlain from "../../../components/Header/Header";
import ordersLogo from "../../../resources/mijnOrdersLogo.png";
import nieuwOrderLogo from "../../../resources/nieuweOrderLogo.png";
import accountLogo from "../../../resources/mijnAccountLogo.png";
import {useHistory} from "react-router-dom";
import CustomerHomeButton from "../../../components/CustomerHomeButton/CustomerHomeButton";

export default function CustomerHome() {
    const {data} = useContext(AuthContext);
    const history = useHistory();
    console.log(data)
    return (
        <>
            <HeaderPlain/>
            <main className={styles.main}>
                <h1 className={styles.title}>{data.name}</h1>
                <div className={styles['button-container']}>
                    <CustomerHomeButton path="/customer/account" name="mijn account" logo={accountLogo}/>
                    <CustomerHomeButton path="/customer/new" name="nieuwe order" logo={nieuwOrderLogo}/>
                    <CustomerHomeButton path="customer/orders" name="mijn orders" logo={ordersLogo}/>
                    {/*<div className={styles.button}>*/}
                    {/*    <input type="image" src={nieuwOrderLogo} id="nieuwe order" onClick={() => {*/}
                    {/*        console.log("nieuwe order");*/}
                    {/*        history.push("/customer/new");*/}
                    {/*    }}/>*/}
                    {/*    <label htmlFor="nieuwe order" className={styles.label}> nieuwe order </label>*/}
                    {/*</div>*/}
                    {/*<div className={styles.button}>*/}
                    {/*    <input type="image" src={ordersLogo} id="mijn orders" onClick={() => {*/}
                    {/*        console.log("mijn orders");*/}
                    {/*        history.push("/customer/orders");*/}
                    {/*    }}/>*/}
                    {/*    <label htmlFor="mijn orders" className={styles.label}> mijn orders </label>*/}
                    {/*</div>*/}
                    {/*<div className={styles.button}>*/}
                    {/*    <input type="image" src={accountLogo} id="mijn account" onClick={() => {*/}
                    {/*        console.log("mijn account");*/}
                    {/*        history.push("/customer/account");*/}
                    {/*    }}/>*/}
                    {/*    <label htmlFor="mijn account" className={styles.label}> mijn account</label>*/}
                    {/*</div>*/}

                </div>
            </main>
        </>
    )
}