import { HashRouter, Route, Switch } from "react-router-dom";
import { useToken } from "../../context/TokenContext/TokenProvider";
import MyProfilePage from "../MyProfilePage/MyProfilePage";
import UserLoginPage from "../UserLoginPage/UserLoginPage";
import PrivateRoute from "./PrivateRoute";
import StudentFinancesPage from "../StudentFinancesPage/StudentFinancesPage";
import StudentExamsPage from "../StudentHomePage/StudentExamPage";
import StudentProfilePage from "../StudentProfilePage/StudentProfilePage";
import AddNewStudentPage from "../AddNewStudentPage/AddNewStudentPage";
import HomePage from "../HomePage/HomePage";
import ExamStatusPage from "../ExamStatusPage/ExamStatusPage";


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
                    <PrivateRoute exact path="/StudentFinancesPage" component={ StudentFinancesPage }  />
                    <PrivateRoute exact path="/StudentExamsPage" component={ StudentExamsPage }  />
                    <PrivateRoute exact path="/StudentProfilePage" component={ StudentProfilePage }  />
                    <PrivateRoute exact path="/AddNewStudentPage" component={ AddNewStudentPage }  />
                    <PrivateRoute exact path="/ExamStatusPage" component={ ExamStatusPage }  />
                    </Switch>
            </HashRouter>
        </>
    );
}

export default Router;
