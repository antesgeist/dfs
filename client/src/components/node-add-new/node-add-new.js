import React from 'react'

import { PlusOutline } from '../icons/icons'

import styles from './node-add-new.module.scss'

const NodeAddNew = () => (
    <li className={styles.nodeAddNew}>
        <PlusOutline className={styles.svgPlusOutline} />
    </li>
)

export default NodeAddNew
