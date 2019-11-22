import React from 'react'
import { NavLink } from 'react-router-dom'

import { SidebarTools } from './sidebar-icons'
import { FileTree } from '../../../components/icons/icons'

import styles from './sidebar.module.scss'

const Sidebar = () => (
    <div className={styles.sidebarContainer}>
        <div className={styles.sidebarMenu}>
            <NavLink exact to='/' className={styles.sidebarLogoNav}>
                <FileTree />
            </NavLink>
        </div>
        <SidebarTools />
    </div>
)

export default Sidebar
