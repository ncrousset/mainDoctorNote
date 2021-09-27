import React, { Component } from 'react'
import PropTypes from "prop-types";


export class TimeLineContent extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        keyContent: PropTypes.string.isRequired
    }

    render() {

        const isPar = (this.props.keyContent % 2 == 0)
        const position = (isPar) ? "right-timeline" : "flex-row-reverse left-timeline"
        const backgroundAndColor = (isPar) ? "bg-green-400 text-gray-800 " : "bg-yellow-200 text-gray-800"

        return (
            <div className={`mb-8 flex justify-between items-center w-full ${position}`}>
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto font-semibold text-lg text-white">{this.props.keyContent}</h1>
                </div>
                <div className={`order-1 rounded-lg shadow-xl w-5/12 px-6 py-4 ${backgroundAndColor}`}>
                    <h3 className="mb-3 font-bold  text-xl">{this.props.data.title}</h3>
                    <div className="text-sm leading-snug tracking-wide text-opacity-100">
                        {this.props.data.content}
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeLineContent
