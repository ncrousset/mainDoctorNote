import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

const Main = (props) => {
    return (
        <div className="body-app">


            <Sidebar />

            <div>main</div>

            {/* <Sidebar /> */}
            {/* 
            <div class="bg-blue-500 min-w-screen min-h-screen flex flex-row">
                <div class="bg-red-500 w-3/12 inline-block ">
                    <Sidebar />
                </div>

                <div class="bg-blue-500 w-auto flex-grow w-9/12">
                    <Header />
                    {props.children}
                </div>
            </div> */}


            {/* <div className="flex bg-red-500 justify-start">
                <div className="w-3/12 h-screen">
                    <Sidebar />
                </div> */}


            {/* <div className="bg-yellow-700 w-9/12 -ml-2 right">
                    <Header /> */}
            {/* <div className="container w-auto flex-grow">
                        {props.children}
                    </div> */}
            {/* </div> */}

            {/* <div className="bg-gray-100 flex flex-col">

                    <Header />
                    <div className="container w-auto flex-grow h-screen">
                        {props.children}
                    </div>
                </div> */}
            {/* </div> */}
        </div>
    )
}

export default Main
