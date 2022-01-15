import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect} from "react";
export default function NewUser({setNewDisplay, checkedMenu}){
    useEffect(()=>{
        function onMount() {
            {
                setNewDisplay(false);
                console.log("mounting")
            }
        }
        onMount();
        return function onDismount(){
            setNewDisplay(true);
            console.log("unmounting");
        }
    },[])
    return(
        <p>new item</p>
    )
}