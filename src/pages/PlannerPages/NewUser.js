import {useEffect} from "react";
import DriverDetails from "./DriverDetails";
import AccountDetails from "./AccountDetails";
import NewOrder from "./NewOrder";
import NewRoute from "./NewRoute";
import NewCustomer from "./NewCustomer";

export default function NewUser({setNewDisplay, checkedMenu}) {

    useEffect(() => {
        function onMount() {
            setNewDisplay(false);
            console.log("mounting")
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
            <NewOrder checkedMenu={checkedMenu}/>

        )
    }
    if (checkedMenu === "route") {
        return (
            <NewRoute/>
        )
    }
    if (checkedMenu === "planner") {
        return (
            <AccountDetails create={true} checkedMenu={checkedMenu}/>
        )
    }
    if (checkedMenu === "klant") {
        return (
            <NewCustomer/>
        )
    }
    return <p> Welk nieuw item wil je maken? ----></p>
}