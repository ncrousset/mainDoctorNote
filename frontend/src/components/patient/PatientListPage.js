import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients, deletePatient } from "../../actions/patients";

import Main from "../layout/Main";
import CardPatient from "./CardPatient";



export class PatientListPage extends Component {

    static propTypes = {
        patients: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getPatients();
    }

    test = (id) => {
        console.log(`vas a eliminar este id: ${id}`)
    }

    render() {
        return (
            <Main>
                <Fragment>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-10 mx-auto">
                            <div className="flex flex-wrap -m-2">
                                {this.props.patients.map(patient => (
                                    <CardPatient patient={patient} onDelete={this.props.deletePatient} />
                                ))}
                            </div>
                        </div>
                    </section>
                </Fragment>
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
