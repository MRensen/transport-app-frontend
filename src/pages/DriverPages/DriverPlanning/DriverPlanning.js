import style from "./DriverPlanning.module.css";
import {HeaderHomeSave} from "../../../components/Header/Header";

export default function DriverPlanning(){
    return(
        <>
            <HeaderHomeSave
                titleName="planning"
                leftFunction={console.log("home")}
                disableSave = {true}
                />
        </>
    )
}