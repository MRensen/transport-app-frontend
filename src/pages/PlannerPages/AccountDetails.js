import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect} from "react";
export default function AccountDetails({setMenuDisplay}){
    useEffect(()=>{
        function onMount() {
            {
                setMenuDisplay(false);
                console.log("mounting")
            }
        }
        onMount();
        return function onDismount(){
            setMenuDisplay(true);
            console.log("unmounting");
        }
    },[])

    return(
        <p>instellingendetails</p>
    )
}