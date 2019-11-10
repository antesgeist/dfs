import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import { setCurrentUserAsync } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

import Home from './screens/home/home'
import SignIn from './screens/signin/signin'
import SignUp from './screens/signup/signup'
import Workspace from './screens/workspace/workspace'

import styles from './App.module.scss'

const App = ({ currentUser, setCurrentUserAsync }) => {
    useEffect(() => {
        setCurrentUserAsync()
    }, [setCurrentUserAsync])

    return (
        <div className={styles.appContainer}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/demo' component={Workspace} />
                <Route
                    exact
                    path='/login'
                    render={() =>
                        currentUser ? <Redirect to='/' /> : <SignIn />
                    }
                />
                <Route
                    exact
                    path='/register'
                    render={() =>
                        currentUser ? <Redirect to='/' /> : <SignUp />
                    }
                />
            </Switch>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUserAsync: () => dispatch(setCurrentUserAsync())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App))
