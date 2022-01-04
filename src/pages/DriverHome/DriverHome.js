import Header from "../../components/Header/Header";
import {useContext} from "react";
import {AuthContext} from "../../components/AuthContextProvider";
import "./DriverHome.css";
import DriverHomeButton from "../../components/DriverHomeButton/DriverHomeButton";

export default function DriverHome(){
    const {name} = useContext(AuthContext);
    console.log("drivertest")
    return (
    <div className="container">
        <Header/>
        <header>
            <h2>ritnummer: </h2>
            <h1>{name}</h1>
            <h2>vrachtwagen: </h2>
        </header>
        <ul>
            <DriverHomeButton text="start rit"/>
            <DriverHomeButton text="lossen"/>
            <DriverHomeButton text="planning"/>
            <DriverHomeButton text="stop rit"/>
            <DriverHomeButton text="laden"/>
            <DriverHomeButton text="account"/>
        </ul>
    </div>
    )
}