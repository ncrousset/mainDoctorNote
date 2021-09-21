import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPatient, updatePatient } from '../../actions/patients'
import { Redirect } from 'react-router-dom'

export class PatientForm extends Component {

    state = this.props.patient;

    static propTypes = {
        addPatient: PropTypes.func.isRequired,
        lastSuccessAction: PropTypes.object
    }

    constructor(props) {
        super(props);
    }


    onChange = event => this.setState({
        [event.target.name]: event.target.value
    });

    onSubmit = event => {
        event.preventDefault();

        if (!this.props.edit) {
            this.props.addPatient(this.state)
                .then((response) => {
                    this.props.onClose()
                    location.href = `/patients/${response.id}`
                })
                .catch(error => {
                    console.log('entro en catch')
                })
        } else {
            this.props.updatePatient(this.state)
                .then((response) => {
                    this.props.onClose()
                    location.href = `/patients/${response.id}`
                })
                .catch(error => {
                    console.log('entro en catch')
                })
        }

    }

    render() {
        console.log(this.stat)

        const { first_name, last_name, email, phone,
            insurance, idd, sex, birth_date, next_appointment } = this.state

        return (
            <form action='' onSubmit={this.onSubmit}>
                <div className="flex flex-col">
                    <div className="flex justify-between py-2">
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="first_name">First Name</label>
                            <input required onChange={this.onChange} value={first_name} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="text" name="first_name" id="first_name" />
                        </div>
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="last_name">Last Name</label>
                            <input required onChange={this.onChange} value={last_name} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none 
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="text" name="last_name" id="last_name" />
                        </div>
                    </div>

                    <div className="flex justify-between py-2">
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="email">Email</label>
                            <input onChange={this.onChange} value={email} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="email" name="email" id="email" />
                        </div>
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="phone">Phone</label>
                            <input onChange={this.onChange} value={phone} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none 
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="text" name="phone" id="" />
                        </div>
                    </div>

                    <div className="flex justify-between py-2">
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="insurance">Insurance</label>
                            <input onChange={this.onChange} value={insurance} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="text" name="insurance" id="" />
                        </div>
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="idd">Idd</label>
                            <input onChange={this.onChange} value={idd} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none 
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="text" name="idd" id="idd" />
                        </div>
                    </div>

                    <div className="flex justify-between py-2">
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="sex">Sex</label>

                            <select required onChange={this.onChange} value={sex} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" name="sex" id="sex" >
                                <option value=""></option>
                                <option value="m">Masculine</option>
                                <option value="f">Feminine</option>
                                <option value="o">Other</option>
                            </select>
                        </div>
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="birth_date">Birth Date</label>
                            <input onChange={this.onChange} value={birth_date} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none 
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="date" name="birth_date" id="birth_date" />
                        </div>
                    </div>

                    <div className="flex justify-between py-2">
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="next_appointment">Next appointment</label>
                            <input onChange={this.onChange} value={next_appointment} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="datetime-local" name="next_appointment" id="next_appointment" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row-reverse w-full py-2 ml-auto border-t right-0">
                    <button
                        type="submit"
                        className="mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        {(this.props.edit) ? 'Edit' : 'Add'}
                    </button>
                    <button type="button"
                        onClick={() => { this.props.onClose() }}
                        className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
                        Close
                    </button>
                </div>
            </form >
        )
    }
}

const mapStateToProps = state => ({
    lastSuccessAction: state.lastSuccessAction
})

export default connect(mapStateToProps, { addPatient, updatePatient })(PatientForm)
