import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from '../store';

import { ToastContainer, toast } from 'react-toastify';

export default class App extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return <div>
            <Provider store={store}>
                <ToastContainer />
                <HomePage />
            </Provider>
        </div>;
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv)
