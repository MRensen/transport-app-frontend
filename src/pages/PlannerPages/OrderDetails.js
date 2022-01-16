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
                        url: `http://localhost:8080/orders/${checkedMenu}`
                    })
                    setOrderData(result.data);
                    reset({});
                } catch (e) {
                    console.log(e.message)
                    return null;
                }
            }
        }

        function unmount() {
            setOrderData(null);
            checkedMenu = null;
            reset();
        }

        getOrder();
    }, [checkedMenu])

    function routeFunction() {
        if (!orderData.route) {
            async function getRoutes() {
                try {
                    const result = await axios({
                        method: "get",
                        url: "http://localhost:8080/routes"
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

    async function getRoute(){
        await axios({
            method: "get",
            url: `http://localhost:8080/routes/${selectedRoute}`,
        })
    }

    async function addRouteFunction() {
        setSelectRoute(false);
        try {
            console.log("selectroute")
            console.log(selectedRoute)
            await axios({
                method: "patch",
                url: `http://localhost:8080/orders/${orderData.id}`,
                data: {route: {id: selectedRoute}}
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
                    data: {orderStatus: "declined"}
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
                data: {orderStatus: "processing"}
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
                                <p><strong>lossen:</strong> {orderData.deliveryName} <br/> <br/>
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