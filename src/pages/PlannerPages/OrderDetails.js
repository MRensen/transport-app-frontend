import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
export default function OrderDetails({checkedMenu}){
    const [orderData, setOrderData] = useState({});
    useEffect(()=>{
        async function getOrder(){
            try{
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/orders/3001`
                })
                console.log(result)
            } catch (e) {console.log(e.error)}
        }
        getOrder()
    },[checkedMenu])
    return(
        <p>orderdetails</p>
    )
}