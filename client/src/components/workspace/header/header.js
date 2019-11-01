import React from 'react'
import { connect } from 'react-redux'

import { fetchWorkspace } from '../../../redux/workspace/workspace.actions'

import WorkspaceControls from '../../workspace-controls/workspace-controls'
import WorkspaceUser from '../../workspace-user/workspace-user'

import styles from './header.module.scss'

const Header = ({ workspaceItems }) => (
    <div className={styles.headerContainer}>
        <WorkspaceControls items={workspaceItems} />
        <WorkspaceUser />
    </div>
)

const mapStateToProps = state => ({
    workspaceItems: state.workspaces.workspaceItems
})

export default connect(
    mapStateToProps,
    fetchWorkspace
)(Header)
