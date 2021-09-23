import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getPatient } from '../../actions/patients'

import Main from '../layout/Main'
import CardPatientDetail from './CardPatientDetail'
import ModalForm from './ModalForm'


export class PatientDetailPage extends Component {

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


    static propTypes = {
        patient: PropTypes.object.isRequired,
        getPatient: PropTypes.func.isRequired
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id)
        this.props.getPatient(id)
    }


    render() {

        return (
            <Main>
                <section className="text-gray-600">
                    <div className="container px-5 py-5 mx-auto">
                        <div className="min-h-full bg-gray-100 flex flex-col">
                            <CardPatientDetail
                                patient={this.props.patient != null && this.props.patient}
                                onOpenModal={() => this.showModalForm()}
                            />
                        </div>
                    </div>

                    <div className="flex items-center py-1 px-5 justify-between">
                        <div className="flex items-center w-full">
                            <div className="w-full bg-green-400 rounded-lg ">
                                <div className="md:flex justify-between text-white">
                                    <div className="font-semibold rounded-lg hover:bg-yellow-500 py-2 px-4 cursor-pointer">Background</div>
                                    <div className="font-semibold rounded-lg hover:bg-yellow-500 py-2 px-4 cursor-pointer">Mediacal Histories</div>
                                    <div className="font-semibold rounded-lg hover:bg-yellow-500 py-2 px-4 cursor-pointer">Medical Studies</div>
                                    <div className="font-semibold rounded-lg hover:bg-yellow-500 py-2 px-4 cursor-pointer">Treatments</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto">
                        <div className="relative wrap overflow-hidden p-10 ">
                            <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>

                            <div className="mb-8 flex justify-between items-center w-full right-timeline">
                                <div className="order-1 w-5/12"></div>
                                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                    <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
                                </div>
                                <div className="order-1 bg-green-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                    <h3 className="mb-3 font-bold text-gray-800 text-xl">Lorem Ipsum</h3>
                                    <div className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                                        Lorem Ipsum asdasdassssssssssssssssssssads asdaaaaaaaaaaa asdddddddddddddddddddd
                                        Lorem Ipsum asdasdassssssssssssssssssssads asdaaaaaaaaaaa asdddddddddddddddddddd
                                    </div>
                                </div>
                                {/* <div className="order-1 bg-green-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                    <h3 className="mb-3 font-bold text-gray-800 text-xl">Lorem Ipsum</h3>
                                    <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div> */}
                            </div>


                        </div>
                    </div>

                    {/* <div className="container mx-auto">
                        <div className="relative wrap overflow-hidden p-10 ">
                            <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>

                            <div className="mb-8 flex justify-between items-center w-full right-timeline">
                                <div className="order-1 w-5/12"></div>
                                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                    <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
                                </div>
                                <div className="order-1 bg-green-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                    <h3 className="mb-3 font-bold text-gray-800 text-xl">Lorem Ipsum</h3>
                                    <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                            </div>

                            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                                <div className="order-1 w-5/12"></div>
                                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                    <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
                                </div>
                                <div className="order-1 bg-yellow-500 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                    <h3 className="mb-3 font-bold text-white text-xl">Lorem Ipsum</h3>
                                    <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                            </div>

                            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                                <div className="order-1 w-5/12"></div>
                                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                    <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
                                </div>
                                <div className="order-1 bg-yellow-500 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                    <h3 className="mb-3 font-bold text-white text-xl">Lorem Ipsum</h3>
                                    <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </section>

                {this.state.show && <ModalForm onClose={() => this.hideModalForm()} patient={this.props.patient} title="Edit patient" edit={true} />}

            </Main>
        )
    }
}

const mapStateToProps = state => ({
    patient: state.patient.patient
});

export default connect(mapStateToProps, { getPatient })(PatientDetailPage)
