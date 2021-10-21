import React from 'react'

const Label = (props) => {
    return (
        <div className="block mt-3 text-sm text-gray-700 text-center text-lg font-semibold">
            {props.children}
        </div>
    )
}

export default Label
