import React from 'react'

import Button from '../common/button/button'
import { Gear, Maximize, Close, Copy, Stack, Plus } from '../icons/icons'

import styles from './node-toolbar.module.scss'

const NodeToolbar = ({ opt }) => (
    <div className={styles.nodeToolbar}>
        <div className={styles.nodeToolsDefault}>
            <Button svg={<Gear className={styles.nodeGear} />} opt={opt} />
            <Button svg={<Maximize className={styles.nodeMax} />} opt={opt} />
            <Button svg={<Close />} opt={opt} />

            <div className={styles.nodeToolsExpanded}>
                <Button svg={<Copy className={styles.nodeCopy} />} opt={opt} />
                <Button
                    svg={<Stack className={styles.nodeLayer} />}
                    opt={opt}
                />
                <Button svg={<Plus />} opt={opt} />
            </div>
        </div>
    </div>
)

export default NodeToolbar
