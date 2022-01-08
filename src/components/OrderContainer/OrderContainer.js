import styles from "./OrderContainer.module.css";
import axios from "axios";
import {useEffect, useState} from "react";

export default function OrderContainer({endpoint}) {
    const [orderData, setOrderData] = useState({"id":3001,"type":null,"orderStatus":null,"isPickup":null,"description":null,"creator":{"id":1001},"route":{"id":5001},"pallets":[{"height":100,"width":120,"length":80,"weight":0,"load":"things","type":"EURO"}],"loadingStreet":"edisonstraat","loadingHouseNumber":"39","loadingPostal":"7002xs","loadingName":"Brutra","loadingCity":"Doetinchem","loadingDate":null,"deliveryStreet":"zuivelweg","deliveryHouseNumber":"55","deliveryPostal":"8004dv","deliveryName":"jansen","deliveryCity":"almere","deliveryDate":null});
    useEffect(() => {
        async function getRouteData() {
            try {
                const result = await axios.get(`http://localhost:8080/orders/${endpoint}`)
                setOrderData(result.data);
                console.log(result.data)
            } catch (e) {
                console.log("error fetching data: " + e.error);
            }
        }

        getRouteData();
    }, [])

    return (
        <article className={styles.article}>
            <button type="button" className={styles.button}>start</button>
            <main className={styles.main}>
                <p>lossen: {orderData.deliveryName} <br/>
                {orderData.deliveryPostal + " " + orderData.deliveryCity}<br/>
                {orderData.deliveryStreet + " " + orderData.deliveryHouseNumber}<br/>
                type: {orderData.type}<br/>
                aantal: {orderData.pallets && orderData.pallets.length}<br/>
                beschrijving: {orderData.pallets.map((p)=>{return "-|"+p.load +"|-"})}</p>
                {/*creator: {id: 1001}*/}
                {/*deliveryCity: "houten"*/}
                {/*deliveryDate: null*/}
                {/*deliveryHouseNumber: "65"*/}
                {/*deliveryName: "hendriksen"*/}
                {/*deliveryPostal: "6006it"*/}
                {/*deliveryStreet: "achterweg"*/}
                {/*id: 3002*/}
                {/*isPickup: null*/}
                {/*loadingCity: "Didam"*/}
                {/*loadingDate: null*/}
                {/*loadingHouseNumber: "5"*/}
                {/*loadingName: "fabriek"*/}
                {/*loadingPostal: "7062xs"*/}
                {/*loadingStreet: "wasstraat"*/}
                {/*orderStatus: null*/}
                {/*pallets: []*/}
                {/*route: {id: 5001}*/}
            </main>
            <main className={styles.main}>
                <p>{orderData.isPickup ? "laden: " : "afzender: "}{orderData.loadingName}<br/>
                    {orderData.loadingPostal + " " + orderData.loadingCity}<br/>
                    {orderData.loadingStreet + " " + orderData.loadingHouseNumber}<br/>
                    opmerkingen: {orderData.description}
                </p>
            </main>
        </article>
    )
}