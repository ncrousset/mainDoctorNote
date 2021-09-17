import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={props => {

        if (auth.token == null || auth.token == '') {
            return <Redirect to={{ pathname: '/accounts/login', state: { from: props.location } }} />
        }

        if (auth.token.isLoading) {
            return <div>Loading...</div>
        } else if (auth.token.isAuthenticated == false) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        return <Component {...props} />

    }} />
)


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
