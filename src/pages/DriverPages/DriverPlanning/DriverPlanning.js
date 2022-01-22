import styles from "./DriverPlanning.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";
import {useContext} from "react";
import {RouteContext} from "../../../components/Context/RouteContextProvider";
import OrderContainer from "../../../components/OrderContainer/OrderContainer";
import {useHistory} from "react-router-dom";

export default function DriverPlanning(){
    const {routeData} = useContext(RouteContext);
    const history = useHistory();

    function leftFunction(){
        history.push("/driver/home")
    };
    return(
        <>
            <HeaderHomeSave
                titleName="planning"
                leftFunction={leftFunction}
                disableSave = {true}
                />
            <main className={styles.name}>
                <ul>
                    {routeData.orders && routeData.orders.map((order)=>{
                        return <OrderContainer key={order.id} endpoint={order.id} />

                    })}
                </ul>
            </main>
        </>
    )
}