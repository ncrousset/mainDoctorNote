import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { FaUserAlt, FaCalendarAlt, FaPhoneAlt, FaTransgender, FaMailBulk } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { RiUserFill } from "react-icons/ri";

import { deletePatient } from '../../actions/patients';

import PropTypes from 'prop-types'
import dayjs from 'dayjs'


export class CardPatientDetail extends Component {

    static propTypes = {
        patient: PropTypes.object.isRequired,
        deletePatient: PropTypes.func.isRequired,
        onOpenModal: PropTypes.func.isRequired
    }

    SEX = {
        'm': 'masculino',
        'f': 'femenino',
        'o': 'other',
    }

    constructor() {
        super();
    }

    dateString(data = '') {
        let dateString = dayjs(data).format('YYYY-MMM-DD hh:mm A')
    
        return dateString
    }

    componentDidMount() {

    }

    deletePatient = (event) => {
        event.preventDefault();

        if (confirm("Are you sure to delete this patient?")) {
            this.props.deletePatient(this.props.patient.id)
                .then(response => {
                    location.pathname = '/patients'
                })
        }

        return false
    }

    render() {
        return (
            <div className="containter w-full mx-auto">
                <div className="bg-white  p-8 rounded-lg shadow-md relative hover:shadow-lg transition duration-500">
                    <h2 className="text-xl text-gray-800 font-semibold mb-3 flex">
                        <FaUserAlt className="mr-2" /><span className="capitalize"> {this.props.patient.full_name} </span>
                    </h2>
                    <ul className="grid grid-cols-3 gap-3">
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <RiUserFill className="relative top-1 mr-1" /> First name
                            </label>
                            <span className="pl-5 capitalize">{this.props.patient.first_name}</span>
                        </li>
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <RiUserFill className="relative top-1 mr-1" /> Last name
                            </label>
                            <span className="pl-5 capitalize">{this.props.patient.last_name}</span>
                        </li>
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <FaCalendarAlt className="relative top-1 mr-1" /> Birth date
                            </label>
                            <span className="pl-5">{this.props.patient.birth_date}</span>
                        </li>
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <HiIdentification className="relative top-1 mr-1" /> Insurance
                            </label>
                            <span className="pl-5">{this.props.patient.insurance}</span>
                        </li>
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <HiIdentification className="relative top-1 mr-1" /> IDD
                            </label>
                            <span className="pl-5">{this.props.patient.idd}</span>
                        </li>
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <FaPhoneAlt className="relative top-1 mr-1" /> Phone
                            </label>
                            <span className="pl-5">{this.props.patient.phone}</span>
                        </li>
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <FaPhoneAlt className="relative top-1 mr-1" /> Sex
                            </label>
                            <span className="pl-5 capitalize">{this.SEX[this.props.patient.sex]}</span>
                        </li>
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <FaCalendarAlt className="relative top-1 mr-1" /> Next appointment
                            </label>
                            <span className="pl-5">{ this.dateString(this.props.patient.next_appointment) } </span>
                        </li>
                        <li class="px-3 py-1 ">
                            <label className="font-semibold flex">
                                <FaMailBulk className="relative top-1 mr-1" /> Email
                            </label>
                            <span className="pl-5">{this.props.patient.email}</span>
                        </li>
                    </ul>

                
                    <div>
                        <button
                            onClick={this.deletePatient}
                            className="absolute py-2 px-8 text-sm text-gray-800 font-semibold top-5 right-32 bg-yellow-200 shadow-xl hover:bg-yellow-400 rounded-md transform translate-x-2 -translate-y-3 ">
                            Delete
                        </button>

                        <button
                            onClick={() => { this.props.onOpenModal() }}
                            className="absolute py-2 px-8 text-sm text-white font-semibold top-5 right-6 bg-green-500 rounded-md transform hover:bg-green-600 translate-x-2 -translate-y-3 shadow-xl">Edit</button>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { deletePatient })(CardPatientDetail)

