import React from 'react'
import { MenuUp, MenuDown } from '../../icons/icons'
import styles from './dropdown-toggle.module.scss'

const DropdownToggle = ({ icon, toggle, onToggle, current, theme }) => {
    let dropdownTheme

    switch (theme) {
        case 'DARK':
            dropdownTheme = styles.darkTheme
            break
        case 'LIGHT':
            dropdownTheme = styles.lightTheme
            break
        default:
            break
    }

    const svgDownClass = `${styles.toggleSvg} ${theme && dropdownTheme}`

    return (
        <button
            id='dropdown-workspace'
            aria-expanded={toggle}
            className={styles.dropdownToggle}
            onClick={onToggle}
            type='button'
        >
            <div className={styles.toggleContent}>
                {icon}
                <span className={styles.dropdownCurrent}>{current}</span>
                {toggle ? (
                    <MenuUp className={svgDownClass} />
                ) : (
                    <MenuDown className={svgDownClass} />
                )}
            </div>
        </button>
    )
}

export default DropdownToggle
