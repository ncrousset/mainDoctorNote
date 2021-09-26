import React, { Component } from 'react'

export class NavActionPatient extends Component {
    render() {
        return (
            <div className="flex items-center py-1 px-5 justify-between">
                <div className="flex items-center w-full">
                    <div className="w-full bg-green-400 rounded-lg ">
                        <div className="md:flex justify-between text-white">
                            <div className="font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer active">Background</div>
                            <div className="font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer">Mediacal Histories</div>
                            <div className="font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer">Medical Studies</div>
                            <div className="font-semibold py-3 rounded-lg hover:text-gray-800 hover:bg-yellow-200 px-4 cursor-pointer">Treatments</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavActionPatient
