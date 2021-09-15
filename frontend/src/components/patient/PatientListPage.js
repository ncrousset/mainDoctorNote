import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients, deletePatient } from "../../actions/patients";

import Main from "../layout/Main";
import CardPatient from "./CardPatient";
import CreatePatientPage from "./CreatePatientPage";



export class PatientListPage extends Component {

    constructor() {
        super();

        this.state = {
            show: false
        }

        this.showCreateForm = this.showCreateForm.bind(this);
        this.hideCreateForm = this.hideCreateForm.bind(this);
    }

    static propTypes = {
        patients: PropTypes.array.isRequired,
        getPatients: PropTypes.func.isRequired,
        deletePatient: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getPatients();
    }

    showCreateForm = () => {
        this.setState({ show: true });
    }

    hideCreateForm = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <Main>

                <Fragment>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="mb-5">
                                <button onClick={this.showCreateForm} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add Patient</button>
                            </div>

                            <div className="flex flex-wrap -m-2">
                                {this.props.patients.map(patient => (
                                    <CardPatient patient={patient} onDelete={this.props.deletePatient} />
                                ))}
                            </div>
                        </div>
                    </section>
                </Fragment>
                {this.state.show && <CreatePatientPage onClose={() => this.hideCreateForm()} />}

            </Main>
        )
    }
}

const mapStateToProps = state => ({
    patients: state.patients.patients
});


export default connect(
    mapStateToProps,
    { getPatients, deletePatient }
)(PatientListPage);
