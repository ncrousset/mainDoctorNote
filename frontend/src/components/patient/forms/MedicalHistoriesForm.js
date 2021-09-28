import React, { Component } from 'react'
import PropTypes from "prop-types"

export class MedicalHistoriesForm extends Component {

    state = {
        title: '',
        content: '',
        date: ''
    }

    static propTypes = {
        onClose: PropTypes.func.isRequired,
    }

    onChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    render() {
        return (
            <form action=''>
                <div className="flex flex-col">
                    <div className="flex justify-between py-2">
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="title">Title</label>
                            <input required onChange={this.onChange} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="text" name="title" id="title" />
                        </div>
                        <div className="px-1 w-1/2">
                            <label className="text-gray-800 font-semibold" htmlFor="date">Date</label>
                            <input required onChange={this.onChange}  className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none 
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" type="date" name="date" id="date" />
                        </div>
                    </div>

                    <div className="flex justify-between py-2">
                        <div className="px-1 w-full">
                            <label className="text-gray-800 font-semibold" htmlFor="content">Content</label>
                            <textarea rows='5' onChange={this.onChange} className="w-full border border-gray-300 rounded-md p-2 mt-1
                        text-gray-600 focus:outline-none  
                        focus:ring-2 focus:ring-green-700 focus:ring-opacity-70" name="content" id="content" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row-reverse w-full py-2 ml-auto border-t right-0">
                    <button
                        type="submit"
                        className="mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        {/* {(this.props.edit) ? 'Edit' : 'Add'} */} Add
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

export default MedicalHistoriesForm
