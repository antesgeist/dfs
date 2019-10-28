import React from 'react'
import styles from './dropdown-items-container.module.scss'

const DropdownItems = ({ children }) => (
    <div
        role='listbox'
        tabIndex='0'
        aria-labelledby='dropdown-workspace'
        className={styles.dropdownMenu}
    >
        {children}
    </div>
)

export default DropdownItems
