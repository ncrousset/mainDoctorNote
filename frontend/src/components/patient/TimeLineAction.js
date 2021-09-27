import React, { Component } from 'react'
import { connect } from 'react-redux'


import TimeLineContent from './TimeLineContent';

import PropTypes from "prop-types";

export class TimeLineAction extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container mx-auto">
                <div className="relative wrap overflow-hidden px-10 py-0 ">
                    <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
                    {this.props.data.map(( object, key) => (
                        <TimeLineContent data={object} keyContent={key +1 } />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(TimeLineAction)
