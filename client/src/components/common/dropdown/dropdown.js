import React, { useState, useEffect, useRef } from 'react'

import { MenuDown, MenuUp } from '../../icons/icons'
import Icon from '../../icons/icons-utils'
import DropdownItem from '../dropdown-item/dropdown-item'

import s from './dropdown.module.scss'

const Dropdown = ({ items, placeholder }) => {
    const [workspace, setWorkspace] = useState(placeholder)
    const [toggle, setToggle] = useState(false)

    const dropdown = useRef()

    const toggleDropdown = () => {
        setToggle(!toggle)
    }

    const clickOutside = e => {
        if (!dropdown.current.contains(e.target)) {
            toggleDropdown()
        }
    }

    const selectWorkspace = value => {
        setWorkspace(value)
        toggleDropdown()
    }

    useEffect(() => {
        if (toggle) {
            document.addEventListener('mousedown', clickOutside)
        } else {
            document.removeEventListener('mousedown', clickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }
    }, [clickOutside, toggle])

    return (
        <div ref={dropdown} className={s.dropdown}>
            <button
                id='dropdown-workspace'
                aria-expanded={toggle}
                className={s.dropdownToggle}
                onClick={toggleDropdown}
                type='button'
            >
                <span className={s.dropdownCurrent}>{workspace}</span>
                {Icon(toggle ? MenuUp : MenuDown)}
            </button>
            {toggle && (
                <div
                    role='listbox'
                    tabIndex='0'
                    aria-labelledby='dropdown-workspace'
                    className={s.dropdownMenu}
                >
                    {items.map(({ id, label }) => (
                        <DropdownItem
                            key={id}
                            link='#'
                            select={() => selectWorkspace(label)}
                        >
                            {label}
                        </DropdownItem>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
