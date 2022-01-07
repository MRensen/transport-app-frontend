import {createContext, useContext, useState} from "react";

export const RouteContext = createContext({})
export default function RouteContextProvider({children}){
    const [hasroute, toggleHasroute] = useState(false);
    const [routeData, setrouteData] = useState({});
    function registerroute(data){
        toggleHasroute(true);
        setrouteData(data);
    }
    function unregisterroute(){
        toggleHasroute(false)
        setrouteData({});
    }
    const data = {
        hasroute,
        unregisterroute,
        registerroute,
        routeData
    }
    return(
        <RouteContext.Provider value={data}>
            {children}
        </RouteContext.Provider>
    )
}