import React from 'react'

import { Plus, Gear, Lock, Info, Avatar } from '../../icons/icons'
import Button from '../../icons/icons-utils'
import Dropdown from '../../common/dropdown/dropdown'
import SearchBox from '../../common/search/search'

import styles from './header.module.scss'

const workspaceArray = [
    {
        label: 'Workspace 1',
        id: 1
    },
    {
        label: 'Workspace 2',
        id: 2
    },
    {
        label: 'Workspace 3',
        id: 3
    },
    {
        label: 'Workspace 4',
        id: 4
    },
    {
        label: 'Workspace 5',
        id: 5
    }
]

const Header = () => (
    <div className={styles.headerContainer}>
        <div className={styles.headerContentLeft}>
            <div className={styles.workspaceContent}>
                <Dropdown items={workspaceArray} placeholder='Select Workspace' />
                <div className={styles.workspaceAdd}>
                    <Button svg={<Plus />} />
                </div>
            </div>

            <div className={styles.workspaceToolbar}>
                <Button svg={<Gear />} />
                <Button svg={<Lock />} />
            </div>

            <div className={styles.workspaceUnsavedHint}>Unsaved changes...</div>
        </div>
        <div className={styles.headerContentRight}>
            <SearchBox />
            <Button svg={<Info />} style={[styles.userPrimaryIcon]} />
            <div className={styles.userDropdown}>
                <Button svg={<Avatar />} style={[styles.userPrimaryIcon]} />
                <div className={styles.userDropdownContent}>
                    <ul>
                        <li>Account</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
)

export default Header
