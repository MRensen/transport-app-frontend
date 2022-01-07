import styles from "./DriverPlanning.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {RouteContext} from "../../../components/Context/RouteContextProvider";

export default function DriverPlanning(){
    const[routeData, setRouteData] = useState({});
    const {data} = useContext(RouteContext);
    useEffect(()=>{
        async function getRouteData(){
            try {
                const result = await axios.get("http://localhost:8080/")
            } catch (e){

            }
        }
    },[])
    return(
        <>
            <HeaderHomeSave
                titleName="planning"
                leftFunction={console.log("home")}
                disableSave = {true}
                />
            <main className={styles.name}>
                <article className={styles.article}>

                </article>
            </main>
        </>
    )
}