import React, { useState } from 'react'

import { CheckBold } from '../icons/icons'

import NodeToolbar from '../node-toolbar/node-toolbar'

import styles from './node-content.module.scss'

const NodeContent = ({ title, onCheck, id, checked }) => {
    const [isChecked, setIsChecked] = useState(checked)

    const toggleNodeCheck = () => {
        onCheck({ id, type: 'CHECK' })
        setIsChecked(!isChecked)
    }

    return (
        <div className={styles.nodeContent}>
            <div className={styles.nodeVisible}>
                <span
                    className={
                        isChecked
                            ? styles.toggleIsChecked
                            : styles.toggleIsUnchecked
                    }
                    onClick={toggleNodeCheck}
                >
                    <CheckBold
                        className={
                            isChecked
                                ? styles.svgCheckedVisible
                                : styles.svgCheckedHidden
                        }
                    />
                </span>
                <p className={styles.nodeBody}>{title}</p>
            </div>

            <NodeToolbar opt={['noPadding']} />
        </div>
    )
}

export default NodeContent
