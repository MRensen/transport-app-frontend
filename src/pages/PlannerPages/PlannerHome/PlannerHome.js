import styles from "./PlannerHome.module.css";
import HeaderPlain from "../../../components/Header/Header";
import {useState} from "react";
import PlannerNavItem from "../../../components/PlannerNavItem/PlannerNavItem";

export default function PlannerHome() {
    const [checked, setChecked] = useState("chauffeurs")
    return (
        <>
            <HeaderPlain/>
            <div className={styles.main}>
                <nav className={styles.nav}>
                    <header className={styles.header}>
                        navigatie
                    </header>
                    <PlannerNavItem title="chauffeurs" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="orders" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="routes" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="instellingen" checked={checked} setChecked={setChecked}/>

                    {/*<input type="radio" className={styles.radio} name="group" id="id1"*/}
                    {/*       checked={checked === "chauffeurs"} onChange={() => {*/}
                    {/*    setChecked("chauffeurs")*/}
                    {/*}}/>*/}
                    {/*<label htmlFor="id1" className={styles.label} > chauffeurs</label>*/}

                    {/*<input type="radio" className={styles.radio} name="group" id="id2" checked={checked === "orders"}*/}
                    {/*       onChange={() => {*/}
                    {/*           setChecked("orders")*/}
                    {/*       }}/>*/}
                    {/*<label htmlFor="id2" className={styles.label}> orders</label>*/}

                    {/*<input type="radio" className={styles.radio} name="group" id="id3" checked={checked === "routes"}*/}
                    {/*       onChange={() => {*/}
                    {/*           setChecked("routes")*/}
                    {/*       }}/>*/}
                    {/*<label htmlFor="id3" className={styles.label}> routes</label>*/}

                    {/*<input type="radio" className={styles.radio} name="group" id="id4" checked={checked === "instellingen"}*/}
                    {/*       onChange={() => {*/}
                    {/*           setChecked("instellingen")*/}
                    {/*       }}/>*/}
                    {/*<label htmlFor="id4" className={styles.label}> instellingen</label>*/}
                </nav>
                <main>

                </main>
            </div>
        </>
    )
}