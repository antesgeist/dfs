import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { AccountPlain } from '../icons/icons'
import Dropdown from '../common/dropdown/dropdown'

import userDropdownItems from './user-dropdown-items'
import { selectUserDisplayName } from '../../store/user/user.selectors'

import styles from './workspace-user.module.scss'

const WorkspaceUser = ({ displayName }) => (
    <div className={styles.workspaceUserContainer}>
        <div className={styles.userDropdown}>
            <Dropdown
                style={{
                    toggleContent: styles.toggleContent,
                    dropdownItems: styles.dropdownItems,
                    dropdownItem: styles.dropdownItem
                }}
                toggleIcon={
                    <AccountPlain className={styles.svgAvatarDefault} />
                }
                items={userDropdownItems}
                label={displayName}
            />
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    displayName: selectUserDisplayName
})

export default connect(mapStateToProps)(WorkspaceUser)
