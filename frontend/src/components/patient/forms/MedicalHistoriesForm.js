import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types"

import { 
    addMedicalHistories, 
    editMedicalHistory 
} from '../../../actions/patient';


export class MedicalHistoriesForm extends Component {

    state = this.props.medicalHistory;

    static propTypes = {
        onClose: PropTypes.func.isRequired,
        addMedicalHistories: PropTypes.func.isRequired,
        medicalHistory: PropTypes.object.isRequired,
        edit: PropTypes.bool.isRequired
    }

    onSubmit = event => {
        event.preventDefault()

        if (this.props.edit) {
            this.props.editMedicalHistory(this.props.medicalHistory, this.state)
                .then((response) => {
                    this.props.onClose()
                })
                .catch(error => {
                    console.log('error')
                })
        } else {
            this.props.addMedicalHistories(this.props.patient.id, this.state)
                .then((response) => {
                    this.props.onClose()
                })
                .catch(error => {
                    console.log('error')
                })
        }
    }

    onChange = event => this.setState({
        [event.target.name]: event.target.value
    });

    render() {

        const { title, content, date } = this.state

        return (
            <form action='' onSubmit={this.onSubmit}>
                <div className="flex flex-col">
                    <div className="flex justify-between py-2">
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="title">Title</label>
                            <input required onChange={this.onChange} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="text" name="title" id="title" value={title} />
                        </div>
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="date">Date</label>
                            <input required onChange={this.onChange} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none 
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="date" name="date" id="date" value={date} />
                        </div>
                    </div>

                    <div className="flex justify-between py-2">
                        <div className="px-1 w-full">
                            <label className="text-gray-800 font-semibold" htmlFor="content">Content</label>
                            <textarea rows='5' onChange={this.onChange} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" name="content" id="content" value={content} />
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
            </form>
        )
    }
}

const mapStateToProps = state => ({
    patient: state.patient.patient
});

const mapStateFuntion = {
    addMedicalHistories,
    editMedicalHistory
}

export default connect(mapStateToProps, mapStateFuntion)(MedicalHistoriesForm)
