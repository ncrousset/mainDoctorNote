import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { toast, ToastContainer } from 'react-toastify';

export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
    }

    componentDidUpdate(prevProps) {

        const { error, alert } = this.props

        if (error !== prevProps.error) {

            if (typeof error.msg == 'object') {
                Object.entries(error.msg).map(msg => {
                    toast.error(msg.join(': '), {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
            } else if (typeof error.msg == 'string') {
                toast.error(error.msg, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }

        if (alert !== prevProps.alert) {
            toast.success(alert.msg, {
                position: toast.POSITION.TOP_CENTER
            });
        }

    }

    render() {
        return ( <
            ToastContainer / >
        )
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    alert: state.alert
});

export default connect(mapStateToProps)(Alerts)