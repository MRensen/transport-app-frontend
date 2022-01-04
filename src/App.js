import logo from './logo.svg';
import './App.css';
import {Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DriverHome from "./pages/DriverHome/DriverHome";
import {useContext} from "react";
import {AuthContext} from "./components/AuthContextProvider";


function App() {
    const {loggedIn} = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact>
        <LoginPage/>
      </Route>
        {loggedIn &&
        <Route path="/driver/home">
            <DriverHome/>
        </Route>
        }
    </Switch>
  );
}

export default App;
