import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { NavLink } from 'react-router-dom'

import {
    signOutFailure,
    signOutSuccess
} from '../../store/auth/auth.actions'
import { selectCurrentUser } from '../../store/auth/auth.selectors'
import { auth } from '../../firebase/firebase.utils'

import { FileTree } from '../icons/icons'

import styles from './default-header.module.scss'

const DefaultHeader = ({
    hasUserButton,
    currentUser,
    signOutSuccess,
    signOutFailure
}) => {
    const onSignOut = () => {
        auth.signOut()
            .then(() => {
                signOutSuccess()
            })
            .catch(err => {
                signOutFailure(err)
            })
    }

    return (
        <div className={styles.pageHeader}>
            <div className={styles.logoContainer}>
                <NavLink exact to='/' className={styles.menuItems}>
                    <FileTree className={styles.svgFileTree} />
                </NavLink>
            </div>
            <ul className={styles.menuPrimary}>
                <NavLink exact to='/' className={styles.menuItems}>
                    Home
                </NavLink>
                <NavLink
                    exact
                    to='/demo'
                    className={styles.menuItems}
                >
                    Demo
                </NavLink>
                <NavLink
                    exact
                    to='/docs'
                    className={styles.menuItems}
                >
                    Docs
                </NavLink>
                <NavLink
                    exact
                    to='/github'
                    className={styles.menuItems}
                >
                    Github
                </NavLink>
            </ul>
            <div className={styles.userButtons}>
                {/* both depend on hasUserButton but conditionally shows
                    userButton(s) depending on currentUser state */}

                {hasUserButton && currentUser ? (
                    <button
                        className={styles.signOutButton}
                        onClick={onSignOut}
                    >
                        Logout
                    </button>
                ) : (
                    <Fragment>
                        <NavLink exact to='/login'>
                            <span
                                className={`${styles.userBtn} ${styles.signIn}`}
                            >
                                Log In
                            </span>
                        </NavLink>
                        <NavLink exact to='/register'>
                            <span
                                className={`${styles.userBtn} ${styles.signUp}`}
                            >
                                Sign Up
                            </span>
                        </NavLink>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const actionCreators = { signOutSuccess, signOutFailure }

export default connect(mapStateToProps, actionCreators)(DefaultHeader)
