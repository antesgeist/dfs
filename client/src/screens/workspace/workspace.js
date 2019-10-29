import React from 'react'

import Header from '../../components/workspace/header/header'
import Sidebar from '../../components/workspace/sidebar/sidebar'
import Canvas from '../../components/workspace/canvas/canvas'

import styles from './workspace.module.scss'

const Workspace = () => (
    <div className={styles.workspaceContainer}>
        <Header />
        <Sidebar />
        <Canvas />
    </div>
)

export default Workspace
