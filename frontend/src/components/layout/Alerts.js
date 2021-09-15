import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert'

import { ToastContainer, toast } from 'react-toastify';


export class Alerts extends Component {
    componentDidMount() {
        this.props.alert.show('It Works')
    }

    render() {
        return (
            
        )
    }
}

export default withAlert(Alerts)
