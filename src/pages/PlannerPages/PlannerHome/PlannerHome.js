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
import InstellingenDetails from "../InstellingenDetails";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {AuthContext} from "../../../components/Context/AuthContextProvider";

export default function PlannerHome() {
    const {username} = useContext(AuthContext)
    const {register, handleSubmit} = useForm();
    const [checked, setChecked] = useState("chauffeurs")
    const [checkedMenu, setCheckedMenu] = useState({})
    const [drivers, setDrivers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [planner, setPlanner] = useState({});
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
                    url: `http://localhost:8080/planners/${username}`
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

    const {path, url} = useRouteMatch()
    return (
        <>
            <HeaderPlain/>
            <div className={styles.main}>
                <nav className={styles.navigate}>
                    <header className={styles.header}>Navigatie</header>
                    <PlannerNavItem title="chauffeurs" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="orders" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="routes" checked={checked} setChecked={setChecked}/>
                    <PlannerNavItem title="instellingen" checked={checked} setChecked={setChecked}/>
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
                        <Route path={`/planner/instellingen`}>
                            <InstellingenDetails checkedMenu={checkedMenu}/>
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
                    {/*<InstellingenDetails checkedMenu={checkedMenu}/>*/}
                    {/*}*/}
                </main>
                <nav className={styles.menu}>
                    <header className={styles.header}>Menu</header>
                    {drivers && checked === "chauffeurs" &&
                    drivers.map((driver) => {
                        return <PlannerMenuItem naam={driver.firstName + " " + driver.lastName}
                                                personeelsnummer={driver.employeeNumber}
                                                username={driver.username}
                                                key={driver.username}
                                                checked={checkedMenu}
                                                setChecked={setCheckedMenu}/>
                    })
                    }
                    {checked === "orders" &&
                    <OrderDetails checkedMenu={checkedMenu}/>
                    }
                    {checked === "routes" &&
                    <RouteDetails checkedMenu={checkedMenu}/>
                    }
                    {checked === "instellingen" &&
                    <InstellingenDetails checkedMenu={checkedMenu}/>
                    }
                </nav>
            </div>
        </>
    )
}