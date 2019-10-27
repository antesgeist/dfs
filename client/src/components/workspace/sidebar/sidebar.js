import React from 'react'

import { SidebarLogo, SidebarTools } from './sidebar-icons'

import styles from './sidebar.module.scss'

const Sidebar = () => (
    <div className={styles.sidebarContainer}>
        <SidebarLogo />
        <SidebarTools />
    </div>
)

export default Sidebar
