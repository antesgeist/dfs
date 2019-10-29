import React, { useState } from 'react'

import {
    Plus,
    Gear,
    MenuDown,
    Dot,
    Undo,
    Redo,
    Save,
    Edit,
    More,
    MenuRight,
    CheckBold,
    Maximize,
    Close,
    Stack,
    Copy,
    PlusOutline,
} from '../../icons/icons'
import Button from '../../icons/icons-utils'

import styles from './canvas.module.scss'

const Canvas = () => {
    const [frameTitle, setFrameTitle] = useState('Vladimirs')
    const [hasChanges, setHasChanges] = useState(false)
    const [editMode, setEditMode] = useState(true)
    const [isCollapsed, setIsCollapsed] = useState(false)

    const updateFrameTitle = e => setFrameTitle(e.target.value)
    const frameToolsState = hasChanges && styles.hasUnsaved
    const editModeState = editMode && styles.isEditing

    return (
        <div className={styles.canvasContainer}>
            <div className={styles.frame}>
                {/* START FRAME HEADER */}

                <div className={styles.frameHeader}>
                    <div className={styles.frameLabel}>
                        <Button svg={<Dot />} style={[styles.dotIcon]} />
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

                {/* START FRAME CONTENT */}

                <div className={styles.frameContent}>
                    <ul id='frameRootId' className={styles.root}>
                        <li className={`${styles.node} ${isCollapsed ? styles.nodeCollapsed : ''}`}>
                            <div className={styles.nodeContent}>
                                <span className={styles.nodeDash} />
                                <div className={styles.nodeVisible}>
                                    <span className={styles.toggleCheck}>
                                        <CheckBold className={styles.svgCheck} />
                                    </span>
                                    <p className={styles.nodeBody}>Node 1</p>
                                </div>
                                <div className={styles.nodeToolbar}>
                                    <div className={styles.nodeToolsDefault}>
                                        <Button svg={<Gear className={styles.nodeGear} />} opt={['noPadding']} />
                                        <Button svg={<Maximize className={styles.nodeMax} />} opt={['noPadding']} />
                                        <Button svg={<Close />} opt={['noPadding']} />

                                        <div className={styles.nodeToolsExpanded}>
                                            <Button svg={<Copy className={styles.nodeCopy} />} opt={['noPadding']} />                                        
                                            <Button svg={<Stack className={styles.nodeLayer} />} opt={['noPadding']} />                                        
                                            <Button svg={<Plus />} opt={['noPadding']} />                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <Button
                                svg={isCollapsed ? <MenuRight /> : <MenuDown />}
                                style={[styles.collapseBtn]}
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            />
                            <ul>
                                <li className={styles.node}>
                                    <div className={styles.nodeContent}>
                                        <span className={styles.nodeDash} />

                                        <span className={styles.toggleCheck}>
                                            <CheckBold className={styles.svgCheck} />
                                        </span>
                                        <p className={styles.nodeBody}>Node 1.1</p>
                                    </div>
                                    <ul>
                                        <li className={styles.node}>
                                            <div className={styles.nodeContent}>
                                                <span className={styles.nodeDash} />

                                                <span className={styles.toggleCheck}>
                                                    <CheckBold
                                                        className={styles.svgCheck}
                                                    />
                                                </span>
                                                <p className={styles.nodeBody}>
                                                    Node 1.1.1
                                                </p>
                                            </div>
                                        </li>
                                        <li className={styles.node}>
                                            <div className={styles.nodeContent}>
                                                <span className={styles.nodeDash} />

                                                <span className={styles.toggleCheck}>
                                                    <CheckBold
                                                        className={styles.svgCheck}
                                                    />
                                                </span>
                                                <p className={styles.nodeBody}>
                                                    Node 1.1.2
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            className={`${styles.node} ${styles.nodeAddNew}`}
                                        >
                                            <span className={styles.nodeDash} />
                                            <PlusOutline
                                                className={styles.svgPlusOutline}
                                            />
                                        </li>
                                    </ul>
                                </li>
                                <li className={`${styles.node} ${styles.nodeAddNew}`}>
                                    <span className={styles.nodeDash} />
                                    <PlusOutline className={styles.svgPlusOutline} />
                                </li>
                            </ul>
                        </li>
                        <li className={styles.node}>
                            <div className={styles.nodeContent}>
                                <span className={styles.nodeDash} />

                                <span className={styles.toggleCheck}>
                                    <CheckBold className={styles.svgCheck} />
                                </span>
                                <p className={styles.nodeBody}>Node 2</p>
                            </div>
                            <ul>
                                <li className={styles.node}>
                                    <div className={styles.nodeContent}>
                                        <span className={styles.nodeDash} />

                                        <span className={styles.toggleCheck}>
                                            <CheckBold className={styles.svgCheck} />
                                        </span>
                                        <p className={styles.nodeBody}>Node 2.1</p>
                                    </div>
                                </li>
                                <li className={styles.node}>
                                    <div className={styles.nodeContent}>
                                        <span className={styles.nodeDash} />

                                        <span className={styles.toggleCheck}>
                                            <CheckBold className={styles.svgCheck} />
                                        </span>
                                        <p className={styles.nodeBody}>Node 2.2</p>
                                    </div>
                                </li>
                                <li className={`${styles.node} ${styles.nodeAddNew}`}>
                                    <span className={styles.nodeDash} />
                                    <PlusOutline className={styles.svgPlusOutline} />
                                </li>
                            </ul>
                        </li>
                        <li className={`${styles.node} ${styles.nodeAddNew}`}>
                            <span className={styles.nodeDash} />
                            <PlusOutline className={styles.svgPlusOutline} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Canvas
