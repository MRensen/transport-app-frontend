import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect} from "react";
import DriverDetails from "./DriverDetails";
import AccountDetails from "./AccountDetails";
import LabeledInput from "../../components/LabeledInput/LabeledInput";
import {useForm} from "react-hook-form";
import NewOrder from "./NewOrder";
import NewRoute from "./NewRoute";
import NewCustomer from "./NewCustomer";

export default function NewUser({setNewDisplay, checkedMenu}) {
    const{register} = useForm()

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
            // <p>nieuwe planner</p>
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