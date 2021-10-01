import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModalFormAction from './ModalFormAction'
import TimeLineContent from './TimeLineContent';

import PropTypes from "prop-types";

export class TimeLineAction extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
    }

    constructor() {
        super()

        this.state = {
            show: false,
            object: {}
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

    onEdit(data) {
        this.setState({ object: data })
        this.showModalForm()
    }

    render() {
        return (
            <div className="container mx-auto">
                <div className="relative wrap overflow-hidden px-10 py-0 ">
                    <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
                    {this.props.data.map(( object, key) => (
                        <TimeLineContent onEdit={() => this.onEdit(object)} data={object} keyContent={key +1 } />
                    ))}
                </div>
                {this.state.show && <ModalFormAction object={this.state.object} onClose={() => this. hideModalForm ()} edit={true} />}
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(TimeLineAction)
