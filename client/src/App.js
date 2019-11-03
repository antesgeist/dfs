import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Workspace from './screens/workspace/workspace'
import Home from './screens/home/home'
import SignIn from './screens/signin/signin'
import SignUp from './screens/signup/signup'

import styles from './App.module.scss'

const App = () => (
    <div className={styles.appContainer}>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/demo' component={Workspace} />
            <Route exact path='/login' component={SignIn} />
            <Route exact path='/register' component={SignUp} />
        </Switch>
    </div>
)

export default App
