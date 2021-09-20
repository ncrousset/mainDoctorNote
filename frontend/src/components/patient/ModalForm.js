import React, { Component } from "react";

import PatientForm from "./PatientForm";

export default class ModalForm extends Component {
    constructor(props) {
        super(props);

        const fieldPatient = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            insurance: '',
            idd: '',
            sex: null,
            birth_date: null,
            next_appointment: null,
        }

        this.patient = (this.props.patient !== null)
            ? this.props.patient
            : fieldPatient
    }

    onClose = () => {
        this.props.onClose();
    }

    render() {
        return (
            <>
                <div className=" absolute inset-0 bg-black bg-opacity-50 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0">
                    <div className="bg-white rounded-lg w-1/2 ">
                        <div className="flex flex-col items-start p-4">
                            <div className="flex items-center w-full border-b py-2">
                                <div className="text-gray-900 font-medium text-lg">{this.props.title}</div>
                            </div>

                            <div className="">
                                <PatientForm onClose={this.onClose} patient={this.patient} edit={this.props.edit} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

ModalForm.defaultProps = {
    title: 'Add patient',
    edit: false
}