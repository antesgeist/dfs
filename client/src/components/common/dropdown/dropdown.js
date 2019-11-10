import React, { useState, useEffect, useRef } from 'react'

import DropdownToggle from '../dropdown-toggle/dropdown-toggle'
import DropdownItems from '../dropdown-items-container/dropdown-items-container'
import DropdownItem from '../dropdown-item/dropdown-item'

import s from './dropdown.module.scss'

const Dropdown = ({ toggleIcon, items, placeholder, opt, label }) => {
    const [workspace, setWorkspace] = useState(label || placeholder)
    const [toggle, setToggle] = useState(false)

    const dropdown = useRef()
    const { selection, theme, component } = opt

    const selectWorkspace = value => {
        setWorkspace(value)
        setToggle(!toggle)
    }

    const onSelectHandler = option => {
        return selection ? () => selectWorkspace(option) : null
    }

    useEffect(() => {
        const clickOutside = e => {
            if (!dropdown.current.contains(e.target)) {
                setToggle(!toggle)
            }
        }

        if (toggle) {
            document.addEventListener('mousedown', clickOutside)
        } else {
            document.removeEventListener('mousedown', clickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }
    }, [toggle])

    return (
        <div ref={dropdown} className={s.dropdown}>
            <DropdownToggle
                icon={toggleIcon}
                toggle={toggle}
                current={workspace}
                onToggle={() => setToggle(!toggle)}
                component={component}
                theme={theme}
            />
            {toggle && (
                <DropdownItems>
                    {items.map(({ id, title }) => (
                        <DropdownItem
                            key={id}
                            link={!selection ? '/' : '#'} // add custom routing to !selection
                            select={onSelectHandler(title)}
                        >
                            {title}
                        </DropdownItem>
                    ))}
                </DropdownItems>
            )}
        </div>
    )
}

export default Dropdown
