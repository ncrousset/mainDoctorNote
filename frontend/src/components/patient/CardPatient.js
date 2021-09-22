import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HiIdentification } from "react-icons/hi";


const CardPatient = ({ patient, onDelete }) => {
    return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full ">
            <Link to={`/patients/${patient.id}`}>
                <div className="h-full flex relative items-center border-gray-200 border p-4 rounded-lg bg-white">

                    <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                    {/* https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50 */}
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{patient.full_name}</h2>

                        <p className="text-gray-500 text-sm flex">
                            <HiIdentification className="relative top-1 mr-1" />
                            {patient.insurance}</p>
                        <p className="text-gray-500 text-sm flex">
                            <HiIdentification className="relative top-1 mr-1" />
                            {patient.idd}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CardPatient
