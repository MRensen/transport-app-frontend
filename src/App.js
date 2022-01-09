import logo from './logo.svg';
import './App.css';
import {Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DriverHome from "./pages/DriverPages/DriverHome/DriverHome";
import {useContext} from "react";
import {AuthContext} from "./components/Context/AuthContextProvider";
import PrivateRoute from "./components/PrivateRoute";
import DriverAccount from "./pages/DriverPages/DriverAccount/DriverAccount";
import DriverPlanning from "./pages/DriverPages/DriverPlanning/DriverPlanning";
import StopRoute from "./pages/DriverPages/StopRoute/StopRoute";
import StartRoute from "./pages/DriverPages/StartRoute/StartRoute";
import Lossen from "./pages/DriverPages/Lossen/Lossen";
import Laden from "./pages/DriverPages/Laden/Laden";


function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <LoginPage/>
            </Route>
            <PrivateRoute path="/driver/home" role="driver">
                <DriverHome/>
            </PrivateRoute>
            <PrivateRoute path="/driver/start route" role="driver">
                <StartRoute/>
            </PrivateRoute>
            <PrivateRoute path="/driver/stop route" role="driver">
                <StopRoute/>
            </PrivateRoute>
            <PrivateRoute path="/driver/account" role="driver">
                <DriverAccount/>
            </PrivateRoute>
            <PrivateRoute path="/driver/planning" role="driver">
                <DriverPlanning/>
            </PrivateRoute>
            <PrivateRoute path="/driver/lossen" role="driver">
                <Lossen/>
            </PrivateRoute>
            <PrivateRoute path="/driver/laden" role="driver">
                <Laden/>
            </PrivateRoute>
            {/*{(loggedIn && (name === "driver")) &&*/}
            {/*<Route path="/driver/home">*/}
            {/*    <DriverHome/>*/}
            {/*</Route>*/}
            {/*}*/}
            {/*{(loggedIn && (name === "driver")) &&*/}

            }
        </Switch>
    );
}

export default App;
