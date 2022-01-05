import logo from './logo.svg';
import './App.css';
import {Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DriverHome from "./pages/DriverPages/DriverHome/DriverHome";
import {useContext} from "react";
import {AuthContext} from "./components/AuthContextProvider";
import PrivateRoute from "./components/PrivateRoute";
import StartRit from "./pages/DriverPages/StartRit/StartRit";
import StopRit from "./pages/DriverPages/StopRit/StopRit";


function App() {
    const {loggedIn, name} = useContext(AuthContext);
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
