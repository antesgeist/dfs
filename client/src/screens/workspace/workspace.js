import React from 'react'
import { connect } from 'react-redux'

import Header from '../../components/workspace/header/header'
import Sidebar from '../../components/workspace/sidebar/sidebar'
import Canvas from '../../components/workspace/canvas/canvas'

import { fetchFramesAsync } from '../../redux/frame/frame.actions'
import { fetchWorkspaceAsync } from '../../redux/workspace/workspace.actions'

import styles from './workspace.module.scss'

const Workspace = ({ fetchWorkspaceAsync, fetchFramesAsync }) => {
    fetchWorkspaceAsync()
    fetchFramesAsync()

    return (
        <div className={styles.workspaceContainer}>
            <Header />
            <Sidebar />
            <Canvas />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchFramesAsync: () => dispatch(fetchFramesAsync()),
    fetchWorkspaceAsync: () => dispatch(fetchWorkspaceAsync())
})

export default connect(
    null,
    mapDispatchToProps
)(Workspace)
