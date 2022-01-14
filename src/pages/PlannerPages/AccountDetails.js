import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect} from "react";
export default function AccountDetails({setMenuDisplay}){
    useEffect(()=>{
        function onMount() {
            {
                setMenuDisplay(false)
            }
        }
        onMount();
        function onDismount(){
            setMenuDisplay(false)
        }
    },[])

    return(
        <p>instellingendetails</p>
    )
}