import styles from "./PlannerHome.module.css";
import HeaderPlain from "../../../components/Header/Header";
import {useContext, useEffect, useState} from "react";
import PlannerNavItem from "../../../components/PlannerNavItem/PlannerNavItem";
import axios from "axios";
import PlannerMenuItem from "../../../components/PlannerMenuItem/PlannerMenuItem";
import {useForm} from "react-hook-form";
import DriverDetails from "../DriverDetails";
import OrderDetails from "../OrderDetails";
import RouteDetails from "../RouteDetails";
import AccountDetails from "../AccountDetails";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import NewUser from "../NewUser";

export default function PlannerHome() {
    // const {id} = useContext(AuthContext);
    const [checked, setChecked] = useState("");
    const [checkedMenu, setCheckedMenu] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [routes, setRoutes] = useState([]);
    // const [planner, setPlanner] = useState({});
    const [menuDisplay, setMenuDisplay] = useState(true);
    const [newDisplay, setNewDisplay] = useState(true);

    useEffect(() => {
        async function getDrivers() {
            if (checked === "chauffeurs") {
                try {
                    const result = await axios({
                        method: 'get',
                        url: `http://localhost:8080/drivers`,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                        }
                    })
                    setDrivers(result.data);
                } catch (e) {
                    console.log(e.message)
                }
            }
        }

        getDrivers();
    }, [checked, checkedMenu])

    useEffect(() => {
        async function getOrders() {
            // if (checked === "orders") {
                try {
                    const result = await axios({
                        method: 'get',
                        url: `http://localhost:8080/orders`,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                        }
                    })
                    setOrders(result.data);
                } catch (e) {
                    console.log(e.message)
                }
            // }
        }

        getOrders();
    }, [checked, checkedMenu])

    useEffect(() => {
        async function getRoutes() {
            if (checked === "routes") {
                try {
                    const result = await axios({
                        method: 'get',
                        url: `http://localhost:8080/routes`,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                        }
                    })
                    setRoutes(result.data);
                } catch (e) {
                    console.log(e.message)
                }
            }
        }

        getRoutes();
    }, [checked, checkedMenu])


    return (
        <>
            <HeaderPlain/>
            <div className={styles.main}>
                <nav className={styles.navigate}>
                    <header className={styles.header}>Navigatie</header>
                    <PlannerNavItem title="chauffeurs" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="orders" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="routes" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="account" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="create" checked={checked} setChecked={setChecked}/>
                </nav>

                <main className={styles['content-container']}>
                    <header className={styles.header}> Details</header>
                    <Switch>
                        <Route path={`/planner/chauffeurs`}>
                            <DriverDetails
                                checkedMenu={checkedMenu}
                                setCheckedMenu={setCheckedMenu}
                            />
                        </Route>
                        <Route path={`/planner/orders`}>
                            <OrderDetails checkedMenu={checkedMenu}
                                          setCheckedMenu={setCheckedMenu}
                                          setOrders={setOrders}
                                          orders={orders}
                            />
                        </Route>
                        <Route path={`/planner/routes`}>
                            <RouteDetails checkedMenu={checkedMenu}
                                          setCheckedMenu={setCheckedMenu}/>
                        </Route>
                        <Route path={`/planner/account`}>
                            <AccountDetails setMenuDisplay={setMenuDisplay}/>
                        </Route>
                        <Route path="/planner/create">
                            <NewUser setNewDisplay={setNewDisplay}
                                     checkedMenu={checkedMenu}/>
                        </Route>

                    </Switch>
                </main>

                <nav className={menuDisplay ? styles.menu : styles.invisible}>
                    <header className={styles.header}>Menu</header>


                    <Switch>
                        <Route path="/planner/create">
                            {checked != null &&
                            <>
                                <PlannerMenuItem firstline="chauffeur"
                                                 key="chauffeur"
                                                 id="chauffeur"
                                                 checked={checkedMenu}
                                                 setChecked={setCheckedMenu}/>
                                <PlannerMenuItem firstline="order"
                                                 key="order"
                                                 id="order"
                                                 checked={checkedMenu}
                                                 setChecked={setCheckedMenu}/>
                                <PlannerMenuItem firstline="route"
                                                 key="route"
                                                 id="route"
                                                 checked={checkedMenu}
                                                 setChecked={setCheckedMenu}/>
                                <PlannerMenuItem firstline="planner"
                                                 key="planner"
                                                 id="planner"
                                                 checked={checkedMenu}
                                                 setChecked={setCheckedMenu}/>
                                <PlannerMenuItem firstline="klant"
                                                 key="klant"
                                                 id="klant"
                                                 checked={checkedMenu}
                                                 setChecked={setCheckedMenu}/>
                            </>
                            }
                        </Route>
                        <Route path="/planner/chauffeurs">
                            {drivers &&
                            drivers.map((driver) => {
                                return <PlannerMenuItem firstline={`naam: ${driver.firstName} ${driver.lastName}`}
                                                        secondline="personeelsnummer"
                                                        thirdline={`${driver.employeeNumber}`}
                                                        id={driver.id}
                                                        key={driver.username}
                                                        checked={checkedMenu}
                                                        setChecked={setCheckedMenu}/>
                            })}
                        </Route>
                        <Route path={`/planner/orders`}>
                            {orders &&
                            orders.map((order) => {
                                return <PlannerMenuItem
                                    firstline={order.isPickup ? "laden: " + order.loadingCity : "lossen: " + order.deliveryCity}
                                    secondline={order.orderStatus}
                                    thirdline={`${order.pallets.length} ${order.type} pallet${(order.pallets.length > 1) ? "s" : ""}`}
                                    id={order.id}
                                    key={order.id}
                                    checked={checkedMenu}
                                    setChecked={setCheckedMenu}/>
                            })}
                        </Route>
                        <Route path={`/planner/routes`}>
                            {routes && routes.map((route) => {
                                return <PlannerMenuItem firstline={`id: ${route.id}`}
                                                        secondline={`chauffeur: ${route.driver && route.driver.id}`}
                                                        thirdline={`wagen: ${route.truck}`}
                                                        id={route.id}
                                                        key={route.id}
                                                        checked={checkedMenu}
                                                        setChecked={setCheckedMenu}/>
                            })}
                        </Route>

                    </Switch>
                </nav>
            </div>
        </>
    )
}