import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import { setCurrentUser } from './redux/user/user.actions'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import Home from './screens/home/home'
import SignIn from './screens/signin/signin'
import SignUp from './screens/signup/signup'
import Workspace from './screens/workspace/workspace'

import styles from './App.module.scss'

const App = ({ currentUser, setCurrentUser }) => {
    useEffect(() => {
        auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                })
            }

            setCurrentUser(userAuth)
        })
    }, [setCurrentUser])

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

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
