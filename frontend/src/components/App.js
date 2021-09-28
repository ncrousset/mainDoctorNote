import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from '../store';



import { loadUser } from "../actions/auth"

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return <div>
            <Provider store={store}>
               
                {/* <ToastContainer /> */}
                <HomePage />
            </Provider>
        </div>;
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv)
