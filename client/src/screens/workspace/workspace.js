import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import WorkspaceHeader from '../../components/workspace/header/workspace-header'
import Sidebar from '../../components/workspace/sidebar/sidebar'
import Canvas from '../../components/workspace/canvas/canvas'
import CanvasPlaceholder from './canvas-placeholder/canvas-placeholder'

import { fetchFramesAsync } from '../../redux/frame/frame.actions'
import { fetchPanelsAsync } from '../../redux/panel/panel.actions'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import {
    selectPanels,
    selectActiveFramesUID
} from '../../redux/panel/panel.selectors'

import { selectCanvasFrames } from '../../redux/frame/frame.selectors'

import styles from './workspace.module.scss'

const Workspace = ({
    panels,
    currentUser,
    activeFramesUID,
    fetchFramesAsync,
    fetchPanelsAsync,
    frames
}) => {
    useEffect(() => {
        let unsubWorkspace = () => {}
        let unsubFrames = () => {}

        if (!panels && currentUser) {
            const { workspaceUID } = currentUser
            fetchPanelsAsync(workspaceUID, unsubFromSnapshot => {
                unsubWorkspace = unsubFromSnapshot
            })
        }

        if (panels) {
            fetchFramesAsync(activeFramesUID, unsubFromSnapshot => {
                unsubFrames = unsubFromSnapshot
            })
        }

        return () => {
            unsubWorkspace()
            unsubFrames()
        }
    }, [
        fetchPanelsAsync,
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
    frames: selectCanvasFrames
})

const mapDispatchToProps = {
    fetchFramesAsync,
    fetchPanelsAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)
