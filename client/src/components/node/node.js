import React from 'react'
import styles from './node.module.scss'

const Node = ({ children, isCollapsed }) => (
    <li
        className={`${styles.node} ${
            isCollapsed ? styles.nodeCollapsed : ''
        }`}
    >
        {children}
    </li>
)

export default Node
