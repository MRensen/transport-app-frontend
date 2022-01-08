import styles from "./StartRoute.module.css";
import {HeaderAcceptDecline} from "../../../components/Header/Header";
import acceptLogo from "../../../resources/acceptbutton.png"
import cancelLogo from "../../../resources/cancelbutton.png"
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {RouteContext} from "../../../components/Context/RouteContextProvider";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import axios from "axios";

export default function StartRoute() {

    const {register, handleSubmit} = useForm()
    const [routes, setRoutes] = useState([]);
    const {routeData,  registerRoute} = useContext(RouteContext);
    const {data} = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {
        async function getRoutes(){
            try{
                const result = await axios.get(`http://localhost:8080/drivers/${data.username}/route`)
                setRoutes(result.data);
                console.log(result)
            } catch(e){
                console.log(e.error)
            }
        }
        getRoutes();
    },[])


    async function acceptFunction(data) {
        console.log(data)
        try{
            console.log("nummer:" + data.routenummer)
            const result = await axios.get(`http://localhost:8080/routes/${data.routenummer}`)
            result.data.truck = data.vrachtwagen;
            registerRoute(result.data);
            console.log(routeData)
        } catch (e){
            console.log(e.error);
        }
    }

    function declineFunction(data) {
        console.log("route not registered")
    }

    return (
        <>
            <HeaderAcceptDecline
                titleName="start route"
                acceptFunction={() => {
                    console.log("accept");
                    handleSubmit(acceptFunction)();
                    console.log(data);
                    history.push("/driver/home")
                }}
                declineFunction={() => {
                    console.log("decline");
                    declineFunction();
                    history.push("/driver/home");
                }}
            />

            <form onSubmit={handleSubmit(acceptFunction)} className={styles["startstop-form"]}>
                <label htmlFor="routenummer" className="startstop-label">routenummer
                    <select id="routenummer"
                            className={styles["startstop-select"]}
                            {...register("routenummer")}
                    >
                        <option disabled selected value> ----</option>
                        {routes && routes.map((route)=>{
                            return <option key={route.id} value={route.id}>{route.id}</option>
                        })}

                        {/*<option value="test2">test2</option>*/}
                    </select>
                </label>
                <label htmlFor="vrachtwagen" className={styles["startstop-label"]}>vrachtwagen </label>
                <select id="vrachtwagen"
                        className={styles["startstop-select"]}
                        {...register("vrachtwagen")}
                >
                    <option disabled selected value> ----</option>
                    <option value="97-bph-8">97-bph-8</option>
                    <option value="br-tt-22">br-tt-22</option>
                </select>
            </form>
        </>
    )
}