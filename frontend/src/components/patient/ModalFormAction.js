import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types"

import BackgroundForm from './forms/BackgroundForm'
import MedicalHistoriesForm from './forms/MedicalHistoriesForm'
import MedicalStudiesForm from './forms/MedicalStudiesForm'
import TreatmentsForm from './forms/TreatmentsForm'


export class ModalFormAction extends Component {

    static propTypes = {
        onClose: PropTypes.func.isRequired,
        object: PropTypes.object,
        edit: PropTypes.string
    }

    constructor() {
        super()
     
        this.title = {
            'background': 'Background',
            'medical_histories': 'Mediacal Histories',
            'medical_studies': 'Medical Studies',
            'treatments': 'Treatments'
        }

        this.form = {
            'background': <BackgroundForm onClose={() => this.onClose()} />,
            'mediacal_histories': <MedicalHistoriesForm onClose={() => this.onClose()} />,
            'medical_studies': <MedicalStudiesForm onClose={() => this.onClose()} />,
            'treatments': <TreatmentsForm onClose={() => this.onClose()}/>
        }

    }

    onClose = () => {
        this.props.onClose()
    }
    
    render() {

        const session = this.props.session

        return (
            <div className="z-30 absolute inset-0 bg-black bg-opacity-50 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0">
                <div className="bg-white rounded-lg w-1/2 ">
                    <div className="flex flex-col items-start p-4">
                        <div className="flex items-center w-full border-b py-2">
                            <div className="text-gray-900 font-medium text-lg">{this.title[session]} { this.props.edit ? 'Edit' : 'Add' }</div>
                        </div>

                        <div className="w-full">
                            {session == 'background' &&
                                <BackgroundForm onClose={() => this.onClose()} background={this.props.object && this.props.object}  edit={this.props.edit} />
                            }
                            {session == 'medical_histories' &&
                                <MedicalHistoriesForm onClose={() => this.onClose()} medicalHistory={this.props.object && this.props.object}  edit={this.props.edit} />
                            }
                            {session == 'medical_studies' &&
                                <MedicalStudiesForm onClose={() => this.onClose()} medicalStudy={this.props.object && this.props.object}  edit={this.props.edit} />
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    session: state.patient.session
})

export default connect(mapStateToProps)(ModalFormAction)
