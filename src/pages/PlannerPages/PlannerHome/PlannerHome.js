import styles from "./PlannerHome.module.css";
import HeaderPlain from "../../../components/Header/Header";
import {useContext, useEffect, useState} from "react";
import PlannerNavItem from "../../../components/PlannerNavItem/PlannerNavItem";
import LabeledInput from "../../../components/LabeledInput/LabeledInput";
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
    const {id} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const history = useHistory();
    const {path, url} = useRouteMatch();

    const [checked, setChecked] = useState("");
    const [checkedMenu, setCheckedMenu] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [planner, setPlanner] = useState({});
    const[menuDisplay, setMenuDisplay] = useState(true);
    useEffect(() => {
        async function getDrivers() {
            try {
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:8080/drivers`
                })
                setDrivers(result.data);
                console.log(result.data);
            } catch (e) {
                console.log(e.message)
            }
        }

        getDrivers();
    }, [checked === "chauffeurs"])

    useEffect(() => {
        async function getOrders() {
            try {
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:8080/orders`
                })
                setOrders(result.data);
                console.log(result.data);
            } catch (e) {
                console.log(e.message)
            }
        }

        getOrders();
    }, [checked === "orders"])

    useEffect(() => {
        async function getRoutes() {
            try {
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:8080/routes`
                })
                setRoutes(result.data);
                console.log(result.data);
            } catch (e) {
                console.log(e.message)
            }
        }

        getRoutes();
    }, [checked === "routes"])

    useEffect(() => {
        async function getPlanner() {
            try {
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:8080/planners/${id}`
                })
                setPlanner(result.data);
                console.log(result.data);
            } catch (e) {
                console.log(e.message)
            }
        }

        getPlanner();
    }, [checked === "instellingen"])


    function setImage() {
    };

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
                </nav>
                <main className={styles['content-container']}>
                    <header className={styles.header}> Details</header>
                    <Switch>
                        <Route path={`/planner/chauffeurs`}>
                            <DriverDetails //driverData={driverData}
                                checkedMenu={checkedMenu}
                            />
                        </Route>
                        <Route path={`/planner/orders`}>
                            <OrderDetails checkedMenu={checkedMenu}/>
                        </Route>
                        <Route path={`/planner/routes`}>
                            <RouteDetails checkedMenu={checkedMenu}/>
                        </Route>
                        <Route path={`/planner/account`}>
                            <AccountDetails setMenuDisplay={setMenuDisplay}/>
                        </Route>
                        <Route path="/planner/new">
                            <NewUser checkedMenu={checkedMenu}/>
                        </Route>

                    </Switch>
                    {/*{checked === "chauffeurs" &&*/}
                    {/*<DriverDetails //driverData={driverData}*/}
                    {/*    checkedMenu={checkedMenu}*/}
                    {/*    formSubmit={formSubmit}*/}
                    {/*/>*/}
                    {/*}*/}
                    {/*{checked === "orders" &&*/}
                    {/*<OrderDetails checkedMenu={checkedMenu}/>*/}
                    {/*}*/}
                    {/*{checked === "routes" &&*/}
                    {/*<RouteDetails checkedMenu={checkedMenu}/>*/}
                    {/*}*/}
                    {/*{checked === "instellingen" &&*/}
                    {/*<AccountDetails checkedMenu={checkedMenu}/>*/}
                    {/*}*/}
                </main>
                <nav className={styles.menu} className={menuDisplay && styles['menu-visible']} >
                    <header className={styles.header}>Menu</header>
                    <button className={styles.newItemButton} onClick={()=>{history.push("/planner/new")}}>
                        nieuw
                    </button>

                    <Switch>
                        <Route path="/planner/new">
                            { checked != null &&
                                <PlannerMenuItem firstline="chauffeurs"
                                                 key="chauffeurs"
                                                 checked={checkedMenu}
                                                 setChecked={setCheckedMenu}/>
                            }
                        </Route>
                        <Route path="/planner/chauffeurs">
                            {drivers &&
                            drivers.map((driver) => {
                                return <PlannerMenuItem firstline={`naam: ${driver.firstName} ${driver.lastName}`}
                                                        secondline= "personeelsnummer"
                                                        thirdline={`${driver.employeeNumber}`}
                                                        username={driver.id}
                                                        key={driver.username}
                                                        checked={checkedMenu}
                                                        setChecked={setCheckedMenu}/>
                            })}
                        </Route>
                        <Route path={`/planner/orders`}>
                            {orders &&
                                orders.map((order) => {
                                    return <PlannerMenuItem firstline={order.isPickup ? "laden" : "lossen"}
                                                            secondline={order.city}
                                                            thirdline={`${order.pallets.length} ${order.type} pallet${(order.pallets.length > 1) ? "s" : ""}`}
                                                            username={order.id}
                                                            key={order.username}
                                                            checked={checkedMenu}
                                                            setChecked={setCheckedMenu}/>
                                })}
                        </Route>
                        <Route path={`/planner/routes`}>
                            {routes && routes.map((route)=>{
                                return <PlannerMenuItem firstline={`id: ${route.id}`}
                                                        secondline={`chauffeur: ${route.driver && route.driver.id}`}
                                                        thirdline={`wagen: ${route.truck}`}
                                                        username={route.id}
                                                        key={route.id}
                                                        checked={checkedMenu}
                                                        setChecked={setCheckedMenu}/>
                            })}
                        </Route>
                        {/*<Route path={`/planner/account`}>*/}
                        {/*    */}
                        {/*</Route>*/}

                    </Switch>
                </nav>
            </div>
        </>
    )
}