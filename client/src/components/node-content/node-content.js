import React, { useState } from 'react'

import { CheckBold } from '../icons/icons'
import NodeToolbar from '../node-toolbar/node-toolbar'

import styles from './node-content.module.scss'

const NodeContent = ({ title, frameId, nodeId, onCheck, checked }) => {
    const [isChecked, setIsChecked] = useState(checked)
    const [nodeBody, setNodeBody] = useState(title)

    const toggleNodeCheck = () => {
        onCheck({ frameId, parentId: null, nodeId, type: 'CHECK' })
        setIsChecked(!isChecked)
    }

    const isCheckedSpan = isChecked
        ? styles.toggleIsChecked
        : styles.toggleIsUnchecked

    const isCheckedSVG = isChecked
        ? styles.svgCheckedVisible
        : styles.svgCheckedHidden

    return (
        <div className={styles.nodeContent}>
            <div className={styles.nodeVisible}>
                <span className={isCheckedSpan} onClick={toggleNodeCheck}>
                    <CheckBold className={isCheckedSVG} />
                </span>
                <input
                    className={styles.nodeBody}
                    value={nodeBody}
                    onChange={e => setNodeBody(e.target.value)}
                />
            </div>

            <NodeToolbar opt={['noPadding']} />
        </div>
    )
}

export default NodeContent
