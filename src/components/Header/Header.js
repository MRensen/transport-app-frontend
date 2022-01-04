import pngLogo from "../../resources/logistiekapplogo.png";
import {useState} from "react";
import "./Header.css";

export default function Header({ismenu=false, title, left, right}) {
    // console.log("testing")
    // const [getClassName, setClassName] = useState();
    // if (ismenu) {
    //     setClassName("header-single")
    // } else {
    //     setClassName("header-double")
    // }
    return (
        <>
            {!ismenu &&
            <div className="header-single">
                <img src={pngLogo} alt="logistiekApp"/>
            </div>
            }
            {ismenu &&
            <div className="header-double">
                <img src={left} alt="button-header-left"/>
                <h1>{title}</h1>
                <img src={right} alt="button-header-right"/>
            </div>
            }
        </>
    );
}