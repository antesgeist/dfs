import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { AccountPlain } from '../icons/icons'
import Dropdown from '../common/dropdown/dropdown'

import userDropdownItems from './user-dropdown-items'
import { selectUserDisplayName } from '../../redux/user/user.selectors'

import styles from './workspace-user.module.scss'

const WorkspaceUser = ({ displayName }) => (
    <div className={styles.workspaceUserContainer}>
        <div className={styles.userDropdown}>
            <Dropdown
                toggleIcon={
                    <AccountPlain className={styles.svgAvatarDefault} />
                }
                items={userDropdownItems}
                label={displayName}
                opt={{
                    selection: false,
                    component: 'USER',
                    theme: 'DARK'
                }}
            />
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    displayName: selectUserDisplayName
})

export default connect(mapStateToProps)(WorkspaceUser)
