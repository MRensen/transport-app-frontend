import styles from "./StartRoute.module.css";
import {HeaderAcceptDecline} from "../../../components/Header/Header";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {RouteContext} from "../../../components/Context/RouteContextProvider";
import {AuthContext} from "../../../components/Context/AuthContextProvider";
import axios from "axios";

export default function StartRoute() {

    const {register, handleSubmit} = useForm()
    const [routes, setRoutes] = useState([]);
    const {  registerRoute} = useContext(RouteContext);
    const {data} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        async function getRoutes(){
            try{
                const result = await axios.get(`http://localhost:8080/drivers/${data.driver.id}/route`,{
                    headers: {
                    "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }})
                setRoutes(result.data);
            } catch(e){
                console.log(e.error)
            }
        }
        getRoutes();
    },[])


    async function acceptFunction(input) {
        try{
            const result = await axios.get(`http://localhost:8080/routes/${input.routenummer}`,{
                headers: {
                "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
            }})
            registerRoute(result.data);
        } catch (e){
            console.log(e.error);
        }
    }

    function declineFunction() {
        console.log("route not registered")
    }

    return (
        <>
            <HeaderAcceptDecline
                titleName="start route"
                acceptFunction={() => {
                    handleSubmit(acceptFunction)();
                    history.push("/driver/home")
                }}
                declineFunction={() => {
                    declineFunction();
                    history.push("/driver/home");
                }}
            />

            <form onSubmit={handleSubmit(acceptFunction)} className={styles["startstop-form"]}>
                <label htmlFor="routenummer" className="startstop-label">routenummer
                    <select id="routenummer"
                            className={styles["startstop-select"]}
                            defaultValue=""
                            {...register("routenummer")}
                    >
                        <option disabled value=""> ----</option>
                        {routes && routes.map((route)=>{
                            return <option key={route.id} value={route.id}>{route.id}</option>
                        })}
                    </select>
                </label>
            </form>
        </>
    )
}