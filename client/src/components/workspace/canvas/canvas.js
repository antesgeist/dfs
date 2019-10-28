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
    Check,
    CheckBold,
    Maximize,
    Close,
    Stack,
    Copy,
    PlusOutline,
    Minus
} from '../../icons/icons'
import Button from '../../icons/icons-utils'

import styles from './canvas.module.scss'

const Canvas = () => {
    const [frameTitle, setFrameTitle] = useState('Vladimirs')
    const [hasChanges, setHasChanges] = useState(false)
    const [editMode, setEditMode] = useState(true)

    const updateFrameTitle = e => setFrameTitle(e.target.value)
    const frameToolsState = hasChanges && styles.hasUnsaved
    const editModeState = editMode && styles.isEditing

    return (
        <div className={styles.canvasContainer}>
            <div className={styles.frame}>
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
                <div className={styles.frameContent}>
                    <ul id='frameRootId' className={styles.root}>
                        <li className={styles.node}>
                            <div className={styles.nodeContent}>
                                <span className={styles.nodeDash} />
                                <span className={styles.toggleCheck}>
                                    <CheckBold className={styles.svgCheck} />
                                </span>
                                <p className={styles.nodeBody}>Node 1</p>
                            </div>
                            <div className={styles.nodeToolbar}>
                                <div className={styles.nodeToolsExpanded}>
                                    <span>copy</span>
                                    <span>stack</span>
                                    <span>plus</span>
                                </div>
                                <div className={styles.nodeToolsDefault}>
                                    <span>gear</span>
                                    <span>maximize</span>
                                    <span>close</span>
                                </div>
                            </div>
                            <ul>
                                <li className={styles.node}>
                                    <div className={styles.nodeContent}>
                                        <span className={styles.nodeDash} />

                                        <span className={styles.toggleCheck}>
                                            <CheckBold className={styles.svgCheck} />
                                        </span>
                                        <p className={styles.nodeBody}>Node 1.1</p>
                                    </div>
                                    <div className={styles.nodeToolbar}>
                                        <div className={styles.nodeToolsExpanded}>
                                            <span>copy</span>
                                            <span>stack</span>
                                            <span>plus</span>
                                        </div>
                                        <div className={styles.nodeToolsDefault}>
                                            <span>gear</span>
                                            <span>maximize</span>
                                            <span>close</span>
                                        </div>
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
                                            <div className={styles.nodeToolbar}>
                                                <div className={styles.nodeToolsExpanded}>
                                                    <span>copy</span>
                                                    <span>stack</span>
                                                    <span>plus</span>
                                                </div>
                                                <div className={styles.nodeToolsDefault}>
                                                    <span>gear</span>
                                                    <span>maximize</span>
                                                    <span>close</span>
                                                </div>
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
                                            <div className={styles.nodeToolbar}>
                                                <div className={styles.nodeToolsExpanded}>
                                                    <span>copy</span>
                                                    <span>stack</span>
                                                    <span>plus</span>
                                                </div>
                                                <div className={styles.nodeToolsDefault}>
                                                    <span>gear</span>
                                                    <span>maximize</span>
                                                    <span>close</span>
                                                </div>
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
                            <div className={styles.nodeToolbar}>
                                <div className={styles.nodeToolsExpanded}>
                                    <span>copy</span>
                                    <span>stack</span>
                                    <span>plus</span>
                                </div>
                                <div className={styles.nodeToolsDefault}>
                                    <span>gear</span>
                                    <span>maximize</span>
                                    <span>close</span>
                                </div>
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
                                    <div className={styles.nodeToolbar}>
                                        <div className={styles.nodeToolsExpanded}>
                                            <span>copy</span>
                                            <span>stack</span>
                                            <span>plus</span>
                                        </div>
                                        <div className={styles.nodeToolsDefault}>
                                            <span>gear</span>
                                            <span>maximize</span>
                                            <span>close</span>
                                        </div>
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
                                    <div className={styles.nodeToolbar}>
                                        <div className={styles.nodeToolsExpanded}>
                                            <span>copy</span>
                                            <span>stack</span>
                                            <span>plus</span>
                                        </div>
                                        <div className={styles.nodeToolsDefault}>
                                            <span>gear</span>
                                            <span>maximize</span>
                                            <span>close</span>
                                        </div>
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
