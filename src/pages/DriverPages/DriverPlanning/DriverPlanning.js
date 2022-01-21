import styles from "./DriverPlanning.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {RouteContext} from "../../../components/Context/RouteContextProvider";
import OrderContainer from "../../../components/OrderContainer/OrderContainer";
import {useHistory} from "react-router-dom";

export default function DriverPlanning(){
    const[orderData, setOrderData] = useState({})
    const[endpoint, setEndpoint] = useState("");
    const {routeData} = useContext(RouteContext);
    const history = useHistory();

    // useEffect(()=>{
    //     async function getRouteData(){
    //         try {
    //             const result = await axios.get(`http://localhost:8080/orders/${endpoint}`)
    //             setOrderData(result);
    //         } catch (e){
    //             console.log("error fetching data: " + e.error);
    //         }
    //     }
    //     getRouteData();
    // },[endpoint])
    function leftFunction(){
        console.log("home")
        history.push("/driver/home")
    };
    return(
        <>
            <HeaderHomeSave
                titleName="planning"
                leftFunction={leftFunction}
                disableSave = {true}
                />
            <main className={styles.name}>
                {console.log(routeData)}
                <ul>
                    {routeData.orders && routeData.orders.map((order)=>{
                        return <OrderContainer key={order.id} endpoint={order.id} />

                    })}
                </ul>
            </main>
        </>
    )
}