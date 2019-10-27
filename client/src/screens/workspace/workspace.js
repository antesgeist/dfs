import React from 'react'
import styles from './workspace.module.scss'

import Header from '../../components/workspace/header/header'
import Sidebar from '../../components/workspace/sidebar/sidebar'
import Canvas from '../../components/workspace/canvas/canvas'

const Workspace = () => (
    <div className={styles.workspaceContainer}>
        <Header />
        <Sidebar />
        <Canvas />
    </div>
)

export default Workspace
