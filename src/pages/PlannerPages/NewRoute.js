import styles from "./PlannerHome/PlannerHome.module.css";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../components/Context/AuthContextProvider";

export default function NewRoute() {
    const {register, watch, handleSubmit, reset} = useForm();
    const watchOrder = watch("order", "");
    const [orders, setOrders] = useState(null);
    const [drivers, setDrivers] = useState(null);
    const {data} = useContext(AuthContext);

    useEffect(() => {
        async function getOrders() {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/orders`
                    //TODO axios headers
                })
                console.log(result.data)
                setOrders(result.data)
            } catch (e) {
                console.error(e.message)
            }
        }

        async function getDrivers() {
            try {
                const result = await axios({
                    method: "get",
                    url: `http://localhost:8080/drivers`
                    //TODO axios headers
                })
                console.log(result.data)
                setDrivers(result.data)
            } catch (e) {
                console.error(e.message)
            }
        }

        getDrivers();
        getOrders();
    }, [])

    async function formSubmit(input) {
        const toSend = {
            planner: {id: parseInt(data.planner.id)},
            truck: null,
            driver: null,
            orders: []
        }
        if (input.truck !== "") {
            toSend.truck = input.truck
        }
        if (input.driver !== "") {
            toSend.driver = {id: input.driver}
        }
        if (input.order !== "") {
            toSend.orders.push({id: input.order})
        }
        try {
            await axios({
                method: "post",
                url: `http://localhost:8080/routes`,
                data: toSend,
                //TODO axios headers
            })
            reset();
        } catch (e) {
            console.error(e.message)
        }
    }

    function resetFunction() {
        reset();
    }

    return (
        <>
            <header className={styles.options}>
                <button type="button" onClick={handleSubmit(formSubmit)}>Save</button>
                <button type="button" onClick={() => {
                    resetFunction()
                }}>Reset
                </button>

            </header>

            <form className={styles.content} name={"route-form"} onSubmit={handleSubmit(formSubmit)}>
                <label htmlFor="truck" className={styles['new-label']}> vrachtwagen
                    <select {...register("truck")} id="truck" className={styles.select} defaultValue="">
                        <option value="" disabled> ---</option>
                        <option value="br-vt-33">br-vt-33</option>
                        <option value="97-bph-8">97-bph-8</option>
                        <option value="br-tt-29">br-tt-29</option>
                    </select>
                </label>

                <label htmlFor="driver" className={styles['new-label']}> chauffeur
                    <select {...register("driver")} id="driver" className={styles.select} defaultValue="">
                        <option value="" disabled> ---</option>
                        {drivers && drivers.map((driver) => {
                            return <option value={driver.id}>{driver.id}</option>
                        })}
                    </select>
                </label>

                <label htmlFor="order" className={styles['new-label']}> order
                    <select {...register("order")} id="order" className={styles.select} defaultValue="">
                        <option value="" disabled> ---</option>
                        {orders && orders.map((order) => {
                            return <option value={order.id}>{order.id}</option>
                        })}
                    </select>
                </label>

                {watchOrder && <p>Meer orders kunnen worden ingevoerd in het route-menu</p>}

            </form>
        </>
    )
}