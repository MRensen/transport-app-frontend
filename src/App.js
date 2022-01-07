import logo from './logo.svg';
import './App.css';
import {Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DriverHome from "./pages/DriverPages/DriverHome/DriverHome";
import {useContext} from "react";
import {AuthContext} from "./components/Context/AuthContextProvider";
import PrivateRoute from "./components/PrivateRoute";
import StartRit from "./pages/DriverPages/StartRit/StartRit";
import StopRit from "./pages/DriverPages/StopRit/StopRit";
import DriverAccount from "./pages/DriverPages/DriverAccount/DriverAccount";
import DriverPlanning from "./pages/DriverPages/DriverPlanning/DriverPlanning";


function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <LoginPage/>
            </Route>
            <PrivateRoute path="/driver/home" role="driver">
                <DriverHome/>
            </PrivateRoute>
            <PrivateRoute path="/driver/start rit" role="driver">
                <StartRit/>
            </PrivateRoute>
            <PrivateRoute path="/driver/stop rit" role="driver">
                <StopRit/>
            </PrivateRoute>
            <PrivateRoute path="/driver/account" role="driver">
                <DriverAccount/>
            </PrivateRoute>
            <PrivateRoute path="/driver/planning" role="driver">
                <DriverPlanning/>
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
