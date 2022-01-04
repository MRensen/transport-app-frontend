import {useHistory} from "react-router-dom";
import "./DriverHomeButton.css";

export default function DriverHomeButton({text}){
    const history = useHistory();
    return(
        <li>
        <article onClick={() => {history.push("/driver/"+text)}}>
            <p>{text}</p>
        </article>
        </li>
    )
}