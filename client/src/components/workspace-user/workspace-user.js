import React from 'react'
import styles from './workspace-user.module.scss'

import { MenuDown, Avatar, AccountPlain } from '../icons/icons'
import Button from '../common/button/button'
import SearchBox from '../common/search/search'
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

/* 
<div className={styles.userDropdownContent}>
                    <ul>
                        <li>Account</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
*/

// <span className={styles.userFullname}>Boötes Void</span>
//                 <MenuDown className={styles.svgMenuDown} />

export default WorkspaceUser
