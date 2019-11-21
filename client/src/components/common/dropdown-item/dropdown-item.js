import React from 'react'
import s from './dropdown-item.module.scss'

const DropdownItem = ({ link, onClick, label, style = false }) => {
    const { dropdownItem } = style

    return (
        <a
            href={link}
            className={dropdownItem || s.dropdownItem}
            onClick={onClick}
            role='menuitem'
            tabIndex='0'
        >
            {label}
        </a>
    )
}

export default DropdownItem
