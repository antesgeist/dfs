import React from 'react'
import { connect } from 'react-redux'

import { Plus, Gear, Lock, Info, Avatar } from '../../icons/icons'
import Button from '../../common/button/button'
import Dropdown from '../../common/dropdown/dropdown'
import SearchBox from '../../common/search/search'

import { fetchWorkspace } from '../../../redux/workspace/workspace.actions'

import styles from './header.module.scss'

const Header = ({ workspaceItems }) => (
    <div className={styles.headerContainer}>
        <div className={styles.headerContentLeft}>
            <div className={styles.workspaceContent}>
                <Dropdown
                    items={workspaceItems}
                    placeholder='Select Workspace'
                />
                <div className={styles.workspaceAdd}>
                    <Button svg={<Plus />} />
                </div>
            </div>

            <div className={styles.workspaceToolbar}>
                <Button svg={<Gear />} />
                <Button svg={<Lock />} />
            </div>

            <div className={styles.workspaceUnsavedHint}>
                Unsaved changes...
            </div>
        </div>
        <div className={styles.headerContentRight}>
            <SearchBox />
            <Button svg={<Info />} style={[styles.userPrimaryIcon]} />
            <div className={styles.userDropdown}>
                <Button
                    svg={<Avatar />}
                    style={[styles.userPrimaryIcon]}
                />
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

const mapStateToProps = state => ({
    workspaceItems: state.workspaces.workspaceItems
})

export default connect(
    mapStateToProps,
    fetchWorkspace
)(Header)
