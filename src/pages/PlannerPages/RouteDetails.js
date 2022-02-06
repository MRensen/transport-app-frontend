import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

export default function RouteDetails({checkedMenu, setCheckedMenu}) {
    const [routeData, setRouteDate] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [showOptionsScreen, setShowOptionsScreen] = useState(false);
    const [drivers, setDrivers] = useState(null);
    const [orders, setOrders] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState("");
    const [selectedOrder, setSelectedOrder] = useState("");

    useEffect(() => {
        async function getRouteData() {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/routes/${checkedMenu}`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                setRouteDate(result.data)
            } catch (e) {
                console.error(e.message)
            }
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/orders/route/${checkedMenu}`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                setOrderData(result.data)
            } catch (e) {
                console.error(e.message)
            }

        }

        getRouteData()

        return function cleanUp() {
            //setCheckedMenu(null);
            setOrderData(null);
            setRouteDate(null);
        }
    }, [checkedMenu])


    async function driverFunction() {
        if (routeData) {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/drivers`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })

                setDrivers(result.data);
            } catch (e) {
                console.error(e.message)
            }
            setShowOptionsScreen("drivers");
        }
    }

    async function addDriverFunction() {
        setShowOptionsScreen(false)
        await axios({
            method: "patch",
            url: `http://localhost:8080/routes/${checkedMenu}`,
            data: {driver: {id: selectedDriver}},
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
            }
        })
        setCheckedMenu(null);

    }


    async function deleteFunction() {
        orderData.filter((order)=>( !selectedOrders.includes(order)))
        const data = selectedOrders
        try{
            await axios({
                method: "delete",
                url: `http://localhost:8080/routes/${checkedMenu}/orders`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            async function setOrder(order) {
                await axios({
                    method: "patch",
                    url: `http://localhost:8080/orders/${order.id}`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    },
                    data: {orderStatus: "processing"}
                })
            }
            selectedOrders.forEach(setOrder);

        } catch (e){console.error(e.message)}
        setCheckedMenu(null);
    }

    async function orderFunction() {
        if(checkedMenu) {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/orders`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
                setOrders(result.data.filter((order) => {
                    return (order.route === null) &&(order.orderStatus !== "declined")
                }));
                console.log(result.data.filter((order) => {
                    return order.route === null
                }));
            } catch (e) {
                console.error(e.message)
            }
            setShowOptionsScreen("orders");
        }
    }

    async function addOrderFunction() {
        routeData.orders.push({id: parseInt(selectedOrder)})
        const data =  {orders: routeData.orders};
        console.log(routeData.orders)
        try {
            await axios({
                method: "patch",
                url: `http://localhost:8080/routes/${checkedMenu}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                },
                data: data
            })
            await axios({
                method: "patch",
                url: `http://localhost:8080/orders/${parseInt(selectedOrder)}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                },
                data: {orderStatus: "in transport"}
            })
        } catch(e){console.error(e.message)}
        setCheckedMenu(null);
        setShowOptionsScreen(false)
    }



    function checkboxChangeHandler(event) {
        const checked = event.target.checked;
        const orderId = event.target.id
        if (checked) {
            //only filters out one element
            const filteredArray = orderData.filter((order) => {
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

    if (!showOptionsScreen) {
        return (
            <>
                <header className={styles.options}>
                    <button type="button" onClick={orderFunction}>add order</button>
                    <button type="button" onClick={deleteFunction}>delete selected orders</button>
                    <button type="button" onClick={driverFunction}>assign driver</button>
                </header>
                <main className={styles.content}>
                    {(routeData && checkedMenu) ?
                        <>
                            <table>
                                <thead>
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
                                </thead>
                                <tbody>
                                {orderData && orderData.map((order) => {
                                    return <tr key={order.id}>
                                        <td><input type="checkbox" id={order.id} onChange={checkboxChangeHandler}/></td>
                                        <td>{order.id}</td>
                                        <td><p>{order.deliveryPostal + " " + order.deliveryCity}<br/>
                                            {order.deliveryStreet + " " + order.deliveryHouseNumber}</p></td>
                                        <td> {order.loadingPostal + " " + order.loadingCity}<br/>
                                            {order.loadingStreet + " " + order.loadingHouseNumber}</td>
                                        <td>{order.isPickup? "laden" : "lossen"}</td>
                                        <td>{order.orderStatus}</td>
                                        <td>{order.deliveryDate}</td>
                                        <td>{order.loadingDate}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>

                        </>
                        :
                        <p>Please select a route </p>
                    }
                </main>
            </>
        )
    } else {
        if (showOptionsScreen === "drivers") {
            return (
                <main className={styles.content}>
                    <select value={selectedDriver} onChange={(e) => {
                        setSelectedDriver(e.target.value)
                    }}>
                        <option disabled value="">---</option>
                        {drivers && drivers.map((driver) => {
                            return <option key={driver.id} value={driver.id}>{driver.id}</option>
                        })}
                    </select>
                    <button type="button" onClick={addDriverFunction}>Add
                    </button>
                </main>
            )
        }
        if (showOptionsScreen === "orders") {
            return (
                <main className={styles.content}>
                    <select value={selectedOrder} onChange={(e) => {
                        setSelectedOrder(e.target.value)
                    }}>
                        <option disabled value="">---</option>
                        {orders && orders.map((order) => {
                            return <option key={order.id} value={order.id}>{order.id}</option>
                        })}
                    </select>
                    <button type="button" onClick={addOrderFunction}>Add
                    </button>
                </main>)
        }
    }
}