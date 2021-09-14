import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPatients } from "../../actions/patients";

import Main from "../layout/Main";




export class PatientListPage extends Component {
    // constructor(props) {
    //     super(props);
    // }

    static propTypes = {
        patients: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getPatients();
    }

    render() {
        return (
            <Main>
                <Fragment>
                    {this.props.patients.map(patient => (
                        <div>{patient.last_name}</div>
                    ))}
                </Fragment>
            </Main>
        )
    }
}

const mapStateToProps = state => ({
    patients: state.patients.patients
});


export default connect(mapStateToProps, { getPatients })(PatientListPage)
