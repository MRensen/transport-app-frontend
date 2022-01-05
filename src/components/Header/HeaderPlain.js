import pngLogo from "../../resources/logistiekapplogo.png";
import Header from "./Header";

export default function HeaderPlain(){
    return(
        <Header
            logo={pngLogo}
            ismenu={false}
            />
    )
}