import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
    }

    onSubmit = event => {
        event.preventDefault();
        console.log('submit');
    }

    onChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    render() {
        const { username, email, password, password2 } = this.state
        return (
            < form method="post" action="#" className="mt-10" onSubmit={this.onSubmit} >
                <div class="mt-7">
                    <input
                        type="text"
                        placeholder="User name"
                        name="username"
                        onChange={this.onChange}
                        value={username}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-2 hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>
                <div class="mt-7">
                    <input
                        type="email"
                        placeholder="Correo electronico"
                        name="email"
                        onChange={this.onChange}
                        value={email}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-2 hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>
                <div class="mt-7">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        onChange={this.onChange}
                        value={password}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 pl-2 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>
                <div class="mt-7">
                    <input
                        type="password2"
                        placeholder="Confirmal Contraseña"
                        name="password2"
                        onChange={this.onChange}
                        value={password2}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 pl-2 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                </div>
                <div className="mt-7">
                    <button type="submit" className="bg-green-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                        Register
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

export default Register
