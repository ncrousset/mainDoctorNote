import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaUsers } from "react-icons/fa"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadUser } from '../../actions/auth'
import { FaRegCalendarAlt, FaFileAlt } from "react-icons/fa"

export class Sidebar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className="fixed flex flex-col w-64 h-screen  px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
                <h2 className="text-3xl font-semibold text-green-500 dark:text-white">DoctorNote</h2>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                            <FaRegCalendarAlt className="w-5 h-5" />

                            <span className="mx-4 font-medium">Calendar</span>
                        </a>
                        <Link
                            className="flex items-center px-4 py-2 mt-5  text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200"
                            to="/patients/">
                            <FaUsers className="w-5 h-5" />
                            <span className="mx-4 font-medium">Patinets</span>
                        </Link>
                        <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                            <FaFileAlt className="w-5 h-5" />

                            <span className="mx-4 font-medium">Document</span>
                        </a>
                        <hr className="my-6 dark:border-gray-600" />

                        <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span className="mx-4 font-medium">Settings</span>
                        </a>
                    </nav>

                    <div className="flex items-center px-4 -mx-2">
                        <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                        <h4
                            className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
                            {(this.props.auth.isAuthenticated !== null) && this.props.auth.user.username}
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Sidebar)