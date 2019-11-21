import React from 'react'

import { Close } from '../icons/icons'

import styles from './tab.module.scss'

const Tab = ({ label, onClick, isActive }) => {
    const extendedClass = `
        ${styles.tabItem}
        ${isActive ? styles.tabIsActive : ''}
    `.trimRight()

    return (
        <div className={extendedClass} onClick={onClick}>
            <span className={styles.tabLabel}>{label}</span>
            <Close className={styles.svgTabClose} />
        </div>
    )
}

export default Tab
