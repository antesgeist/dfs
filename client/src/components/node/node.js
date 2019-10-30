import React from 'react'
import styles from './node.module.scss'

const Node = ({ children, isCollapsed }) => {
    const classList = `${styles.node} ${
        isCollapsed ? styles.nodeCollapsed : ''
    }`.trimRight()

    return <li className={classList}>{children}</li>
}

export default Node
