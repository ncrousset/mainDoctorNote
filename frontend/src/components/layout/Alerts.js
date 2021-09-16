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

            if (error.type == 'obj') {
                Object.entries(error.msg).map(msg => {
                    toast.error(msg.join(': '), {
                        position: toast.POSITION.TOP_CENTER
                    });
                })

            }


        }

    }

    render() {
        return (
            <></>
        )
    }
}

const mapStateToProps = state => ({
    error: state.errors,
});

export default connect(mapStateToProps)(Alerts)
