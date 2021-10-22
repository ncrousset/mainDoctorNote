import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../../actions/auth';
import { FaSpinner } from 'react-icons/fa'

export class ResetPassword extends Component {

    state = {
        email: '',
        clickSubmit: false
    }

    static propTypes = {
        resetPassword: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        onSucces: PropTypes.func
    }

    onSubmit = event => {
        event.preventDefault()
        this.setState({clickSubmit: true})
        this.props.resetPassword(this.state.email)
            .then(response => {
                this.props.onSucces()
            })

    }

    onChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/patients" />
        }

        const clickSubmit = this.state.clickSubmit

        return (
            <form method="post" action="#" className="mt-10" onSubmit={this.onSubmit} >
                <div className="mt-7">
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        name="email"
                        autoComplete="off"
                        onChange={this.onChange}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-2 hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>

                <div className="mt-7">
                    <button type="submit" 
                        disabled={clickSubmit}
                        className="bg-green-500 w-full py-3  rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                         { clickSubmit 
                         ? <FaSpinner className="animate-spin ml-auto mr-auto " /> : 'Reset' }
                    </button>
                </div>

                <div className="flex mt-7 items-center text-center">
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                </div>

                <div className="mt-7">
                    <div className="flex justify-center items-center">
                        <label className="mr-2" >¿Tienes cuenta? </label>
                        <Link
                            to="/accounts/login"
                            className=" text-green-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Login</Link>
                    </div>
                </div>
            </form >
        )
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { resetPassword })(ResetPassword)

