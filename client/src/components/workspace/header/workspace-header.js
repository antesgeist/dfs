import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
    selectIsUserFetching,
    selectCurrentUser
} from '../../../redux/user/user.selectors'

import WorkspaceControls from '../../workspace-controls/workspace-controls'
import WorkspaceUser from '../../workspace-user/workspace-user'

import styles from './workspace-header.module.scss'

const WorkspaceHeader = ({ isUserFetching, currentUser, workspaceItems }) => (
    <div className={styles.headerContainer}>
        {!isUserFetching && currentUser && (
            <Fragment>
                <WorkspaceControls items={workspaceItems} />
                <WorkspaceUser isUserFetching={isUserFetching} />
            </Fragment>
        )}
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isUserFetching: selectIsUserFetching
})

export default connect(mapStateToProps)(WorkspaceHeader)
