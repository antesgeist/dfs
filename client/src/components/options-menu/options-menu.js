import React, { useRef } from 'react'

import DropdownToggle from '../common/dropdown-toggle/dropdown-toggle'
import DropdownItems from '../common/dropdown-items/dropdown-items'

import { useToggle } from '../utils/custom-hooks'

import styles from './options-menu.module.scss'

const OptionsMenu = ({ toggleIcon, items, style = false }) => {
    const dropdown = useRef()
    const [toggle, setToggle] = useToggle(dropdown, false)

    const { toggleBtn, toggleContent, dropdownItems, dropdownItem } = style

    return (
        <div ref={dropdown} className={styles.dropdown}>
            <DropdownToggle
                style={style && { toggleBtn, toggleContent }}
                toggleIcon={toggleIcon}
                ariaExpanded={toggle}
                onToggle={() => setToggle(!toggle)}
            />
            {toggle && (
                <DropdownItems
                    style={style && { dropdownItems, dropdownItem }}
                    items={items}
                    onSelect={() => setToggle(!toggle)}
                />
            )}
        </div>
    )
}

export default OptionsMenu
