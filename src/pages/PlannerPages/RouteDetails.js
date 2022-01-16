import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

export default function RouteDetails({checkedMenu, setCheckedMenu}) {
    const [routeData, setRouteDate] = useState(null)
    const [orderData, setOrderData] = useState(null)

    useEffect(()=>{
        async function getRouteData(){
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/routes/${checkedMenu}`
                })
                setRouteDate(result.data)
                console.log(result.data)
            }catch(e){console.error(e.message)}
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/orders/route/${checkedMenu}`
                })
                setOrderData(result.data)
                console.log(result.data)
            }catch(e){console.error(e.message)}
        }
        getRouteData()
        function unmount(){
            setCheckedMenu(null);
        }
    },[checkedMenu])

    async function getOrder(){
        try {
            const result = await axios({
                method: "get",
                url: `http://localhost:8080/orders/route/${checkedMenu}`
            })
            setOrderData(result.data)
            console.log(result.data)
        }catch(e){console.error(e.message)}
    }

    function addFunction(){

    }

    function deleteFunction(){

    }

    function moveUpFunction(){

    }

    function moveDownFunction(){

    }

    function checkboxChangeHandler(event){
        console.log(event.target.id)
    }

    return (
        <>
            <header className={styles.options}>
                <button type="button" onClick={addFunction}>add</button>
                <button type="button" onClick={deleteFunction}>delete</button>
                <button type="button" onClick={moveUpFunction}>move up</button>
                <button type="button" onClick={moveDownFunction}>move down</button>
            </header>
            <main className={styles.content}>
                {routeData ?
                    <>
                        <table>
                            <tr>
                                <th> select</th>
                                <th> id</th>
                                <th> laad adres</th>
                                <th> los adres</th>
                                <th> laden/lossen</th>
                                <th> status</th>
                                <th> los datum</th>
                                <th>laad datum</th>
                            </tr>
                            {/*{routeData.orders && routeData.orders.forEach((orderId)=>{console.log(orderId);getOrder(orderId.id)})}*/}
                            {/*    .map((order)=>{*/}
                            {/*    if(order){*/}
                            {/*        console.log(order)*/}
                            {orderData && orderData.map((order)=> {
                                console.log(orderData)
                                return <tr>
                                    <td><input type="checkbox" id={order.id} onChange={checkboxChangeHandler}/></td>
                                    <td>{order.id}</td>
                                    <td><p>{order.deliveryPostal + " " + order.deliveryCity}<br/>
                                        {order.deliveryStreet + " " + order.deliveryHouseNumber}</p></td>
                                    <td> {order.loadingPostal + " " + order.loadingCity}<br/>
                                        {order.loadingStreet + " " + order.loadingHouseNumber}</td>
                                    <td>{order.isPickup}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.loadingDate}</td>
                                </tr>
                            })}
                            {/*    } else {console.log(orderData)}*/}
                            {/*})}*/}
                        </table>

                    </>
                    :
                    <p>Please select a route </p>
                }
            </main>
        </>
    )
}