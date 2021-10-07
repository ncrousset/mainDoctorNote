import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Landing extends Component {
    render() {
        return (
            <div className="eading-normal tracking-normal text-gray-900">
                <div className="h-screen pb-14 bg-right bg-cover backgorund_landing">

                    {/* Nav */}
                    <div className="w-full container mx-auto p-6">
                        <div className="w-full flex items-center justify-between">
                            <a className="flex items-center text-green-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                                <img src={"/static/images/logo.png"} className="h-16 w-16" /> DoctorNote
                            </a>
                            <div className="flex w-1/2 justify-end content-center">

                                <Link to="accounts/login" className="inline-block text-green-500 no-underline hover:text-green-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"   >
                                    Login
                                </Link>
                                <Link to="accounts/register" className="inline-block text-green-500 no-underline hover:text-green-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"   >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* <!--Main--> */}
                    <div className="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">

                        {/* <!--Left Col--> */}
                        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                            <h1 className="my-4 text-3xl md:text-5xl text-green-700 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">Manege your patients directory</h1>
                            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">Such as background, medical histories, medical studies and medical treatments</p>

                            <p className="text-blue-400 font-bold pb-8 lg:pb-6 text-center md:text-left fade-in">Download our app:</p>
                            <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
                                <img src={"/static/images/App Store.svg"} className="h-12 pr-4 bounce-top-icons" />
                                <img src={"/static/images/Play Store.svg"} className="h-12 bounce-top-icons" />
                            </div>

                        </div>

                        {/* <!--Right Col--> */}
                        <div className="w-full xl:w-3/5 py-6 overflow-y-hidden">
                            <img className="w-5/6 mx-auto lg:mr-0 slide-in-bottom" src={"/static/images/devices.svg"} />
                        </div>

                        {/* <!--Footer--> */}
                        <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
                            <a className="text-gray-500 no-underline hover:no-underline" href="#">&copy; Doctornote 2021</a>
                        </div>

                    </div>

                </div>
            </div>


        )
    }
}

export default Landing
