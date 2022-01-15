import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import OrderContainer from "../../components/OrderContainer/OrderContainer";
export default function OrderDetails({checkedMenu}){
    // const [orderData, setOrderData] = useState({});
    // useEffect(()=>{
    //     async function getOrder(){
    //         try{
    //             const result = await axios({
    //                 method: "get",
    //                 url: `http://localhost:8080/orders/${checkedMenu}`
    //             })
    //             console.log(result)
    //         } catch (e) {console.log(e.error)}
    //     }
    //     getOrder()
    // },[checkedMenu])
    return(
        <OrderContainer endpoint={checkedMenu} noButton />
    )
}