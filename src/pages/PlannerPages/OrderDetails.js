import styles from "./PlannerHome/PlannerHome.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import OrderContainer from "../../components/OrderContainer/OrderContainer";
import {useForm} from "react-hook-form";

export default function OrderDetails({checkedMenu, setOrders, orders, setCheckedMenu, create}) {
    const [orderData, setOrderData] = useState(null);
    const [selectRoute, setSelectRoute] = useState(false)
    const [routes, setRoutes] = useState(null)
    const [selectedRoute, setSelectedRoute] = useState("")
    const {register, handleSbmit, formState: {errors}, reset} = useForm()

    useEffect(() => {
        async function getOrder() {
            if (!create) {
                try {
                    const result = await axios({
                        method: 'get',
                        url: `http://localhost:8080/orders/${checkedMenu}`,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                        }
                    })
                    setOrderData(result.data);
                    reset({});
                } catch (e) {
                    console.log(e.message)
                    return null;
                }
            }
        }



        getOrder();
    }, [checkedMenu])

    function routeFunction() {
        if (!orderData.route) {
            async function getRoutes() {
                try {
                    const result = await axios({
                        method: "get",
                        url: "http://localhost:8080/routes",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                        }
                    })
                    console.log(result.data)
                    setRoutes(result.data);
                } catch (e) {
                    console.error(e.message)
                }
            }

            getRoutes();
            setSelectRoute(true)
        } else {
            window.alert("Order already has a route")
        }
    }


    async function addRouteFunction() {
        setSelectRoute(false);
        try {
            console.log("selectroute")
            console.log(selectedRoute)
            await axios({
                method: "patch",
                url: `http://localhost:8080/orders/${orderData.id}`,
                data: {route: {id: selectedRoute},
                        orderStatus: "in transport"},
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
        } catch (e) {
            console.error(e.message)
        }
    }

    async function afkeurFunction() {
        if (orderData.orderStatus === "processing") {
            try {
                const result = await axios({
                    method: "patch",
                    url: `http://localhost:8080/orders/${orderData.id}`,
                    data: {orderStatus: "declined"},
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                    }
                })
            } catch (e) {
                console.error(e.message)
            }
            setOrderData(null);
            setCheckedMenu(null);
            setOrders(null);
        } else {
            console.log("should not be able to reach here");
            window.alert("Only orders with status \"processing\" can be declined. (should not be able to reach this)");
        }
    }

    async function afkeurResetFunction() {
        try {
            await axios({
                method: "patch",
                url: `http://localhost:8080/orders/${orderData.id}`,
                data: {orderStatus: "processing"},
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            setOrderData(null);
            setCheckedMenu(null);
            setOrders(null);
        } catch (e) {
            console.error(e.message)
        }
    }

    async function voltooidFunction() {
        try {
            const result = await axios({
                method: "get",
                url: `http://localhost:8080/orders/status/delivered`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            setOrders(result.data);
            setOrderData(null)
            setCheckedMenu(null);
        } catch (e) {
            console.error(e.message)
        }
    }

    async function openFunction() {
        try {
            const result = await axios({
                method: "get",
                url: `http://localhost:8080/orders/status/open`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            setOrders(result.data);
            setOrderData(null)
            setCheckedMenu(null);
        } catch (e) {
            console.error(e.message)
        }
    }

    async function allFunction() {
        try {
            const result = await axios({
                method: "get",
                url: `http://localhost:8080/orders`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }
            })
            setOrders(result.data);
            setOrderData(null)
            setCheckedMenu(null);
        } catch (e) {
            console.error(e.message)
        }
    }

    if (!selectRoute) {
        return (
            <>
                {/*{console.log(orderData.route)}*/}
                <header className={styles.options}>
                    <button type="button"
                            disabled={!orderData || (orderData.orderStatus !== "processing") || orderData.route}
                            onClick={routeFunction}>route
                    </button>
                    {orderData && orderData.orderStatus === "declined" ?
                        <button type="button" onClick={afkeurResetFunction}>cancel afkeur</button>
                        :
                        <button type="button" disabled={!orderData || (orderData.orderStatus !== "processing")}
                                onClick={afkeurFunction}>afkeur</button>
                    }
                    <button type="button" onClick={voltooidFunction}>show voltooide orders</button>
                    <button type="button" onClick={openFunction}>show open orders</button>
                    <button type="button" onClick={allFunction}>show alle orders</button>
                </header>
                <main key={checkedMenu} className={styles.content}>
                    {orderData ?
                        <>
                            <main className={styles['order-main']}>
                                <p> {"id: " + orderData.id}<br/>
                                    <strong>lossen:</strong> {orderData.deliveryName} <br/> <br/>
                                    {orderData.deliveryPostal + " " + orderData.deliveryCity}<br/>
                                    {orderData.deliveryStreet + " " + orderData.deliveryHouseNumber}<br/><br/>
                                    <strong>{orderData.isPickup ? "laden: " : "afzender: "}</strong>{orderData.loadingName}<br/>
                                    {orderData.loadingPostal + " " + orderData.loadingCity}<br/>
                                    {orderData.loadingStreet + " " + orderData.loadingHouseNumber}<br/><br/>
                                    type: {orderData.type}<br/>
                                    aantal: {orderData.pallets && orderData.pallets.length}<br/>
                                    beschrijving: {orderData.pallets && orderData.pallets.map((p) => {
                                        return "-|" + p.load + "|-"
                                    })}<br/><br/>
                                    opmerkingen: {orderData.description}
                                </p>
                            </main>
                        </>
                        :
                        <p>Please select an order</p>
                    }
                </main>
                }
            </>
        )
    } else {
        return (
            <main className={styles.content}>
                {routes &&
                <select value={selectedRoute} onChange={(e) => {
                    setSelectedRoute(e.target.value)
                }}>
                    <option disabled value="">---</option>
                    {routes.map((route) => {
                        return <option key={route.id} value={route.id}>{route.id}</option>
                    })}
                </select>
                }
                <button type="button" onClick={addRouteFunction}>add to route</button>
            </main>
        )
    }

}