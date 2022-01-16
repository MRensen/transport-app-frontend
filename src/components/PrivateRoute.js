import {useContext} from "react";
import {AuthContext} from "./Context/AuthContextProvider";
import {Redirect, Route} from "react-router-dom";

export default function PrivateRoute({children, path, role}) {
    const {loggedIn, data} = useContext(AuthContext);
    return (
            <Route path={path}>
                {(loggedIn && (role === data.role) || (data.role === "super")) ?
                children
                    :
                    <Redirect to="/"/>
                }
            </Route>
    )
}