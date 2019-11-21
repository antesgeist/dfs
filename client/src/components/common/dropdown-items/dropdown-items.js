import React from 'react'

import DropdownItem from '../dropdown-item/dropdown-item'

import styles from './dropdown-items.module.scss'

const DropdownItems = ({ items, onSelect, style }) => {
    const onSelectItem = e => {
        e.preventDefault()
        onSelect()
    }

    const { dropdownItems, dropdownItem } = style

    return (
        <div
            role='menu'
            tabIndex='0'
            aria-labelledby='dropdown'
            className={dropdownItems || styles.dropdownItems}
        >
            {items.map(({ id, title }) => (
                <DropdownItem
                    style={{ dropdownItem }}
                    key={id}
                    link='#'
                    onClick={e => onSelectItem(e)}
                    label={title}
                />
            ))}
        </div>
    )
}

export default DropdownItems
