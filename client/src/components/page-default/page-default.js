import React from 'react'
import { NavLink } from 'react-router-dom'
import { FileTree } from '../icons/icons'

import styles from './page-default.module.scss'

const PageDefault = ({ children }) => (
    <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
            <div className={styles.logoContainer}>
                <NavLink exact to='/' className={styles.menuItems}>
                    <FileTree className={styles.svgFileTree} />
                </NavLink>
            </div>
            <ul className={styles.menuPrimary}>
                <NavLink exact to='/' className={styles.menuItems}>
                    HOME
                </NavLink>
                <NavLink exact to='/demo' className={styles.menuItems}>
                    DEMO
                </NavLink>
                <NavLink exact to='/contact' className={styles.menuItems}>
                    CONTACT
                </NavLink>
            </ul>
            <div className={styles.userButtons}>
                <NavLink exact to='/login'>
                    <span className={`${styles.userBtn} ${styles.signInOut}`}>
                        Log In
                    </span>
                </NavLink>
                <NavLink exact to='/register'>
                    <span className={`${styles.userBtn} ${styles.signUp}`}>
                        Sign Up
                    </span>
                </NavLink>
            </div>
        </div>
        <div className={styles.mainContent}>
            <div className={styles.content}>{children}</div>
        </div>
        <div className={styles.pageFooter}>
            <p className={styles.footerLabel}>© 2019 DFS</p>
        </div>
    </div>
)

// <NavLink exact to='/signout'>
//     <span className={styles.userBtn}>SIGN OUT</span>
// </NavLink>

export default PageDefault
