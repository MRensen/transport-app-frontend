import pngLogo from "../../resources/logistiekapplogo.png";
import {useState} from "react";
import "./Header.css";
import acceptPNG from "../../resources/acceptbutton.png";
import declinePNG from "../../resources/cancelbutton.png";
import homePNG from "../../resources/homebutton.png";
import savePNG from "../../resources/savebutton.png";

function Header({ ismenu, titleName, logo, left, leftFunction, right, rightFunction}) {
    return (
        <>
            {!ismenu &&
            <div className="header-single">
                <img src={logo} alt="logistiekApp"/>
            </div>
            }
            {ismenu &&
            <div className="header-double">
                <img src={left} alt="button-header-left" onClick={leftFunction}/>
                <h1 className="header-title"> {titleName} </h1>
                <img src={right} alt="button-header-right" onClick={rightFunction}/>
            </div>
            }
        </>
    );
}

export function HeaderAcceptDecline({titleName, acceptFunction, declineFunction}){
    return(
        <Header
            titleName={titleName}
            left={acceptPNG}
            right={declinePNG}
            leftFunction={acceptFunction}
            rightFunction={declineFunction}
            ismenu={true}
        />
    )
}

 export default function HeaderPlain(){
    return(
        <Header
            logo={pngLogo}
            ismenu={false}
        />
    )
}

export function HeaderHomeSave({leftFunction, rightFunction, titleName}){
    return(
        <Header
            left={homePNG}
            right={savePNG}
            titleName={titleName}
            leftFunction={leftFunction}
            rightFunction={rightFunction}
            ismenu={true}
        />
    )
}
