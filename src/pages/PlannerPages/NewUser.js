import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect} from "react";
import DriverDetails from "./DriverDetails";

export default function NewUser({setNewDisplay, checkedMenu}) {

    useEffect(() => {
        function onMount() {
            {
                setNewDisplay(false);
                console.log("mounting")
            }
        }

        onMount();
        return function onDismount() {
            setNewDisplay(true);
            console.log("unmounting");
        }
    }, [])

    console.log(checkedMenu);

    if (checkedMenu === "chauffeur") {
        return (
            <DriverDetails create={true} checkedMenu={checkedMenu}/>
        )
    }
    if (checkedMenu === "order") {
        return (
            <p>nieuwe order</p>
        )
    }
    if (checkedMenu === "route") {
        return (
            <p>nieuwe route</p>
        )
    }
    return <p> Welk nieuw item wil je maken? ----></p>
}