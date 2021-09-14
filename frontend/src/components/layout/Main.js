import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

const Main = (props) => {
    return (
        <Fragment>
            <div className="flex flex-row">
                <Sidebar />
                <div className="bg-gray-100 w-auto h-screen w-screen">
                    <Header />
                    <div className="container">
                        {props.children}
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Main
