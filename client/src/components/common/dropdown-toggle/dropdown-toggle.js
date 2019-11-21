import React from 'react'

import styles from './dropdown-toggle.module.scss'

const DropdownToggle = ({
    toggleIcon,
    ariaExpanded,
    onToggle,
    style = false,
    label
}) => {
    const { toggleBtn, toggleContent } = style

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
