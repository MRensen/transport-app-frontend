import styles from "./CustomerOrder.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import axios from "axios";

export default function CustomerOrders() {
    const {data} = useContext(AuthContext);
    const customerId = data.customer.id;
    const history = useHistory();
    const [customerOrders, setCustomerOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);


    useEffect(() => {
        async function getOrders() {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/customers/${customerId}/orders`
                    //TODO axios headers
                })
                console.log(result.data)
                setCustomerOrders(result.data);
            } catch (e) {
                console.error(e.message)
            }
        }

        getOrders()
    }, [selectedOrders])


    function homeFunction() {
        history.push("/customer/home")
    }

    async function deleteOrder(order) {
        try {
            const result = await axios({
                method: "delete",
                url: `http://localhost:8080/orders/${order.id}`
                //TODO axios headers
            })
        } catch (e) {
            console.error(e.message)
        }
    }

    function deleteOrders() {
        selectedOrders.map((order)=>{
            deleteOrder(order);
        })
        setSelectedOrders([]);
    }

    function addOrder() {
        history.push("/customer/new")

    }

    function checkboxChangeHandler(event) {
        const checked = event.target.checked;
        const orderId = event.target.id
        if (checked) {
            //only filters out one element
            const filteredArray = customerOrders.filter((order) => {
                return order.id === parseInt(orderId)
            })
            setSelectedOrders(filteredArray.concat(selectedOrders));
        } else {
            const filteredArray = selectedOrders.filter((order) => {
                return order.id !== parseInt(orderId)
            })
            setSelectedOrders(filteredArray);
        }
    }

    return (
        <>
            <HeaderHomeSave disableSave={true}
                            leftFunction={homeFunction}
                            titleName="Mijn orders"/>
            <main className={styles.main}>
                <aside className={styles.left}>
                    <button className={styles.button} onClick={addOrder}>Order Toevoegen</button>
                    <button className={styles.button} onClick={deleteOrders}>Selectie Verwijderen</button>
                </aside>
                <aside className={styles.right}>
                    <table>
                        <thead>
                        <tr>
                            <th>select</th>
                            <th>id</th>
                            <th>laad adres</th>
                            <th>los adres</th>
                            <th>laden/ lossen</th>
                            <th> status</th>
                            <th> type</th>
                            <th> beschrijving</th>
                            <th> route</th>
                            <th> aantal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customerOrders && customerOrders.map((order) => {
                            return <tr key={order.id}>
                                <td><input type={'checkbox'} id={order.id} onChange={checkboxChangeHandler}/></td>
                                <td>{order.id}</td>
                                <td><p>{order.loadingName}<br/>
                                    {order.deliveryPostal + " " + order.deliveryCity}<br/>
                                    {order.deliveryStreet + " " + order.deliveryHouseNumber}</p>
                                </td>
                                <td><p>{order.deliveryName}<br/>
                                    {order.loadingPostal + " " + order.loadingCity}<br/>
                                    {order.loadingStreet + " " + order.loadingHouseNumber}</p>
                                </td>
                                <td>{order.isPickup ? "laden" : "lossen"}</td>
                                <td>{order.orderStatus}</td>
                                <td>{order.type}</td>
                                <td>{order.description}</td>
                                <td>{order.route ? order.route.id : "nope"}</td>
                                <td>{order.pallets.length}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </aside>
            </main>
        </>
    )
}