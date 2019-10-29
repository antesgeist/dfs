import React from 'react'

import Button from '../common/button/button'
import {
    CheckBold,
    Gear,
    Maximize,
    Close,
    Copy,
    Stack,
    Plus
} from '../icons/icons'

import styles from './node-content.module.scss'

const NodeContent = ({ value }) => (
    <div className={styles.nodeContent}>
        <span className={styles.nodeDash} />
        <div className={styles.nodeVisible}>
            <span className={styles.toggleCheck}>
                <CheckBold className={styles.svgCheck} />
            </span>
            <p className={styles.nodeBody}>{value}</p>
        </div>
        <div className={styles.nodeToolbar}>
            <div className={styles.nodeToolsDefault}>
                <Button
                    svg={<Gear className={styles.nodeGear} />}
                    opt={['noPadding']}
                />
                <Button
                    svg={<Maximize className={styles.nodeMax} />}
                    opt={['noPadding']}
                />
                <Button svg={<Close />} opt={['noPadding']} />

                <div className={styles.nodeToolsExpanded}>
                    <Button
                        svg={<Copy className={styles.nodeCopy} />}
                        opt={['noPadding']}
                    />
                    <Button
                        svg={<Stack className={styles.nodeLayer} />}
                        opt={['noPadding']}
                    />
                    <Button svg={<Plus />} opt={['noPadding']} />
                </div>
            </div>
        </div>
    </div>
)

export default NodeContent
