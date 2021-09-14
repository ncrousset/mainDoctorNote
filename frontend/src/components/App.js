import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

import { Provider } from 'react-redux';
import store from '../store';


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Provider store={store}>
                <HomePage />
            </Provider>
        </div>;
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv)
