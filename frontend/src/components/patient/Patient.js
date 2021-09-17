import React, { Component, Fragment } from 'react'
import { FaUserAlt, FaCalendarAlt, FaPhoneAlt, FaTransgender, FaMailBulk } from "react-icons/fa";

import Main from '../layout/Main'

export class Patient extends Component {
    render() {
        return (
            <Main>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-5 mx-auto">
                        <div className="min-h-full bg-gray-100 flex">
                            <div className="containter w-full mx-auto">
                                <div className="bg-white  p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500">
                                    <h2 className="text-xl text-gray-800 font-semibold mb-3 flex">
                                        <FaUserAlt className="mr-2" /><span> Rudys Acosta</span>
                                    </h2>
                                    <div className="flex flex-row justify-between mb-5">
                                        <div className="flex flex-col ">
                                            <label className="font-semibold">First name</label>
                                            <span className="">Rudys Acosta</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-semibold">First name</label>
                                            <span className="">Rudys Acosta</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold flex">
                                                <FaCalendarAlt className="relative top-1 mr-1" />
                                                Birth date</label>
                                            <span className="">Rudys Acosta</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold flex">
                                                <FaMailBulk className="relative top-1 mr-1" />
                                                Email</label>
                                            <span className="">Rudys Acosta</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between mb-5">

                                        <div className="flex flex-col">
                                            <label className="font-semibold">Insurance</label>
                                            <span className="">Rudys Acosta</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold">IDD</label>
                                            <span className="">Rudys Acosta</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold flex">
                                                <FaPhoneAlt className="relative top-1 mr-1" />
                                                Phone</label>
                                            <span className="">Rudys Acosta</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold flex">
                                                <FaTransgender className="relative top-1 mr-1" />
                                                Sex</label>
                                            <span className="">Rudys Acosta</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-col">
                                            <label className="font-semibold flex">
                                                <FaCalendarAlt className="relative top-1 mr-1" />
                                                Next
                                            </label>
                                            <span className="">Rudys Acosta</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="absolute py-2 px-8 text-sm text-white top-5 right-32 bg-yellow-500 rounded-md transform translate-x-2 -translate-y-3 shadow-xl">Delete</span>
                                        <span className="absolute py-2 px-8 text-sm text-white top-5 right-6 bg-green-500 rounded-md transform translate-x-2 -translate-y-3 shadow-xl">Edit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Main>
        )
    }
}

export default Patient
