import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from "react-redux";
import { getPatients } from "../../actions/patients";

export class Paginator extends Component {

    constructor() {
        super()
    }

    static propTypes = {
        pagination: PropTypes.object.isRequired
    }

    componentDidMount() {

    }

    getPatients(page) {
        this.props.getPatients(page);
    }

    render() {

        // const { page, total } = this.props.pagination

        return (
            <div className="text-right px-6 my-5">
                <span>Total: {this.props.pagination.total}</span>,
                <span> Page: {this.props.pagination.page}</span>
                <span className="text-greed-700 mx-1">Patient of(
                    {this.props.pagination.start_page}-{this.props.pagination.end_page})</span>

                {this.props.pagination.page > 1 &&
                    <button
                        onClick={() => this.getPatients(this.props.pagination.page - 1)}
                        className="border border-gray-300 text-gray-700 rounded-md px-2 py-1 m-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                        Previous
                    </button>
                }

                {this.props.pagination.total > this.props.pagination.end_page &&
                    <button
                        onClick={() => this.getPatients(this.props.pagination.page + 1)}
                        className="border border-gray-300 text-gray-700 rounded-md px-2 py-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                        Next
                    </button>
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { getPatients })(Paginator)
