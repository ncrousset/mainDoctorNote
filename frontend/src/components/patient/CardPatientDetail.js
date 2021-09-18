import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { FaUserAlt, FaCalendarAlt, FaPhoneAlt, FaTransgender, FaMailBulk } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { RiUserFill } from "react-icons/ri";

import { deletePatient } from '../../actions/patients';

import PropTypes from 'prop-types'


export class CardPatientDetail extends Component {

    static propTypes = {
        patient: PropTypes.object.isRequired,
        deletePatient: PropTypes.func.isRequired
    }

    SEX = {
        'm': 'masculino',
        'f': 'femenino',
        'o': 'other',
    }

    constructor() {
        super();
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
    }

    render() {
        return (
            <div className="containter w-full mx-auto">
                <div className="bg-white  p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500">
                    <h2 className="text-xl text-gray-800 font-semibold mb-3 flex">
                        <FaUserAlt className="mr-2" /><span> {this.props.patient.full_name} </span>
                    </h2>
                    <div className="flex flex-row justify-between mb-5">
                        <div className="flex flex-col ">
                            <label className="font-semibold flex">
                                <RiUserFill className="relative top-1 mr-1" />
                                First name</label>
                            <span className="">{this.props.patient.first_name}</span>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold flex">
                                <RiUserFill className="relative top-1 mr-1" />
                                Last name</label>
                            <span className="">{this.props.patient.last_name}</span>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold flex">
                                <FaCalendarAlt className="relative top-1 mr-1" />
                                Birth date</label>
                            <span className="">{this.props.patient.birth_name}</span>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold flex">
                                <FaMailBulk className="relative top-1 mr-1" />
                                Email</label>
                            <span className="">{this.props.patient.email}</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mb-5">

                        <div className="flex flex-col">
                            <label className="font-semibold flex">
                                <HiIdentification className="relative top-1 mr-1" />


                                Insurance</label>
                            <span className="">{this.props.patient.insurance}</span>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold flex">
                                <HiIdentification className="relative top-1 mr-1" />
                                IDD</label>
                            <span className="">{this.props.patient.idd}</span>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold flex">
                                <FaPhoneAlt className="relative top-1 mr-1" />
                                Phone</label>
                            <span className="">{this.props.patient.phone}</span>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold flex">
                                <FaTransgender className="relative top-1 mr-1" />
                                Sex</label>
                            <span className="">{this.SEX[this.props.patient.sex]}</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <label className="font-semibold flex">
                                <FaCalendarAlt className="relative top-1 mr-1" />
                                Next appointment
                            </label>
                            <span className="">{this.props.patient.next_appointment}</span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={this.deletePatient}
                            className="absolute py-2 px-8 text-sm text-white top-5 right-32 bg-yellow-500 rounded-md transform translate-x-2 -translate-y-3 shadow-xl">
                            Delete
                        </button>

                        <span className="absolute py-2 px-8 text-sm text-white top-5 right-6 bg-green-500 rounded-md transform translate-x-2 -translate-y-3 shadow-xl">Edit</span>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { deletePatient })(CardPatientDetail)

