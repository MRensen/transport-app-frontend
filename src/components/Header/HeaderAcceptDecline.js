import Header from "./Header";
import acceptPNG from "../../resources/acceptbutton.png";
import declinePNG from "../../resources/cancelbutton.png";
import "./Header.css";

export default function HeaderAcceptDecline(title, acceptFunction, declineFunction){
    return(
        <div className="header-double">
            <img src={acceptPNG} alt="button-header-left" onClick={acceptFunction}/>
            <h1>title</h1>
            <img src={declinePNG} alt="button-header-right" onClick={declineFunction}/>
        </div>
    )
}