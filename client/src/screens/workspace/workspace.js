import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import WorkspaceHeader from './header/workspace-header'
import Sidebar from './sidebar/sidebar'
import Panel from './panel/panel'
import CanvasPlaceholder from './canvas-placeholder/canvas-placeholder'

import { fetchWorkspaceAsync } from '../../store/workspace/workspace.actions'

import { selectCurrentUser } from '../../store/auth/auth.selectors'
import { selectPanels } from '../../store/panel/panel.selectors'
import { selectFrameGroup } from '../../store/frame/frame.selectors'

import styles from './workspace.module.scss'

const Workspace = ({
    panels,
    currentUser,
    fetchWorkspaceAsync,
    frames
}) => {
    // todo: export to custom hook
    useEffect(() => {
        // todo: don't select all panels, use boolean property instead
        // todo: refactor to use firebase get() instead of onSnapshot
        if (!panels && currentUser) {
            const { workspaces } = currentUser

            fetchWorkspaceAsync(workspaces)
        }
    }, [fetchWorkspaceAsync, currentUser, panels])

    return (
        <div className={styles.workspaceContainer}>
            <WorkspaceHeader />
            <Sidebar />
            {!frames ? (
                <CanvasPlaceholder />
            ) : (
                <Panel panels={panels} frames={frames} />
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
