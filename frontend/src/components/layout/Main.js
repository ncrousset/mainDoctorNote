import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Alerts from './Alerts'

const Main = (props) => {
    return (
        <Fragment>
            <Alerts />
            <div className="body-app">

                <Sidebar />
                <div>
                    <Header />
                    {/* <div className="container">
                        {props.children}
                    </div> */}
                </div>
            </div>
        </Fragment>
    )
}

export default Main
