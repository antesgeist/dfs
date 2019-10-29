import React from 'react'
import styles from './dropdown-toggle.module.scss'
import { MenuUp, MenuDown } from '../../icons/icons'

const DropdownToggle = ({ toggle, onToggle, current }) => (
    <button
        id='dropdown-workspace'
        aria-expanded={toggle}
        className={styles.dropdownToggle}
        onClick={onToggle}
        type='button'
    >
        <div className={styles.toggleContent}>
            <span className={styles.dropdownCurrent}>{current}</span>
            {toggle ? (
                <MenuUp className={styles.toggleSvg} />
            ) : (
                <MenuDown className={styles.toggleSvg} />
            )}
        </div>
    </button>
)

export default DropdownToggle
