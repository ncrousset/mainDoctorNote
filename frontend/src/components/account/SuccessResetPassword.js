import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SuccessResetPassword extends Component {

    render() {
        return (
            <h2>We have sent you an email to modify the password.
                <Link to='/accounts/login' className=" text-green-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"> Login
                </Link>
            </h2>
        )
    }
}

export default SuccessResetPassword
