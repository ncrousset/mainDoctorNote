import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'


const CardPatient = ({ patient, onDelete }) => {
    return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full ">
            <div className="h-full flex relative items-center border-gray-200 border p-4 rounded-lg bg-white">
                <FaTrashAlt onClick={() => onDelete(patient.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 cursor-pointer" />
                <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80" />
                <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">{patient.full_name}</h2>
                    <p className="text-gray-500">UI Designer</p>
                </div>
            </div>
        </div>
    )
}

export default CardPatient
