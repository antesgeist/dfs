import React, { useRef } from 'react'

import DropdownToggle from '../common/dropdown-toggle/dropdown-toggle'
import DropdownItems from '../common/dropdown-items/dropdown-items'

import { useMenuToggle } from '../utils/custom-hooks'

import styles from './options-menu.module.scss'

const OptionsMenu = ({ toggleIcon, items, style, opt }) => {
    const dropdown = useRef()
    const [toggle, setToggle] = useMenuToggle(dropdown, false)

    const { theme } = opt
    const { toggleBtn, toggleContent, dropdownItems, dropdownItem } = style

    return (
        <div ref={dropdown} className={styles.dropdown}>
            <DropdownToggle
                style={{ toggleBtn, toggleContent }}
                toggleIcon={toggleIcon}
                ariaExpanded={toggle}
                onToggle={() => setToggle(!toggle)}
                theme={theme}
            />
            {toggle && (
                <DropdownItems
                    style={{ dropdownItems, dropdownItem }}
                    items={items}
                    onSelect={() => setToggle(!toggle)}
                />
            )}
        </div>
    )
}

export default OptionsMenu
