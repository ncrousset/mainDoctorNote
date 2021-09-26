import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

const Main = (props) => {
    return (
        <div className="body-app">
            <Sidebar />
            <div>
                <Header />
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Main
