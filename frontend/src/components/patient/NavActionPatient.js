import React, { Component } from 'react'
import { connect } from 'react-redux'

import {BiPlusMedical} from 'react-icons/bi'

import ModalFormAction from './ModalFormAction'

import { setSessionPatient } from '../../actions/patients'


export class NavActionPatient extends Component {

    constructor() {
        super()

        this.state = {
            show: false
        }

        this.showModalForm = this.showModalForm.bind(this)
        this.hideModalForm = this.hideModalForm.bind(this)
    }

    showModalForm = () => {
        this.setState({ show: true })
    }

    hideModalForm = () => {
        this.setState({ show: false })
    }

    sessions = {
        'background': 'Background',
        'mediacal_histories': 'Mediacal Histories',
        'medical_studies': 'Medical Studies',
        'treatments': 'Treatments',
    }
    
    onClickSession = (session) => {
        this.props.setSessionPatient(session)
    }
    
    render() {
        const object = {title: '', content: '', date: ''}

        return (
            <div className="flex flex-col items-center py-1 px-5 justify-between">
                <div className="flex items-center w-full">
                    <div className="w-full bg-green-400 rounded-lg ">
                        <div className="md:flex justify-between text-white">
                            <div onClick={() => this.onClickSession('background')} className={`font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer ${(this.props.session == 'background') && 'active'}`}>Background</div>
                            <div onClick={() => this.onClickSession('medical_histories')} className={`font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer ${(this.props.session == 'mediacal_histories') && 'active'}`}>Mediacal Histories</div>
                            <div onClick={() => this.onClickSession('medical_studies')} className={`font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer ${(this.props.session == 'medical_studies') && 'active'}`}>Medical Studies</div>
                            <div onClick={() => this.onClickSession('medical_treatments')} className={`font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer ${(this.props.session == 'treatments') && 'active'}`}>Treatments</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row-reverse w-full align-right ">
                    <button onClick={() => this.showModalForm()} className="flex flex-row content-center py-2 px-3 mt-5 mr-2 text-sm text-white font-semibold bg-green-500 rounded-md transform hover:bg-green-600 translate-x-2 -translate-y-3 shadow-xl">
                        <BiPlusMedical className="mt-1 mr-1" />
                        Add {this.sessions[this.props.session] }
                    </button>
                </div>

                {this.state.show && <ModalFormAction onClose={() => this. hideModalForm ()} object={object} edit={false} />}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    session: state.patient.session
});

export default connect(mapStateToProps, {setSessionPatient})(NavActionPatient)
