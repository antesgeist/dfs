import React from 'react'

import { Plus, Gear, Lock } from '../icons/icons'
import Button from '../common/button/button'
import Dropdown from '../common/dropdown/dropdown'

import styles from './workspace-controls.module.scss'

const WorkspaceControls = ({ items, hasUnsaved }) => (
    <div className={styles.workspaceControls}>
        <div className={styles.workspaceCtrlSelect}>
            <Dropdown
                items={items}
                placeholder='Select Workspace'
                opt={{ selection: true }}
            />
            <div className={styles.workspaceAdd}>
                <Button svg={<Plus />} />
            </div>
        </div>

        <div className={styles.workspaceCtrlToolbar}>
            <Button svg={<Gear />} />
            <Button svg={<Lock />} />
        </div>

        <div className={styles.workspaceUnsavedHint}>Unsaved changes...</div>
    </div>
)

export default WorkspaceControls
