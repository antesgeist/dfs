import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import WorkspaceHeader from '../../components/workspace/header/workspace-header'
import Sidebar from '../../components/workspace/sidebar/sidebar'
import CanvasPlaceholder from './canvas-placeholder/canvas-placeholder'

import { fetchWorkspaceAsync } from '../../redux/workspace/workspace.actions'
import { fetchFramesAsync } from '../../redux/frame/frame.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import {
    selectPanels,
    selectActiveFramesUID
} from '../../redux/panel/panel.selectors'

import Panel from '../../components/workspace/panel/panel'
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
    // export to custom hook
    useEffect(() => {
        let unsubFromWorkspace = () => {}
        let unsubFromPanels = () => {}

        const unsubWorkspace = unsubFromSnapshot => {
            unsubFromPanels = unsubFromSnapshot
        }

        const unsubPanels = unsubFromSnapshot => {
            unsubFromWorkspace = unsubFromSnapshot
        }

        // don't select all panels, use boolean property instead
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
            const framesFilter = panels.map(({ frames_uid }) => frames_uid)

            fetchFramesAsync(framesFilter)
        }

        return () => {
            unsubFromPanels()
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
            {frames ? (
                <Panel panels={panels} frames={frames} />
            ) : (
                <CanvasPlaceholder />
            )}
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
