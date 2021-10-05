import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

import { FaUserInjured, FaCalendarAlt, FaFile } from 'react-icons/fa'
import { BsFillGearFill } from 'react-icons/bs'


import {
    Settings as SettingIcon,
    ArrowOut as ArrowOutIcon,
    FileText as FileTextIcon,
    Users as UsersIcon,
    Calendar as CalendarIcon,
} from '../icons/icons'


export class Sidebar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        return (
            <aside className="bg-green-400 border-r border-green-200">
                <div className="fixed h-screen px-3 flex flex-col">
                    <section className="flex items-center py-3">
                        <span className="inline-block w-12 h-12 rounded-full overflow-hidden  ">
                            <img
                                className="w-full object-fit rounded-full"
                                src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                        </span>
                        <div className="ml-3">
                            <h2 className="text-lg text-white font-semibold">{(this.props.auth.isAuthenticated !== null) && this.props.auth.user.username}</h2>
                            <h3 className="text-white font-semibold">{(this.props.auth.isAuthenticated !== null) && this.props.auth.user.email}</h3>
                        </div>
                    </section>

                    <section className="mt-10">
                        <ul className="space-y-5">

                            <Link className="flex items-center " to="/calendar">
                                <li className="flex items-center w-full cursor-pointer p-1 rounded-md text-white hover:text-gray-700 hover:bg-yellow-200">
                                    <span className="h-8 w-8 flex items-center justify-center">
                                        <FaCalendarAlt />

                                    </span>
                                    <h4 className="font-medium  ml-1">Calendar</h4>
                                </li>
                            </Link>

                            <Link className="flex items-center " to="/patients/">
                                <li className="flex items-center  cursor-pointer  w-full p-1 rounded-md text-white hover:text-gray-700 hover:bg-yellow-200 active">
                                    <span className="h-8 w-8 flex items-center justify-center">

                                        <FaUserInjured />

                                    </span>
                                    <h4 className=" ml-1">Patients</h4>

                                </li>
                            </Link>

                            <li className="flex items-center cursor-pointer p-1 rounded-md text-white hover:text-gray-700 hover:bg-yellow-200">
                                <span className="h-8 w-8 flex items-center justify-center">
                                    {/* <FileTextIcon size='18' color="#ffffff" className="font-medium ml-1" /> */}
                                    <FaFile />
                                </span>
                                <h4 className=" ml-1">Document</h4>
                            </li>
                        </ul>
                        <hr className="my-3 border-gray-300" />
                        <ul className="space-y-3">
                            <li className="flex items-center cursor-pointer p-1 rounded-md text-white  hover:text-gray-700 hover:bg-yellow-200">
                                <span className="h-8 w-8 flex items-center justify-center">
                                    <BsFillGearFill />
                                    {/* <SettingIcon size='18' color="#ffffff" className="font-medium ml-1" /> */}
                                </span>
                                <h4 className="ml-1">User Setting</h4>
                            </li>
                        </ul>

                    </section>


                    <ul className="absolute bottom-0 left-0 mb-3 space-y-3 mt-auto text-white">
                        <a href="#" onClick={this.props.logout}>
                            <li className="flex items-center">
                                <span className="h-8 w-8 flex items-center justify-center">
                                    <ArrowOutIcon size='18' color="#ffffff" className="font-medium text-white ml-1" />
                                </span>
                                <h4 className="font-medium ml-1">Logout</h4>
                            </li>
                        </a>
                    </ul>
                </div>
            </aside>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Sidebar)