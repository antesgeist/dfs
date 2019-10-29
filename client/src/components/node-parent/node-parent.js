import React from 'react'
import styles from './node-parent.module.scss'

const NodeParent = ({ root, children }) => {
    const isRootId = root && 'frameRootId'
    const isRootClass = root && styles.root

    return (
        <ul id={isRootId} className={isRootClass}>
            {children}
        </ul>
    )
}

export default NodeParent
