import React from 'react'
import styles from './workspace-user.module.scss'

import { AccountPlain } from '../icons/icons'
import Dropdown from '../common/dropdown/dropdown'

const WorkspaceUser = ({ avatar, name, username }) => {
    const userDropdownItems = [
        {
            id: 1,
            title: 'Profile Settings'
        },
        {
            id: 2,
            title: 'Manage Account'
        },
        {
            id: 3,
            title: 'Help'
        },
        {
            id: 4,
            title: 'Logout'
        }
    ]
    // <SearchBox />
    return (
        <div className={styles.workspaceUserContainer}>
            <div className={styles.userDropdown}>
                <Dropdown
                    toggleIcon={
                        <AccountPlain className={styles.svgAvatarDefault} />
                    }
                    items={userDropdownItems}
                    label='Boötes Void'
                    opt={{ selection: false, theme: 'DARK' }}
                />
            </div>
        </div>
    )
}

export default WorkspaceUser
