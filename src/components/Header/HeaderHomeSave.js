import homePNG from "../../resources/homebutton.png"
import savePNG from "../../resources/savebutton.png"
import Header from "./Header";

export default function HeaderHomeSave(leftFunction, rightFunction, title){
    return(
        <Header
            left={homePNG}
            right={savePNG}
            title={title}
            leftFunction={leftFunction}
            rightFunction={rightFunction}
            ismenu={true}
            />
    )
}