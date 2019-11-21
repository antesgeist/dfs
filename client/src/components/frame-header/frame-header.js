import React, { useState } from 'react'

import { Undo, Redo, Save, Edit, More } from '../icons/icons'
import Button from '../common/button/button'

import styles from './frame-header.module.scss'

const FrameHeader = ({ title }) => {
    const [frameTitle, setFrameTitle] = useState(title)
    const [hasChanges, setHasChanges] = useState(false)
    const [editMode, setEditMode] = useState(true)

    const frameToolsState = hasChanges && styles.hasUnsaved
    const editModeState = editMode && styles.isEditing

    const updateFrameTitle = e => setFrameTitle(e.target.value)

    return (
        <div className={styles.frameHeader}>
            <div className={styles.frameLabel}>
                <span className={styles.labelDot}>
                    <span className={styles.dotShape} />
                </span>
                <input
                    type='text'
                    className={styles.frameTitle}
                    placeholder='Enter Title...'
                    value={frameTitle}
                    onChange={updateFrameTitle}
                />
            </div>
            <div className={styles.frameToolbar}>
                <div className={styles.frameTools}>
                    <Button svg={<Undo />} style={[frameToolsState]} />
                    <Button svg={<Redo />} style={[frameToolsState]} />
                    <Button svg={<Save />} style={[frameToolsState]} />
                </div>
                <div className={styles.frameToolsDefault}>
                    <Button svg={<Edit />} style={[editModeState]} />
                    <Button svg={<More />} />
                </div>
            </div>
        </div>
    )
}

export default FrameHeader
