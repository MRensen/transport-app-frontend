import pngLogo from "../../resources/logistiekapplogo.png";
import {useContext, useState} from "react";
import "./Header.css";
import acceptPNG from "../../resources/acceptbutton.png";
import declinePNG from "../../resources/cancelbutton.png";
import homePNG from "../../resources/homebutton.png";
import savePNG from "../../resources/savebutton.png";
import {AuthContext} from "../Context/AuthContextProvider";

function Header({ismenu, titleName, logo, left, leftFunction, right, rightFunction, disableSave}) {
    const {logout} = useContext(AuthContext);
    return (
        <>
            {!ismenu &&
            <div className="header-single">
                <div className="header-center">
                    <img src={logo} alt="logistiekApp"/>
                    <button onClick={logout}>logout</button>
                </div>
            </div>
            }
            {ismenu &&
            <div className="header-double">
                <img src={left} alt="button-header-left" onClick={leftFunction}/>
                <div className="header-center">
                    <h1 className="header-title"> {titleName} </h1>
                    <button onClick={logout}>logout</button>
                </div>
                {!disableSave ?
                    <img src={right} alt="button-header-right" onClick={rightFunction}/>
                    :
                    <img src={right} className="header-image-disabled"/>
                }
            </div>
            }
        </>
    );
}

export function HeaderAcceptDecline({titleName, acceptFunction, declineFunction}) {
    return (
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

export default function HeaderPlain() {
    return (
        <Header
            logo={pngLogo}
            ismenu={false}
        />
    )
}

export function HeaderHomeSave({leftFunction, rightFunction, titleName, disableSave = false}) {
    return (
        <Header
            left={homePNG}
            right={savePNG}
            titleName={titleName}
            leftFunction={leftFunction}
            rightFunction={rightFunction}
            ismenu={true}
            disableSave={disableSave}
        />
    )
}
