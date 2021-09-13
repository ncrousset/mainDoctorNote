import React from 'react';
import PropTypes from 'prop-types'

const DecoratorsCard = ({ bgColor, rotate }) => {
    return (
        <div className={`card ${bgColor} shadow-lg  w-full h-full rounded-3xl absolute  transform ${rotate}`}></div >
    )
}

DecoratorsCard.propTypes = {
    bgColor: PropTypes.string.isRequired,
    rotate: PropTypes.string.isRequired
}

export default DecoratorsCard
