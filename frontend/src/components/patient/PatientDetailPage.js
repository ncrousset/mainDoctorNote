import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getPatient } from '../../actions/patients'
import { 
    getBackground, 
    getMedicalHistories,
    getMedicalStudies
} from '../../actions/patient'

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
        this.props.getMedicalHistories(id)
        this.props.getMedicalStudies(id)
    }


    render() {

        let timeLineObejct = null
        
        if(this.props.session == 'background') {
            timeLineObejct = this.props.background
        } else if(this.props.session == 'medical_histories') {
            timeLineObejct = this.props.medical_histories
        } else if(this.props.session == 'medical_studies') {
            timeLineObejct = this.props.medical_studies
        } else if(this.props.session == 'medical_treatments') {
            // timeLineObejct = this.props.background
        }
        

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

                    {timeLineObejct != null && <TimeLineAction data={timeLineObejct}/>}

                </section>

                {this.state.show && <ModalPatientForm onClose={() => this.hideModalForm()} patient={this.props.patient} title="Edit patient" edit={true} />}

            </Main>
        )
    }
}

const mapStateToProps = state => ({
    patient: state.patient.patient,
    session: state.patient.session,
    background: state.patient.background,
    medical_histories: state.patient.medical_histories,
    medical_studies: state.patient.medical_studies,
});

const mapStateFuntion = {
    getPatient,
    getBackground,
    getMedicalHistories,
    getMedicalStudies
}

export default connect(mapStateToProps, mapStateFuntion)(PatientDetailPage)
