import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import WorkspaceControls from '../../workspace-controls/workspace-controls'
import WorkspaceUser from '../../workspace-user/workspace-user'

import { selectWorkspaces } from '../../../redux/workspace/workspace.selectors'

import styles from './header.module.scss'

const Header = ({ workspaceItems }) => (
    <div className={styles.headerContainer}>
        <WorkspaceControls items={workspaceItems} />
        <WorkspaceUser />
    </div>
)

const mapStateToProps = createStructuredSelector({
    workspaceItems: selectWorkspaces
})

export default connect(mapStateToProps)(Header)
