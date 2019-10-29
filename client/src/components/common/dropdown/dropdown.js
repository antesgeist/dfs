import React, { useState, useEffect, useRef } from 'react'

import DropdownToggle from '../dropdown-toggle/dropdown-toggle'
import DropdownItems from '../dropdown-items-container/dropdown-items-container'
import DropdownItem from '../dropdown-item/dropdown-item'

import s from './dropdown.module.scss'

const Dropdown = ({ items, placeholder }) => {
    const dropdown = useRef()

    const [workspace, setWorkspace] = useState(placeholder)
    const [toggle, setToggle] = useState(false)

    const selectWorkspace = value => {
        setWorkspace(value)
        setToggle(!toggle)
    }

    // componentDidMount
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

        // cleanup function / componentWillUnmount
        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }
    }, [toggle])

    return (
        <div ref={dropdown} className={s.dropdown}>
            <DropdownToggle
                toggle={toggle}
                current={workspace}
                onToggle={() => setToggle(!toggle)}
            />
            {toggle && (
                <DropdownItems>
                    {items.map(({ id, title }) => (
                        <DropdownItem
                            key={id}
                            link='#'
                            select={() => selectWorkspace(title)}
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
