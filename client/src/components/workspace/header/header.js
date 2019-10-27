import React from 'react'

import { Plus, Gear, Lock, Info, Avatar } from '../../icons/icons'
import Icon from '../../icons/icons-utils'
import Dropdown from '../../common/dropdown/dropdown'
import SearchBox from '../../common/search/search'

import s from './header.module.scss'

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
    <div className={s.headerContainer}>
        <div className={s.headerContentLeft}>
            <div className={s.workspaceContent}>
                <Dropdown
                    items={workspaceArray}
                    placeholder='Select Workspace'
                />
                <div className={s.workspaceAdd}>{Icon(Plus)}</div>
            </div>

            <div className={s.workspaceToolbar}>
                {Icon(Gear)}
                {Icon(Lock)}
            </div>

            <div className={s.workspaceUnsavedHint}>Unsaved changes...</div>
        </div>
        <div className={s.headerContentRight}>
            <SearchBox />
            <div className={s.userPrimaryIcon}>{Icon(Info)}</div>
            <div className={s.userDropdown}>
                <div className={s.userPrimaryIcon}>{Icon(Avatar)}</div>
                <div className={s.userDropdownContent}>
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
