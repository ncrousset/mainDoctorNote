import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPatients, deletePatient } from "../../actions/patients";
import { Link } from "react-router-dom";

import Main from "../layout/Main";
import CardPatient from "./CardPatient";
import ModalPatientForm from "./ModalPatientForm";
import Paginator from "./Paginator";


export class PatientListPage extends Component {

    constructor() {
        super();

        this.state = {
            show: false,
            pagination_total: 0,
            pagination_page: 0
        }

        this.showCreateForm = this.showCreateForm.bind(this);
        this.hideCreateForm = this.hideCreateForm.bind(this);
    }

    static propTypes = {
        patients: PropTypes.array.isRequired,
        pagination: PropTypes.object.isRequired,
        getPatients: PropTypes.func.isRequired,
        deletePatient: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getPatients();
        // this.setState('pagination_total', this.props.pagination.total)
        // this.setState('pagination_page', this.props.pagination.page)
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
                <section className="text-gray-600 body-font w-12/12 mr-1 relative h-full">
                    <div className="container px-5 py-5 mx-auto ">
                        <div className="mb-5 justify-between flex">
                            <button onClick={this.showCreateForm} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add Patient</button>
                        </div>

                        <div className="flex flex-wrap -m-2">
                            {this.props.patients.map(patient => (
                                <CardPatient key={patient.id} patient={patient} onDelete={this.props.deletePatient} />
                            ))}

                            {this.props.patients.length == 0 &&
                                <div>No patients found..</div>
                            }

                        </div>
                    </div>
                    {this.props.patients.length > 100}

                    <Paginator pagination={this.props.pagination != null && this.props.pagination} />
                </section>
                {this.state.show && <ModalPatientForm onClose={() => this.hideCreateForm()} />}

            </Main >
        )
    }
}

const mapStateToProps = state => ({
    patients: state.patients.patients,
    pagination: state.patients.paginator
});


export default connect(
    mapStateToProps,
    { getPatients, deletePatient }
)(PatientListPage);
