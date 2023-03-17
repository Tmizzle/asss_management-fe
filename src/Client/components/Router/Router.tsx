import { HashRouter, Route, Switch } from "react-router-dom";
import { useToken } from "../../context/TokenContext/TokenProvider";
import { HomePage } from "../HomePage/HomePage";
import MyProfilePage from "../MyProfilePage/MyProfilePage";
import UserLoginPage from "../UserLoginPage/UserLoginPage";
import PrivateRoute from "./PrivateRoute";


function Router() {
    
    /* function router is used for main menu mostly to land on pages
    it uses Routes for pages that dont need auth
    and PrivateRoutes for pages with auth */
    return (
        <>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={ UserLoginPage }  />
                    <PrivateRoute exact path="/homePage" component={ HomePage }  />
                    <PrivateRoute exact path="/MyProfilePage" component={ MyProfilePage }  />
                    </Switch>
            </HashRouter>
        </>
    );
}

export default Router;
