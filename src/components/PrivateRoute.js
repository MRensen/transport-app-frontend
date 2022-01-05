import {useContext} from "react";
import {AuthContext} from "./AuthContextProvider";
import {Redirect, Route} from "react-router-dom";

export default function PrivateRoute({children, path, role}) {
    const {loggedIn, name} = useContext(AuthContext);
    return (
            <Route path={path}>
                {(loggedIn) ?
                children
                    :
                    <Redirect to="/"/>
                }
            </Route>
    )
}