import React, { Component } from "react";
import Alerts from './Alerts'

export default class MainSimple extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Alerts />
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                    {this.props.children}
                </div>
            </div>)
           
    }

}