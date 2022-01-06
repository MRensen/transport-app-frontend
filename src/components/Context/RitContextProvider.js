import {createContext, useContext, useState} from "react";

export const RitContext = createContext({})
export default function RitContextProvider({children}){
    const [hasRit, toggleHasRit] = useState(false);
    const [ritData, setRitData] = useState({});
    function registerRit(data){
        toggleHasRit(true);
        setRitData(data);
    }
    function unregisterRit(){
        toggleHasRit(false)
        setRitData({});
    }
    const data = {
        hasRit,
        unregisterRit,
        registerRit,
        ritData
    }
    return(
        <RitContext.Provider value={data}>
            {children}
        </RitContext.Provider>
    )
}