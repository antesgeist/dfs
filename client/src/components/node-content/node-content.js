import React from 'react'

import { CheckBold } from '../icons/icons'

import NodeToolbar from '../node-toolbar/node-toolbar'

import styles from './node-content.module.scss'

const NodeContent = ({ title }) => (
    <div className={styles.nodeContent}>
        <div className={styles.nodeVisible}>
            <span className={styles.toggleCheck}>
                <CheckBold className={styles.svgCheck} />
            </span>
            <p className={styles.nodeBody}>{title}</p>
        </div>

        <NodeToolbar opt={['noPadding']} />
    </div>
)

export default NodeContent
