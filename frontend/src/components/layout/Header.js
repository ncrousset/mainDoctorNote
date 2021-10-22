import React, { Component } from 'react'
import { logout } from '../../actions/auth'
import { searchPatient, getPatients } from '../../actions/patients'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { FaSearch } from 'react-icons/fa'
import { RiLoader4Line } from 'react-icons/ri'

export class Header extends Component {

    state = {
        search: ''
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        searchPatient: PropTypes.func.isRequired
    }

    search() {
        this.props.searchPatient(this.state.search)
        this.props.getPatients()
    }

    onChange = event => this.setState({
        'search': event.target.value
    })

    render() {
        return (
            <header className="flex h-18 bg-gray-200 body-font w-full" >
                <nav className="bg-white shadow dark:bg-gray-800 w-full">
                    <div className="container px-6 py-3 mx-auto md:flex">
                        <div className="w-full md:flex md:items-center">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaSearch className="w-5 h-5 text-gray-400" />
                                </span>
                           
                                <input
                                    id="search"
                                    type="text"
                                    onChange={this.onChange}
                                    name="search"
                                    type="text"
                                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search" />
                           
                           </div>

                            <div>
                                <button
                                    onClick={() => this.search()}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded mx-1">
                                    <FaSearch />

                                </button>
                            </div>

                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout, searchPatient, getPatients })(Header)