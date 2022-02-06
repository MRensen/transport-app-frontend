import {createContext, useState} from "react";

export const RouteContext = createContext({})
export default function RouteContextProvider({children}){
    const [hasroute, toggleHasroute] = useState(false);
    const [routeData, setrouteData] = useState({});
    function registerRoute(data){
        toggleHasroute(true);
        setrouteData(data);

    }
    function unregisterRoute(){
        toggleHasroute(false)
        setrouteData({});
    }
    const data = {
        hasroute,
        unregisterRoute,
        registerRoute,
        routeData
    }
    return(
        <RouteContext.Provider value={data}>
            {children}
        </RouteContext.Provider>
    )
}