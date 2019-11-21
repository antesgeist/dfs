import React from 'react'

import { SidebarTools } from './sidebar-icons'
import { FileTree } from '../../icons/icons'

import styles from './sidebar.module.scss'

const Sidebar = () => (
    <div className={styles.sidebarContainer}>
        <div className={styles.sidebarMenu}>
            <FileTree />
        </div>
        <SidebarTools />
    </div>
)

export default Sidebar
