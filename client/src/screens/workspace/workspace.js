import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import WorkspaceHeader from './header/workspace-header'
import Sidebar from './sidebar/sidebar'
import Panel from './panel/panel'
import CanvasPlaceholder from './canvas-placeholder/canvas-placeholder'

import { fetchWorkspaceAsync } from '../../store/workspace/workspace.actions'

import { selectCurrentUser } from '../../store/user/user.selectors'
import { selectPanels } from '../../store/panel/panel.selectors'
import { selectFrameGroup } from '../../store/frame/frame.selectors'

import styles from './workspace.module.scss'

const Workspace = ({ panels, currentUser, fetchWorkspaceAsync, frames }) => {
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

        return () => {
            unsubFromPanels()
            unsubFromWorkspace()
        }
    }, [fetchWorkspaceAsync, currentUser, panels])

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
    frames: selectFrameGroup
})

const actionCreators = {
    fetchWorkspaceAsync
}

export default connect(mapStateToProps, actionCreators)(Workspace)
