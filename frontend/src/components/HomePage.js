import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import PatientListPage from "./patient/PatientListPage";
import LoginPage from "./account/LoginPage";
import RegisterPage from "./account/RegisterPage";
import ResetPasswordPage from "./account/ResetPasswordPage";
import ChangerPasswordPage from "./account/ChangerPasswordPage";

import PrivateRoute from "./common/PrivateRoute";
import Calendar from "./calendar/Calendar";
import Landing from "./landing/Landing";
// import { Patient } from "./patient/Patient";
import PatientDetailPage from "./patient/PatientDetailPage";
import store from '../store';
import { loadUser } from '../actions/auth';



export class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        if(this.props.isAuthenticated) {
            store.dispatch(loadUser());
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Landing} ></Route>
                    <Route path='/accounts/login' component={LoginPage}></Route>
                    <Route path='/accounts/register' component={RegisterPage}></Route>
                    <Route path='/accounts/reset_password' component={ResetPasswordPage}></Route>
                    <Route path="/accounts/changer_password/:token" component={ChangerPasswordPage}></Route>
                    <PrivateRoute exact path='/calendar' component={Calendar} ></PrivateRoute>
                    <PrivateRoute exact path='/patients' component={PatientListPage} ></PrivateRoute>
                    <PrivateRoute path='/patients/:id' component={PatientDetailPage}  ></PrivateRoute>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(HomePage)