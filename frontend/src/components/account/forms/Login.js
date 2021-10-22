import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

export class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    onSubmit = event => {
        event.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/patients" />
        }
        
        return (
            <form method="#" action="#" className="mt-10" onSubmit={this.onSubmit} >
                <div>
                    <input
                        type="text"
                        placeholder="Correo electronico"
                        name="username"
                        onChange={this.onChange}
                        autoComplete="on"
                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-2 hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>
                <div className="mt-7">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        autoComplete="on"
                        onChange={this.onChange}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 pl-2 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>

                <div className="mt-7 flex">
                    <label  className="inline-flex items-center w-full cursor-pointer">
                        <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                        <span className="ml-2 text-sm text-gray-600">
                            Recuerdame
                        </span>
                    </label>

                    <div className="w-full text-right">
                    <Link className="underline text-sm text-gray-600 hover:text-gray-900" to="/accounts/reset_password">
                    ¿Olvidó su contraseña?
                    </Link>
                      
                    </div>
                </div>

                <div className="mt-7">
                    <button type="submit" className="bg-green-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                        Login
                    </button>
                </div>

                <div className="flex mt-7 items-center text-center">
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                </div>

                <div className="mt-7">
                    <div className="flex justify-center items-center">
                        <span  className="mr-2" >¿Eres nuevo? </span>
                        <Link
                            to="/accounts/register/"
                            className=" text-green-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                            Crea una cuenta
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
