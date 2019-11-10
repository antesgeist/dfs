import React from 'react'
import { MenuUp, MenuDown } from '../../icons/icons'
import styles from './dropdown-toggle.module.scss'

const DropdownToggle = ({
    component,
    icon,
    toggle,
    onToggle,
    current,
    theme
}) => {
    let dropdownTheme
    let componentStyle

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

    switch (component) {
        case 'USER':
            componentStyle = styles.userStyles
            break
        default:
            break
    }

    const svgDownClass = `
        ${styles.toggleSvg}
        ${theme ? dropdownTheme : ''}
    `.trimRight()

    const toggleContentClass = `
        ${styles.toggleContent}
        ${component ? componentStyle : ''}
    `.trimRight()

    return (
        <button
            id='dropdown-workspace'
            aria-expanded={toggle}
            className={styles.dropdownToggle}
            onClick={onToggle}
            type='button'
        >
            <div className={toggleContentClass}>
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
