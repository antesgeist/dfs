import React from 'react'

import styles from './dropdown-toggle.module.scss'

const DropdownToggle = ({
    toggleIcon,
    ariaExpanded,
    onToggle,
    theme,
    style = false,
    label
}) => {
    const { toggleBtn, toggleContent } = style
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

    const svgDownClass = `
        ${styles.toggleSvg}
        ${theme ? dropdownTheme : ''}
    `.trimRight()

    return (
        <button
            id='dropdown-workspace'
            aria-expanded={ariaExpanded}
            className={toggleBtn || styles.dropdownToggle}
            onClick={onToggle}
            type='button'
        >
            <div className={toggleContent || styles.toggleContent}>
                {toggleIcon}
                <span className={styles.buttonLabel}>{label}</span>
            </div>
        </button>
    )
}

export default DropdownToggle
