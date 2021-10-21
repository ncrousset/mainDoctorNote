import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changerPassword } from '../../../actions/auth';
import {returnErrors} from '../../../actions/messages'
import { FaSpinner } from 'react-icons/fa'

export class ChangerPassword extends Component {

    state = {
        password: '',
        confirm_password: '',
        clickSubmit: false,
        isValidatePassword: false 
    }

    static propTypes = {
        token: PropTypes.string.isRequired,
        changerPassword: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        onSucces: PropTypes.func
    }

    onSubmit = event => {
        event.preventDefault()

        if(!this.state.isValidatePassword) {
            document.getElementById('confirm_password').focus()
            this.props.returnErrors("The password do not match", 'str', 400)
        }else {
            this.setState({clickSubmit: true})
            this.props.changerPassword(this.props.token, this.state.password)
                .then(response => {
                    this.props.onSucces()
                })
        }
    }

    onChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    validarConfirmPassword = event => {
        this.setState({isValidatePassword: (this.state.confirm_password == this.state.password)})
    }

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
                        type="password"
                        placeholder="Password"
                        name="password"
                        onKeyUp={() => this.validarConfirmPassword()}
                        onChange={this.onChange}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-2 hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>

                <div className="mt-7">
                    <input
                        id="confirm_password"
                        required
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        onKeyUp={() => this.validarConfirmPassword()}
                        onChange={this.onChange}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-2 hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>

                <div className="mt-7">
                    <button type="submit" 
                        disabled={clickSubmit}
                        className="bg-green-500 w-full py-3  rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                         { clickSubmit 
                         ? <FaSpinner className="animate-spin ml-auto mr-auto " /> : 'Changer' }
                    </button>
                </div>


            </form >
        )
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { returnErrors, changerPassword })(ChangerPassword)

