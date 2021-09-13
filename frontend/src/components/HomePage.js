import React, { Component } from "react";
import PatientListPage from "./patient/PatientListPage";
import CreatePatientPage from "./patient/CreatePatientPage";
import LoginPage from "./account/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'><p>This is the home page</p></Route>
                    <Route path='/accounts/login' component={LoginPage}></Route>
                    <Route path='/patients' component={PatientListPage}></Route>
                    <Route path='/patients/create' component={CreatePatientPage}></Route>
                </Switch>
            </Router>
        );
    }
}