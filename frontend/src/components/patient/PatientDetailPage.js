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
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-5 mx-auto">
                        <div className="min-h-full bg-gray-100 flex flex-col">
                            <CardPatientDetail
                                patient={this.props.patient != null && this.props.patient}
                                onOpenModal={() => this.showModalForm()}
                            />
                        </div>
                    </div>
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
