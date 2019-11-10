import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import WorkspaceHeader from '../../components/workspace/header/workspace-header'
import Sidebar from '../../components/workspace/sidebar/sidebar'
import Canvas from '../../components/workspace/canvas/canvas'

import { fetchFramesAsync } from '../../redux/frame/frame.actions'
import { fetchWorkspaceAsync } from '../../redux/workspace/workspace.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import {
    selectWorkspaces,
    selectActiveFramesUID
} from '../../redux/workspace/workspace.selectors'

import { selectCanvasFrames } from '../../redux/frame/frame.selectors'

import styles from './workspace.module.scss'

const Workspace = ({
    workspaceItems,
    currentUser,
    activeFramesUID,
    fetchFramesAsync,
    fetchWorkspaceAsync,
    frames
}) => {
    useEffect(() => {
        let unsubWorkspace = () => {}
        let unsubFrames = () => {}

        if (!workspaceItems && currentUser) {
            const { workspaceUID } = currentUser
            fetchWorkspaceAsync(workspaceUID, unsubFromSnapshot => {
                unsubWorkspace = unsubFromSnapshot
            })
        }

        if (workspaceItems) {
            fetchFramesAsync(activeFramesUID, unsubFromSnapshot => {
                unsubFrames = unsubFromSnapshot
            })
        }

        return () => {
            unsubWorkspace()
            unsubFrames()
        }
    }, [
        fetchWorkspaceAsync,
        fetchFramesAsync,
        currentUser,
        workspaceItems,
        activeFramesUID
    ])

    return (
        <div className={styles.workspaceContainer}>
            <WorkspaceHeader workspaceItems={workspaceItems} />
            <Sidebar />
            {frames ? <Canvas /> : 'fetching frames'}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    workspaceItems: selectWorkspaces,
    activeFramesUID: selectActiveFramesUID,
    frames: selectCanvasFrames
})

const mapDispatchToProps = dispatch => ({
    fetchFramesAsync: (uid, set) => dispatch(fetchFramesAsync(uid, set)),
    fetchWorkspaceAsync: (uid, set) => dispatch(fetchWorkspaceAsync(uid, set))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workspace)
