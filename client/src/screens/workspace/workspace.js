import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import WorkspaceHeader from '../../components/workspace/header/workspace-header'
import Sidebar from '../../components/workspace/sidebar/sidebar'
import Canvas from '../../components/workspace/canvas/canvas'
import CanvasPlaceholder from './canvas-placeholder/canvas-placeholder'

import { fetchWorkspaceAsync } from '../../redux/workspace/workspace.actions'
import { fetchFramesAsync } from '../../redux/frame/frame.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import {
    selectPanels,
    selectActiveFramesUID
} from '../../redux/panel/panel.selectors'

import { selectFrameGroup } from '../../redux/frame/frame.selectors'

import styles from './workspace.module.scss'

const Workspace = ({
    panels,
    currentUser,
    activeFramesUID,
    fetchFramesAsync,
    fetchWorkspaceAsync,
    frames
}) => {
    useEffect(() => {
        let unsubFromWorkspace = () => {}
        let unsubFromPanels = () => {}
        let unsubFromFrames = () => {}

        const unsubWorkspace = unsubFromSnapshot => {
            unsubFromPanels = unsubFromSnapshot
        }

        const unsubPanels = unsubFromSnapshot => {
            unsubFromWorkspace = unsubFromSnapshot
        }

        if (!panels && currentUser) {
            const { workspace_id, panels_id } = currentUser
            fetchWorkspaceAsync(
                workspace_id,
                panels_id,
                unsubWorkspace,
                unsubPanels
            )
        }

        if (panels) {
            fetchFramesAsync(activeFramesUID, unsubFromSnapshot => {
                unsubFromFrames = unsubFromSnapshot
            })
        }

        return () => {
            unsubFromPanels()
            unsubFromFrames()
            unsubFromWorkspace()
        }
    }, [
        fetchWorkspaceAsync,
        fetchFramesAsync,
        currentUser,
        panels,
        activeFramesUID
    ])

    return (
        <div className={styles.workspaceContainer}>
            <WorkspaceHeader />
            <Sidebar />
            {frames ? <Canvas /> : <CanvasPlaceholder />}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    panels: selectPanels,
    activeFramesUID: selectActiveFramesUID,
    frames: selectFrameGroup
})

const actionCreators = {
    fetchFramesAsync,
    fetchWorkspaceAsync
}

export default connect(mapStateToProps, actionCreators)(Workspace)
