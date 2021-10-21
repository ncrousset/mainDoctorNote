import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

export class SuccessResetPassword extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
    }

    render() {
        return (
            <h2> {this.props.text}. 
                <Link to='/accounts/login' className=" text-green-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"> Login
                </Link>
            </h2>
        )
    }
}

export default SuccessResetPassword
