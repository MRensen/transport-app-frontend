import styles from "./OrderContainer.module.css";
import axios from "axios";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

export default function OrderContainer({endpoint, noButton}) {
    const history = useHistory();
    const [orderData, setOrderData] = useState({"id":3001,"type":null,"orderStatus":null,"isPickup":null,"description":null,"creator":{"id":1001},"route":{"id":5001},"pallets":[{"height":100,"width":120,"length":80,"weight":0,"load":"things","type":"EURO"}],"loadingStreet":"edisonstraat","loadingHouseNumber":"39","loadingPostal":"7002xs","loadingName":"Brutra","loadingCity":"Doetinchem","loadingDate":null,"deliveryStreet":"zuivelweg","deliveryHouseNumber":"55","deliveryPostal":"8004dv","deliveryName":"jansen","deliveryCity":"almere","deliveryDate":null});
    useEffect(() => {
        async function getOrderData() {
            try {
                const result = await axios.get(`http://localhost:8080/orders/${endpoint}`, {
                    headers: {
                    "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("logitoken")}`,
                }})
                setOrderData(result.data);
            } catch (e) {
                console.log("error fetching data: " + e.error);
            }
        }

        getOrderData();
    }, [endpoint])

    function redirectFunction(){
        if(orderData.isPickup){
            history.push(`/order/${orderData.id}/laden`);
        } else {
            history.push(`/order/${orderData.id}/lossen`);
        }
    }
    if(orderData.orderStatus === "delivered"){
        return null;
    }

    return (
        <li key={orderData.id}>
        <article key={orderData.id} className={`${noButton ? styles['alt-article'] : styles.article}`}>
            <button type="button"
                    className={noButton ? styles.invisible : styles.button}
                    onClick={redirectFunction}
            >start</button>
            <main className={`${styles.main} ${noButton && styles['main-main']}`}>
                <p><strong>lossen:</strong>  {orderData.deliveryName} <br/> <br/>
                {orderData.deliveryPostal + " " + orderData.deliveryCity}<br/>
                {orderData.deliveryStreet + " " + orderData.deliveryHouseNumber}<br/>
                type: {orderData.type}<br/>
                aantal: {orderData.pallets && orderData.pallets.length}<br/>
                beschrijving: {orderData.pallets.length < 4
                        ?
                        orderData.pallets.map((p)=>{return "-|"+p.load +"|-"})
                        :
                        orderData.pallets.slice(0,4).map((p)=>{return "-|"+p.load +"|-"})}</p>
            </main>
            <main className={styles.main}>
                <p><strong>{orderData.isPickup ? "laden: " : "afzender: "}</strong>{orderData.loadingName}<br/>
                    {orderData.loadingPostal + " " + orderData.loadingCity}<br/>
                    {orderData.loadingStreet + " " + orderData.loadingHouseNumber}<br/>
                    opmerkingen: {orderData.description && (orderData.description.length < 30
                        ?
                        orderData.description
                        :
                        orderData.description.substring(0, 30) + "...")}
                </p>
            </main>
        </article>
        </li>
    )
}