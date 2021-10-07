import React, { Component } from "react";

import PatientListPage from "./patient/PatientListPage";
import LoginPage from "./account/LoginPage";
import RegisterPage from "./account/RegisterPage";
import PrivateRoute from "./common/PrivateRoute";
import Calendar from "./calendar/Calendar";
import Landing from "./landing/Landing";
// import { Patient } from "./patient/Patient";
import PatientDetailPage from "./patient/PatientDetailPage";
import store from '../store';
import { loadUser } from '../actions/auth';

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

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Landing} ></Route>
                    <Route path='/accounts/login' component={LoginPage}></Route>
                    <Route path='/accounts/register' component={RegisterPage}></Route>
                    <PrivateRoute exact path='/calendar' component={Calendar} ></PrivateRoute>
                    <PrivateRoute exact path='/patients' component={PatientListPage} ></PrivateRoute>
                    <PrivateRoute path='/patients/:id' component={PatientDetailPage}  ></PrivateRoute>
                </Switch>
            </Router>
        );
    }
}