import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getPatient } from '../../actions/patients'
import { getBackground } from '../../actions/patient'

import Main from '../layout/Main'
import CardPatientDetail from './CardPatientDetail'
import ModalPatientForm from './ModalPatientForm'
import NavActionPatient from './NavActionPatient'
import TimeLineAction from './TimeLineAction'


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
        getPatient: PropTypes.func.isRequired,
        getBackground: PropTypes.func,
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id)
        this.props.getPatient(id)
        this.props.getBackground(id)
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

                    <NavActionPatient />

                    {this.props.background != null && <TimeLineAction data={this.props.background}/>}

                </section>

                {this.state.show && <ModalPatientForm onClose={() => this.hideModalForm()} patient={this.props.patient} title="Edit patient" edit={true} />}

            </Main>
        )
    }
}

const mapStateToProps = state => ({
    patient: state.patient.patient,
    background: state.patient.background
});

export default connect(mapStateToProps, { getPatient, getBackground })(PatientDetailPage)
