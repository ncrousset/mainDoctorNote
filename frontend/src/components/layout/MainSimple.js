import React, { Component } from "react";

export default class MainSimple extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
            {this.props.children}
        </div>
    }

}