import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    deleteBackground,
    deleteMedicalHistories,
    deleteMedicalStudy,
    deleteMedicalTreatment
} from '../../actions/patient';

import PropTypes from "prop-types";
import { FaEdit, FaWindowClose, FaCalendarAlt } from 'react-icons/fa'


import ModalFormAction from './ModalFormAction'


export class TimeLineContent extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        keyContent: PropTypes.string.isRequired,
        onEdit: PropTypes.func.isRequired,
        deleteBackground: PropTypes.func.isRequired,
        deleteMedicalHistories: PropTypes.func.isRequired,
        deleteMedicalStudy: PropTypes.func.isRequired,
        deleteMedicalTreatment: PropTypes.func.isRequired,
    }

    render() {

        const isPar = (this.props.keyContent % 2 == 0)
        const position = (isPar) ? "right-timeline" : "flex-row-reverse left-timeline"
        const backgroundAndColor = (isPar) ? "bg-green-400 text-gray-800 " : "bg-yellow-200 text-gray-800"

        this.onDeleteObj = (id) => {

            const session = this.props.session

            if (confirm('Esta suguro')) {
                if(session == 'background') {
                    this.props.deleteBackground(id)
                } else if(session == 'medical_histories')  {
                    this.props.deleteMedicalHistories(id)
                } else if(session == 'medical_studies')  {
                    this.props.deleteMedicalStudy(id)
                } else if(session == 'medical_treatments')  {
                    this.props.deleteMedicalTreatment(id)
                }
               
            }
        }

        return (
            <div className={`mb-8 flex justify-between items-center w-full ${position}`}>
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto font-semibold text-lg text-white">{this.props.keyContent}</h1>
                </div>
                <div className={`order-1 rounded-lg shadow-xl w-5/12 px-6 py-4 ${backgroundAndColor}`}>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col space-y-0 mb-2">
                            <h3 className="font-bold  text-xl capitalize">{this.props.data.title}</h3>
                            <div className="flex flex-row space-x-1 text-gray-500 text-sm">
                                <FaCalendarAlt />
                                <span>{this.props.data.date}</span>
                            </div>
                        </div>

                        <div className="flex flex-row space-x-2">
                            <FaEdit onClick={() => this.props.onEdit()} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                            <FaWindowClose onClick={() => this.onDeleteObj(this.props.data.id)} className="text-red-500 hover:text-red-700 cursor-pointer" />
                        </div>
                    </div>

                    <div className="text-sm leading-snug tracking-wide text-opacity-100 bg-gray-100 rounded-md p-2">
                        {this.props.data.content}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    session: state.patient.session
});

const mapStateFunction = {
    deleteBackground,
    deleteMedicalHistories,
    deleteMedicalStudy,
    deleteMedicalTreatment
}

export default connect(mapStateToProps, mapStateFunction)(TimeLineContent)
