import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import DefaultHeader from '../default-header/default-header'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import styles from './page-default.module.scss'

const PageDefault = ({ children, opt = {} }) => {
    const hasUserButton = opt.header_has_user_button

    const [currentUser, setCurrentUser] = useState(null)
    const [unsubscribeFromAuth, setUnsubscribeFromAuth] = useState(null)

    useEffect(() => {
        setUnsubscribeFromAuth(
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
        )

        return () => {
            console.log('unsubfrom auth')
            setUnsubscribeFromAuth(null)
        }
    }, [])

    return (
        <div className={styles.pageContainer}>
            <DefaultHeader
                hasUserButton={hasUserButton}
                currentUser={currentUser}
            />
            <div className={styles.mainContent}>
                <div className={styles.content}>{children}</div>
            </div>
            <div className={styles.pageFooter}>
                <p className={styles.footerLabel}>© 2019 DFS</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(PageDefault)
